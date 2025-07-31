import { Page } from "playwright";
import { checkRequestLimits } from "../functions/check_requesl_limits";
import { dataBase } from "@/shared/lib/db_connect";
import { generateDataForPost } from "../functions/generate_data_for_post";
import { safeTranslate } from "@/shared/lib/openai/translate/safe_translate";
import { translateText } from "@/shared/lib/openai/translate/translate_text";
import { transliterateToUrl } from "@/shared/lib/transliterate";
import { translatePost } from "@/shared/lib/openai/translate/translate_post";
import { generateText } from "@/shared/lib/openai/translate/generate_text";
import { translateTags } from "@/shared/lib/openai/translate/translate_tags";
import { generateTags } from "@/shared/lib/openai/translate/generate_tags";
import { cleanAndParseTags } from "../functions/clean_and_parse_tags";
import { downloadImageForS3 } from "@/shared/lib/download_image_for_S3";
import { parseReviews } from "../seed/parse_reviews";
import { cleanHiddenCharacters } from "@/shared/lib/openai/translate/cleane_text_by_hidden_char";
import { cleaneText } from "@/shared/lib/openai/translate/cleane_text";
import { REVIEWS_LIMIT } from "../limits";

export const parseReviewsFromManyPages = async (page: Page, pageToImages: Page, n: number) => {
  for (let i = n; 0 < i; i--) {
    console.log(`Parsing reviews from page ${i}`);
    await page.goto(`https://www.arenaev.com/news.php3?iPage=${i}&sTag=Review`, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });
    try {
      await page.waitForSelector(".review-item", { state: "visible", timeout: 60000 });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }
    const articles = await page.locator(".news-item").evaluateAll((elements) =>
      elements.map((el) => ({
        data: el.querySelector(".meta-line > .meta-item-time")?.textContent?.trim(),
        title: el.querySelector(" h3")?.textContent?.trim(),
        link: el.querySelector("a")?.getAttribute("href"),
        previewImageUrl: el.querySelector(" a > img")?.getAttribute("src"),
      })),
    );
    let reviews_limit = 0;
    for (const article of articles.reverse()) {
      if (reviews_limit >= REVIEWS_LIMIT) {
        continue;
      }
      const review = await dataBase.posts.findFirst({
        where: { original_title: article.title },
      });
      if (!article.link) {
        continue;
      }
      if (review) {
        continue;
      }
      await page.goto(`https://www.arenaev.com/${article.link}`);
      const generatedDate: Date = generateDataForPost(article.data);
      try {
        await page.waitForSelector(".review-body", { state: "visible", timeout: 60000 });
      } catch (e) {
        console.error(e);
        await checkRequestLimits(page);
      }

      const tags = await page.locator(".article-tags .float-right a").evaluateAll((tags) => {
        return tags.map((tag) => tag.textContent?.trim().toLowerCase()).filter((tag) => tag !== undefined);
      });
      if (
        tags.includes("gsmarena") ||
        tags.includes("arenaev") ||
        tags.includes("weekly poll") ||
        tags.includes("deals")
      ) {
        continue;
      }

      const content: string[] = await page.locator(".review-body p").allTextContents();
      const imagesSrc = (await page
        .locator(".review-body > img")
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")).filter((src) => src !== null))) as string[];

      const translatedTitle = article.title
        ? await safeTranslate(article.title, translateText, "тайтл обзора", 0.2)
        : "";

      const slug = transliterateToUrl(translatedTitle);

      const translatedContent: string = await safeTranslate(content.join(" "), translatePost);

      const metaTitle: string = await safeTranslate(
        translatedTitle,
        generateText,
        "и оптимизируй тайтл новости для сео(максимум 50 символов)",
        0.5,
      );
      const metaDescription: string = await safeTranslate(
        translatedContent,
        generateText,
        "и оптимизируй описание новости для сео(максимум 250 символов)",
        0.5,
      );
      const translatedTags = await safeTranslate(tags.join(","), translateTags);
      let parsedTags = (() => {
        try {
          return translatedTags && cleanAndParseTags(translatedTags);
        } catch (e) {
          console.log("Ошибка при парсинге tags", e);
        }
      })();
      if (parsedTags === undefined || parsedTags.length == 0) {
        const generatedTags = await safeTranslate(translatedContent, generateTags);
        parsedTags = (() => {
          try {
            return generatedTags && cleanAndParseTags(generatedTags);
          } catch (e) {
            console.log("Ошибка при генерации tags", e);
          }
        })();
      }
      // Сохранение превью изображения
      const previewPath: string | null = article.previewImageUrl
        ? await downloadImageForS3(article.previewImageUrl, slug, "reviews_preview", {
            page: pageToImages,
            convert_to_png: false,
            incriase: true,
            proxy_tor: true,
            remove_wattermark: true,
            textDelete: true,
          })
        : "";

      // Сохранение всех изображений из обзора
      const contentImagesPaths: string[] = [];
      for (const imgSrc of imagesSrc.slice(0, 4)) {
        if (imgSrc) {
          const savedPath = await downloadImageForS3(imgSrc, slug, "reviews", {
            page: pageToImages,
            convert_to_png: false,
            incriase: false,
            proxy_tor: true,
            remove_wattermark: true,
            textDelete: true,
          });
          if (savedPath) contentImagesPaths.push(savedPath);
        }
      }
      await parseReviews(
        cleanHiddenCharacters(cleaneText(metaTitle)),
        cleanHiddenCharacters(cleaneText(metaDescription)),
        slug,
        generatedDate,
        article.title ? article.title : "",
        translatedTitle ? cleanHiddenCharacters(cleaneText(translatedTitle)) : "",
        translatedContent ? cleanHiddenCharacters(cleaneText(translatedContent)).replace(/html/gi, "") : "",
        previewPath ? previewPath : "",
        contentImagesPaths,
        parsedTags ? parsedTags : [],
      );
      reviews_limit++;
    }
  }
};
