import { privateConfig } from "@/shared/lib/config/private";
import { Browser, BrowserContext, Page } from "playwright";

export const addHTTPheaders = async (browser: Browser, isTest: boolean = false) => {
  try {
    const contextToImages: BrowserContext = await browser.newContext({
      bypassCSP: true,
      javaScriptEnabled: true,
      viewport: {
        width: 1280 + Math.floor(Math.random() * 200),
        height: 720 + Math.floor(Math.random() * 200),
      },
      // userAgent:
      //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "America/New_York",
      permissions: ["geolocation"],
      geolocation: {
        latitude: 40.7128,
        longitude: -74.006,
      },
      colorScheme: "dark",
      httpCredentials: undefined,
      // extraHTTPHeaders: {
      //   "Accept-Language": "en-US,en;q=0.9",
      //   "Sec-Ch-Ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      //   "Sec-Ch-Ua-Mobile": "?0",
      //   "Sec-Ch-Ua-Platform": '"Windows"',
      //   Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      // },
      proxy: {
        server: `socks5://127.0.0.1:${privateConfig.TOR_PROXY_PORT}`, // Адрес Tor SOCKS-прокси
      },
      ...(isTest
        ? {
            recordVideo: {
              dir: `./img_for_test/v1-${new Date().toISOString()}`,
              size: { width: 1280, height: 720 },
            },
          }
        : {}),
    });

    // Добавляем stealth-плагин
    await contextToImages.addInitScript(() => {
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });
    });
    const context: BrowserContext = await browser.newContext({
      ...(isTest
        ? {
            recordVideo: {
              dir: `./img_for_test/v2-${new Date().toISOString()}`,
              size: { width: 1280, height: 720 },
            },
          }
        : {}),
    });
    const page: Page = await context.newPage();
    const pageToImages: Page = await contextToImages.newPage();
    // Эмулируем человеческий ввод
    // await pageToImages.emulateMedia({ media: "screen" });
    // await pageToImages.setExtraHTTPHeaders({
    //   DNT: "1",
    //   "Accept-Encoding": "gzip, deflate, br",
    //   "User-Agent":
    //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    //   "Accept-Language": "en-US,en;q=0.9",
    //   Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    // });

    // Настройка перехвата запросов
    // await page.route(/.*/, (route) => {
    //   const blockedResources = ["image", "stylesheet", "font"];
    //   if (blockedResources.includes(route.request().resourceType())) {
    //     route.abort();
    //   } else {
    //     route.continue();
    //   }
    // });
    return { page, pageToImages, context, contextToImages };
  } catch (error) {
    console.log("Ошибка при добавлении HTTP-заголовков:", error);
    throw error; // Проброс ошибки для логирования в вызывающем коде
  }
};
