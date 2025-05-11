"use server";
import { dataBase } from "@/shared/lib/db_connect";
import { BrandWithModelsCount } from "../_domain/types";

export const getBrandsListWithModelsCount = async (
  pageParam: number,
  perPage: number,
  searchTerm?: string,
): Promise<BrandWithModelsCount[]> => {
  try {
    const brands = dataBase.carBrands.findMany({
      where: {
        name: { contains: searchTerm, mode: "insensitive" },
      },
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { car_models: true } },
      },
      skip: (pageParam - 1) * perPage,
      take: perPage,
    });

    return brands;
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return [];
  }
};
