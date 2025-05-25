"use server";

import { dataBase } from "@/shared/lib/db_connect";
export async function getModelFullInfoBySlug(slug: string) {
  try {
    return await dataBase.carsModels.findUnique({
      where: { slug },
      select: {
        id: true,
        createdAt: true,
        slug: true,
        short_name: true,
        full_name: true,
        main_image: true,
        car_brand_id: true,
        specifications: true,
      },
    });
  } catch (error) {
    console.error("Не удалось получить информацию о модели", error);
    return null;
  }
}
export type ModelFullInfoType = Awaited<ReturnType<typeof getModelFullInfoBySlug>>;
