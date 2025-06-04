import { dataBase } from "@/shared/lib/db_connect";

export const getAllModeLsSlugAndDate = async () => {
  try {
    const phoneModels = await dataBase.carsModels.findMany({
      select: {
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return phoneModels;
  } catch (error) {
    console.log(error);
    return [];
  }
};
