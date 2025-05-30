"use server";

import { dataBase } from "@/shared/lib/db_connect";

type NextAndPrevModelsResult = {
  prev_slug: string | null;
  prev_full_name: string | null;
  prev_main_image: string | null;
  next_slug: string | null;
  next_full_name: string | null;
  next_main_image: string | null;
};

export const getNextAndPrevModelsInfo = async (
  currentModelSlug: string,
  brandId: string,
): Promise<NextAndPrevModelsResult | null> => {
  try {
    const result = await dataBase.$queryRaw<NextAndPrevModelsResult[]>`
      WITH ranked_models AS (
        SELECT
          slug,
          full_name,
          main_image,
          car_brand_id,
          ROW_NUMBER() OVER (PARTITION BY "car_brand_id" ORDER BY "created_at") AS row_num
        FROM "cars_models"
        WHERE car_brand_id = ${brandId}
      )
      SELECT
        prev.slug AS prev_slug,
        prev.full_name AS prev_full_name,
        prev.main_image AS prev_main_image,
        next.slug AS next_slug,
        next.full_name AS next_full_name,
        next.main_image AS next_main_image
      FROM ranked_models current
      LEFT JOIN ranked_models prev ON current.row_num = prev.row_num + 1 AND current.car_brand_id = prev.car_brand_id
      LEFT JOIN ranked_models next ON current.row_num = next.row_num - 1 AND current.car_brand_id = next.car_brand_id
      WHERE current.slug = ${currentModelSlug};
    `;

    // Извлекаем первую строку из результата
    const firstRow = result[0];

    return firstRow || null;
  } catch (error) {
    console.error("getNextAndPrevModels error:", error); // Логируем ошибку
    return null; // Возвращаем null в случае ошибки
  }
};
