import { Browser, BrowserContext, chromium, Page } from "playwright";
import { addHTTPheaders } from "./functions/addHttpHeader";
import { getAllCarsModels } from "./modules/get_all_cars_models";
import { parseNewsFromManyPages } from "./modules/get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./modules/get_reviews_with_tag_from_many_pages";

export async function StartParse() {
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error("Tech parse time out after 5 hours")), 5 * 60 * 60 * 1000 - 5 * 60 * 1000);
  });
  try {
    Promise.race([ExeParse(), timeoutPromise]);
  } catch (error) {
    console.error("Error in start parse", error);
  } finally {
    clearTimeout(timer);
  }
}

export async function ExeParse() {
  console.log("start parsing");
  let browser: Browser | undefined;
  let page: Page | undefined;
  let pageToImages: Page | undefined;
  let context: BrowserContext | undefined;
  let contextToImages: BrowserContext | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const data = await addHTTPheaders(browser, false);
    page = data.page;
    pageToImages = data.pageToImages;
    context = data.context;
    contextToImages = data.contextToImages;

    await parseNewsFromManyPages(page, pageToImages, 1);
    await getAllCarsModels(page, pageToImages);
    await parseReviewsFromManyPages(page, pageToImages, 1);
  } catch (error) {
    console.error("Parsing Error", error);
  } finally {
    if (page) {
      await page.close();
      console.log("page closed");
    }
    if (pageToImages) {
      await pageToImages.close();
      console.log("pageToImages closed");
    }
    if (context) {
      await context.close();
      console.log("context closed");
    }
    if (contextToImages) {
      await contextToImages.close();
      console.log("contextToImages closed");
    }
    if (browser) {
      await browser.close();
      console.log("browser closed");
    }
  }
}
