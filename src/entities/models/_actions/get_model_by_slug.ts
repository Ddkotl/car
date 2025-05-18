"use server";

import { dataBase } from "@/shared/lib/db_connect";

export async function getModeBySlug(slug: string) {
  try {
    return await dataBase.carsModels.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Не удалось получить информацию о модели", error);
    return null;
  }
}
