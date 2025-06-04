import { dataBase } from "@/shared/lib/db_connect";

export const getAllBrandsSlugAndDate = async () => {
  try {
    const brands = await dataBase.carBrands.findMany({
      select: {
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};
