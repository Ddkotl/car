import { dataBase } from "@/shared/lib/db_conect";
import { BrandWithModelsCount } from "../_domain/types";

export const getBrandBySlug = async (slug: string): Promise<BrandWithModelsCount | null> => {
  try {
    return await dataBase.brands.findUnique({
      where: { slug },
      include: {
        _count: { select: { phones: true } },
      },
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};
