import { Page } from "playwright";
import { getImagesFromPageGallery } from "./get_images_from_page_galery";
import { checkRequestLimits } from "../functions/check_requesl_limits";
import { dataBase } from "@/shared/lib/db_connect";
import { transliterateToUrl } from "@/shared/lib/transliterate";
import { safeTranslate } from "@/shared/lib/openai/translate/safe_translate";
import { translateText } from "@/shared/lib/openai/translate/translate_text";
import { generateDataForPost } from "../functions/generate_data_for_post";
import { cleanAndParseTags } from "../functions/clean_and_parse_tags";
import { downloadImageForS3 } from "@/shared/lib/download_image_for_S3";
import { cleaneText } from "@/shared/lib/openai/translate/cleane_text";
import { cleanHiddenCharacters } from "@/shared/lib/openai/translate/cleane_text_by_hidden_char";
import { ParseNews } from "../seed/parse_news";
import { translatePost } from "@/shared/lib/openai/translate/translate_post";
import { generateText } from "@/shared/lib/openai/translate/generate_text";
import { generateTags } from "@/shared/lib/openai/translate/generate_tags";
import { translateTags } from "@/shared/lib/openai/translate/translate_tags";
import { NEWS_LIMIT } from "../limits";

export const parseNewsFromManyPages = async (page: Page, pageToImages: Page, n: number) => {
  for (let i = 1; i <= n; i++) {
    console.log(`Parsing news from page ${i}`);

    await page.goto(`https://www.arenaev.com/news.php3?iPage=${i}`, { timeout: 60000, waitUntil: "domcontentloaded" });

    try {
      await page.waitForSelector(".news-item", { state: "visible", timeout: 60000 });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }

    const articles = await page.locator(".news-item").evaluateAll((elements) =>
      elements.map((el) => ({
        titleForImg: el.querySelector("a > h3")?.textContent?.trim(),
        title: el.querySelector("a > h3")?.textContent?.trim() as string,
        data: el.querySelector(".meta-line > .meta-item-time")?.textContent?.trim(),
        link: el.querySelector("a")?.getAttribute("href"),
        previewImageUrl: el.querySelector("img")?.getAttribute("src"),
      })),
    );
    let news_limit = 0;
    for (const article of articles) {
      if (news_limit >= NEWS_LIMIT) {
        continue;
      }
      const news = await dataBase.posts.findFirst({
        where: { original_title: article.title },
      });
      if (!article.link) {
        continue;
      }
      if (news) {
        continue;
      }

      await page.goto(`https://www.arenaev.com/${article.link}`, { timeout: 60000, waitUntil: "domcontentloaded" });
      try {
        await page.waitForSelector(".review-body", { state: "visible", timeout: 60000 });
        await page.waitForSelector(".article-tags .float-right", { state: "visible", timeout: 60000 });
        await page.waitForSelector(".review-body p", { state: "visible", timeout: 60000 });
      } catch (error) {
        console.log(error);
        await checkRequestLimits(page);
      }
      const generatedDate = generateDataForPost(article.data);
      const content: string[] = await page.locator(".review-body p").allTextContents();
      const contentResponse: string = content.join(" ");
      const tags = await page
        .locator(".article-tags .float-right a")
        .evaluateAll((tags) =>
          tags.map((tag) => tag.textContent?.trim().toLowerCase()).filter((tag) => tag !== undefined),
        );
      if (
        tags.includes("gsmarena") ||
        tags.includes("arenaev") ||
        tags.includes("weekly poll") ||
        tags.includes("deals")
      ) {
        continue;
      }
      const translatedTitle = article.title
        ? await safeTranslate(article.title, translateText, "тайтл новости", 0.2)
        : "";
      const slug: string = transliterateToUrl(translatedTitle);
      let imagesSrc: string[] = await page
        .locator(".review-body > img")
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null));

      const imgGalery = await getImagesFromPageGallery(page);
      imagesSrc = imagesSrc.concat(imgGalery);
      const slicedImgSrc = imagesSrc.slice(0, 4);

      const translatedContent = await safeTranslate(contentResponse, translatePost);
      const metaTitle = await safeTranslate(
        translatedTitle,
        generateText,
        "и оптимизируй тайтл новости для сео(максимум 50 символов)",
        0.5,
      );
      const metaDescription = await safeTranslate(
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
      // Сохранение превью и всех картинок
      const previewPath = article.previewImageUrl
        ? await downloadImageForS3(article.previewImageUrl, slug, "news_preview", {
            page: pageToImages,
            convert_to_png: false,
            incriase: true,
            proxy_tor: true,
            remove_wattermark: true,
            textDelete: true,
          })
        : null;

      const contentImagesPaths = [];
      for (const imgSrc of slicedImgSrc) {
        if (imgSrc) {
          const savedPath = await downloadImageForS3(imgSrc, slug, "news", {
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
      await ParseNews(
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
      news_limit++;
    }
  }
};
