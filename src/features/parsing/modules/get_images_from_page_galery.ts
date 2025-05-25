import { Page } from "playwright";

// Функция для извлечения URL из стиля
export const extractBackgroundImage = async (element: ReturnType<Page["locator"]>): Promise<string | null> => {
  const style = await element.getAttribute("style");
  if (!style) return null;

  const urlMatch = style.match(/url\(["']?(.*?)["']?\)/);
  if (!urlMatch) return null;

  return decodeURIComponent(urlMatch[1]).replace(/(^['"]|['"]$)/g, "");
};

export const getImagesFromPageGallery = async (page: Page): Promise<string[]> => {
  const imgUrlList: string[] = [];
  const imgGalleryFirstLinkLocator = "p.image-row > a";
  const imgLocator = "div[class='map']";
  const nextButtonLocator = "a.go-right";

  try {
    const cookieButtonLocator = "button:has-text('Agree and proceed')";
    try {
      await page.waitForSelector(cookieButtonLocator, { state: "visible" });
      const cookieButton = page.locator(cookieButtonLocator);
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
        await page.waitForTimeout(1000); // Даем время на скрытие баннера
      }
    } catch (error) {
      console.log("Баннер не найден или скрыт:", error);
    }
    // Проверяем, есть ли ссылка на галерею
    const imgGalleryLink = page.locator(imgGalleryFirstLinkLocator).first();
    if (!(await imgGalleryLink.isVisible())) {
      console.warn("Ссылка на галерею не найдена");
      return [];
    }
    await page.waitForTimeout(1000);
    await imgGalleryLink.click();
    await page.waitForSelector(imgLocator, { state: "attached" });
    await page.waitForTimeout(1000);

    // Получаем первое изображение

    const firstImage = await page.locator(imgLocator);
    const firstImageSrc = await extractBackgroundImage(firstImage);
    if (!firstImageSrc) throw new Error("Первое изображение не найдено");
    imgUrlList.push(firstImageSrc);

    let iteration = 0;
    const MAX_ITERATIONS = 9;

    while (iteration++ < MAX_ITERATIONS) {
      const nextButton = page.locator(nextButtonLocator).first();

      if (!(await nextButton.isVisible()) || !(await nextButton.isEnabled())) break;

      await nextButton.click();
      await page.waitForTimeout(2000);

      const currentImage = page.locator(imgLocator).first();
      const currentImageSrc = await extractBackgroundImage(currentImage);
      await page.waitForTimeout(2000);
      if (!currentImageSrc) continue;
      if (currentImageSrc === firstImageSrc) break;
      if (!imgUrlList.includes(currentImageSrc)) imgUrlList.push(currentImageSrc);
    }
    const closeGalleryButtonLocator = "div[title='Close gallery']";
    const closeButton = page.locator(closeGalleryButtonLocator);
    await closeButton.waitFor({ state: "visible" });
    await closeButton.click();
    await page.waitForTimeout(5000);
    return imgUrlList;
  } catch (e) {
    console.error("Ошибка:", e);
    return [];
  }
};

// (async () => {
//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext({
//     userAgent:
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//     recordVideo: {
//       dir: `./img_for_test/v1-${new Date().toISOString()}`,
//       size: { width: 1280, height: 720 },
//     },
//   });
//   const page = await context.newPage();

//   try {
//     await page.goto(
//       "https://www.gsmarena.com/samsung_galaxy_f16_5g_announced_as_rebadged_galaxy_m16-news-66915.php",
//     );

//     const images = await getImagesFromPageGallery(page);
//     console.log("Найденные изображения:", images);
//   } finally {
//     await browser.close();
//   }
// })();
