import { dataBase } from "@/shared/lib/db_conect";
import { PartialBrandsBySitemap } from "../_domain/types";

export const getAllBrandsSlugAndDate = async (): Promise<
  PartialBrandsBySitemap[] | []
> => {
  try {
    const brands = await dataBase.brands.findMany({
      select: {
        slug: true,
        createdAt: true,
      },
    });
    return brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};
