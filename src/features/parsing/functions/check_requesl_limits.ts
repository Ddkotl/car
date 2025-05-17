import { Page } from "playwright";
// import { restartTor } from "../../tor";

export async function checkRequestLimits(page: Page): Promise<void> {
  const MAX_RETRIES = 20;
  const ERROR_TEXT = "text=Too Many Requests";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Проверка ограничений (попытка ${attempt}/${MAX_RETRIES})`);

      const errorElement = await page
        .waitForSelector(ERROR_TEXT, {
          timeout: 20000,
          state: "visible",
        })
        .catch(() => null);

      if (!errorElement) {
        console.log("Ограничений запросов нет.");
        return;
      }

      console.log("Обнаружено ограничение запросов. Перезапуск Tor...");
      // await restartTor();
      await page.reload({ waitUntil: "load" });
    } catch (error) {
      console.error(`Ошибка при попытке ${attempt}:`, error);

      if (attempt === MAX_RETRIES) {
        throw new Error(`Превышено количество попыток: ${error}`);
      }

      await page.waitForTimeout(5000);
    }
  }
}
