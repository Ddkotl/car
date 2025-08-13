import { Browser, chromium } from "playwright";
import { addHTTPheaders } from "./functions/addHttpHeader";
import { getAllCarsModels } from "./modules/get_all_cars_models";
import { parseNewsFromManyPages } from "./modules/get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./modules/get_reviews_with_tag_from_many_pages";

export async function StartParse() {
  const timeoutPromise = new Promise((_, rej) => {
    setTimeout(() => rej(new Error("Tech parse time out after 5 hours")), 5 * 60 * 60 * 1000);
  });
  try {
    Promise.race([ExeParse(), timeoutPromise]);
  } catch (error) {
    console.error("Error in start parse", error);
  }
}

export async function ExeParse() {
  console.log("start parsing");
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const [page, pageToImages] = await addHTTPheaders(browser, false);

    await parseNewsFromManyPages(page, pageToImages, 1);
    await getAllCarsModels(page, pageToImages);
    await parseReviewsFromManyPages(page, pageToImages, 1);
  } catch (error) {
    console.error("Parsing Error", error);
  } finally {
    if (browser) {
      browser.close();
      console.log("browser closed");
    }
  }
}
