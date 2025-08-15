import { Page } from "playwright";
import { checkRequestLimits } from "../functions/check_requesl_limits";
import { transliterateToUrl } from "@/shared/lib/transliterate";
import { dataBase } from "@/shared/lib/db_connect";
import { safeTranslate } from "@/shared/lib/openai/translate/safe_translate";
import { translateText } from "@/shared/lib/openai/translate/translate_text";
import { cleaneText } from "@/shared/lib/openai/translate/cleane_text";
import { cleanHiddenCharacters } from "@/shared/lib/openai/translate/cleane_text_by_hidden_char";
import { translateModelDescription } from "@/shared/lib/openai/translate/translate_model_description";
import { downloadImageForS3 } from "@/shared/lib/download_image_for_S3";
import { parseModel } from "../seed/parse_model";

export const getModelsByBrand = async (
  modelNotExist: {
    model: string;
    url: string;
    prev_img: string;
  }[],
  brandName: string,
  page: Page,
  pageToImages: Page,
) => {
  for (const model of modelNotExist) {
    await page.goto(`https://www.arenaev.com/${model.url}`, { timeout: 60000, waitUntil: "domcontentloaded" });
    try {
      await page.waitForSelector(".article-info-name", {
        state: "visible",
        timeout: 60000,
      });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }
    const shortName = model.model;
    const fullName = await page.locator(".article-info-name").innerText();

    const slug = transliterateToUrl(fullName);

    const existingModel = await dataBase.carsModels.findUnique({
      where: { slug: slug },
    });

    if (existingModel) {
      console.log(`Модель с таким slug уже существует: ${slug}`);
      continue;
    }

    const power = await page.locator('span[data-spec="power-hl"]').innerText();
    const powerunits = await page.locator('span[data-spec="powerunits-hl"]').innerText();
    const powerunits_ru = powerunits === "kW" ? "кВт" : powerunits;
    const drivetype = await page.locator('div[data-spec="drivetype-hl"]').innerText();
    const translated_drivetype = await safeTranslate(
      drivetype,
      translateText,
      "тип привода автомобиля(передний привод, задний приводбполный привод",
      0.1,
    );
    const acceleration = await page.locator('span[data-spec="acceleration-hl"]').innerText();
    const battery_capacity = await page.locator('span[data-spec="batterycapacity-hl"]').innerText();
    const powerunits_batary = await page.locator("strong.accent-camera").innerText();
    const powerunits_batary_ru =
      powerunits_batary.replace(/\d/gi, "") === "kWh" ? "кВтч" : powerunits_batary.replace(/\d/gi, "");
    const range = await page.locator('span[data-spec="range-hl"]').innerText();
    const rangeunits = await page.locator('span[data-spec="rangeunits-hl"]').innerText();
    const rangeunits_ru = rangeunits === "km" ? "км" : rangeunits;

    const description = await page.locator('div[id="specs-list"]').innerHTML();
    const translated_description = await safeTranslate(description, translateModelDescription);

    const preview_img_url = await downloadImageForS3(model.prev_img, slug, "preview_models", {
      page: pageToImages,
      convert_to_png: true,
      incriase: true,
      proxy_tor: true,
      remove_wattermark: false,
      textDelete: false,
    });

    const contentImagesPaths = [];
    try {
      const imagesPageUrl = await page
        .locator(".article-info-meta > .article-info-meta-link > a")
        .getByText("Images")
        .first()
        .getAttribute("href");

      if (imagesPageUrl) {
        await page.goto(`https://www.arenaev.com/${imagesPageUrl}`, { timeout: 60000, waitUntil: "domcontentloaded" });
        try {
          await page.waitForSelector("#pictures-list", {
            state: "visible",
            timeout: 60000,
          });
        } catch (error) {
          console.log(error);
          await checkRequestLimits(page);
        }
        const imagesSrc = await page
          .locator("#pictures-list > img")
          .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null));
        const slicedImgSrc = imagesSrc.slice(0, 6);

        for (const imgSrc of slicedImgSrc) {
          if (imgSrc) {
            const savedPath = await downloadImageForS3(imgSrc, slug, "models_all", {
              page: pageToImages,
              convert_to_png: false,
              incriase: false,
              proxy_tor: true,
              remove_wattermark: true,
              textDelete: false,
            });
            if (savedPath) {
              contentImagesPaths.push(savedPath);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Ошибка при получении картинок для ${model.model}:`, error);
    }
    await parseModel({
      shortName,
      fullName,
      slug,
      brandName,
      preview_img_url: preview_img_url ? preview_img_url : "/placeholder.png",
      power: `${power} ${powerunits_ru}`,
      drivetype: cleaneText(cleanHiddenCharacters(translated_drivetype.toLowerCase())),
      acceleration: acceleration,
      battery_capacity: `${battery_capacity} ${powerunits_batary_ru}`,
      range: `${range} ${rangeunits_ru}`,
      description: translated_description,
      contentImagesPaths: contentImagesPaths,
    });

    await page.waitForTimeout(3000);
  }
};
