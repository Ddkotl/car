import { dataBase } from "@/shared/lib/db_connect";

export const getBrandBySlug = async (slug: string) => {
  try {
    return await dataBase.carBrands.findUnique({
      where: { slug },
      include: {
        _count: { select: { car_models: true } },
      },
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};
