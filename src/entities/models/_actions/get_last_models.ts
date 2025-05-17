"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export async function getLastModels(count: number): Promise<PartialPhoneModel[] | []> {
  try {
    return await dataBase.phoneModels.findMany({
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
