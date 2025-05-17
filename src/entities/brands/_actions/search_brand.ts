"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { BrandWithModelsCount } from "../_domain/types";

export async function searchBrands(query: string): Promise<BrandWithModelsCount[] | []> {
  if (!query) return [];
  try {
    return await dataBase.brands.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      take: 9, // Ограничиваем количество результатов
      include: { _count: { select: { phones: true } } },
    });
  } catch (error) {
    console.log("Ошибка при поиске брендов:", error);
    return [];
  }
}
