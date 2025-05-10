import { Browser, chromium } from "playwright";
import { addHTTPheaders } from "./functions/addHttpHeader";
import { getAllCarsModels } from "./modules/get_all_cars_models";

export async function startParse() {
  console.log("start parsing");
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const [page, pageToImages] = await addHTTPheaders(
      browser,
      true,
    );
    await getAllCarsModels(page, pageToImages);
  } catch (error) {
    console.error("Parsing Error", error);
  } finally {
    if (browser) {
      browser.close();
      console.log("browser closed");
    }
  }
}
