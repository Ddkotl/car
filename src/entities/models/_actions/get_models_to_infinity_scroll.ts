"use server";
import { dataBase } from "@/shared/lib/db_connect";
import { CarsModels } from "../../../../generated/prisma";

export const getModelsListToInfinityScroll = async (
  brandSlug: string,
  pageParam: number,
  perPage: number,
  searchTerm?: string,
): Promise<CarsModels[]> => {
  try {
    const models = dataBase.carsModels.findMany({
      where: { car_brand: { slug: brandSlug }, full_name: { contains: searchTerm, mode: "insensitive" } },
      orderBy: {
        createdAt: "desc",
      },
      skip: (pageParam - 1) * perPage,
      take: perPage,
    });

    return models;
  } catch (error) {
    console.log("Ошибка при получении моделей:", error);
    return [];
  }
};
