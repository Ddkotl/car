"use server";

import { dataBase } from "@/shared/lib/db_connect";

export async function getLastModels(count: number) {
  try {
    return await dataBase.carsModels.findMany({
      select: {
        short_name: true,
        full_name: true,
        id: true,
        slug: true,
        main_image: true,
      },
      take: count, // Ограничиваем результат 5 моделями
      orderBy: { createdAt: "desc" }, // Сортируем по дате создания (новые сначала)
    });
  } catch (error) {
    console.error("getLastModels error:", error); // Логируем ошибку
    return []; // Возвращаем пустой массив в случае ошибки
  }
}
