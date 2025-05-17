import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export const getPhoneModelsByBrandSlug = async (brandSlug: string): Promise<PartialPhoneModel[]> => {
  try {
    return await dataBase.phoneModels.findMany({
      where: { brand: { slug: brandSlug } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        short_name: true,
        full_name: true,
        main_image: true,
        slug: true,
      },
    });
  } catch (error) {
    console.error("Error fetching phone models:", error);
    return [];
  }
};
