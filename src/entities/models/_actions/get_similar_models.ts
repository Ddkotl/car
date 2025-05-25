"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export async function getSimilarModels(
  brandId: string,
): Promise<(PartialPhoneModel & { brand?: { name: string } })[] | []> {
  try {
    return await dataBase.phoneModels.findMany({
      where: { brandId: brandId }, // Фильтруем по brandId
      select: {
        short_name: true,
        full_name: true,
        id: true,
        slug: true,
        main_image: true,
        brand: {
          // Включаем имя бренда
          select: {
            name: true,
          },
        },
      },
      take: 4, // Ограничиваем результат 5 моделями
      orderBy: { createdAt: "desc" }, // Сортируем по дате создания (новые сначала)
    });
  } catch (error) {
    console.error("getSimilarModels error:", error); // Логируем ошибку
    return []; // Возвращаем пустой массив в случае ошибки
  }
}
