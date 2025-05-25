import { Page } from "playwright";
import { checkRequestLimits } from "../functions/check_requesl_limits";

export const getModelsUrlByBrand = async (brandUrl: string, page: Page) => {
  const allModelsUrl = [];
  let currentPage: string | null = `https://www.arenaev.com/${brandUrl}`;

  while (currentPage) {
    // Переход на текущую страницу
    await page.goto(currentPage, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });
    try {
      await page.waitForSelector(".makers", {
        state: "visible",
        timeout: 60000,
      });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }
    // Локатор для всех моделей на странице
    const allModelsSinglePage = await page.locator(".makers > ul > li > a").evaluateAll((elements) =>
      elements.map((e) => ({
        model: e.querySelector("strong")?.textContent as string,
        url: e.getAttribute("href") as string,
        prev_img: e.querySelector("img")?.getAttribute("src") as string,
      })),
    );

    // Добавляем URL моделей в общий массив
    allModelsUrl.push(...allModelsSinglePage);

    // Поиск URL следующей страницы
    const nextPageUrl = await getNextPageUrl(page);
    if (!nextPageUrl) break; // Если нет следующей страницы, выходим из цикла

    currentPage = nextPageUrl;
  }

  return allModelsUrl.reverse();
};

/**
 * Функция для получения ссылки на следующую страницу бренда.
 */
export const getNextPageUrl = async (page: Page): Promise<string | null> => {
  const nextPageElement = page.locator('.nav-pages a.prevnextbutton[title="Next page"]');

  // Проверяем, есть ли кнопка "Next page" на странице
  if ((await nextPageElement.count()) === 0) {
    return null;
  }

  // Получаем ссылку
  const nextPageUrl = await nextPageElement.getAttribute("href");

  if (!nextPageUrl) {
    return null;
  }

  // Формируем полный URL
  const fullNextPageUrl = `https://www.arenaev.com/${nextPageUrl}`;

  return fullNextPageUrl;
};
