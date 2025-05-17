"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { BrandWithModelsCount } from "../_domain/types";

export const getAllBrands = async (): Promise<BrandWithModelsCount[]> => {
  try {
    const brands = await dataBase.brands.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { phones: true } },
      },
    });

    return brands;
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return [];
  }
};
