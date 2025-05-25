import { dataBase } from "@/shared/lib/db_connect";
import { transliterateToUrl } from "@/shared/lib/transliterate";

export const createBrands = async (brandName: string) => {
  try {
    const brandSlug = transliterateToUrl(brandName);
    await dataBase.carBrands.upsert({
      where: { name: brandName },
      update: {},
      create: {
        name: brandName,
        slug: brandSlug,
      },
    });
  } catch (error) {
    console.error(`Error processing brand "${brandName}":`, error);
  }
};
