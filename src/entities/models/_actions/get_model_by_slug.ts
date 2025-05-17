"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export async function getPhoneModeBySlug(slug: string): Promise<PartialPhoneModel | null> {
  try {
    return await dataBase.phoneModels.findUnique({
      where: { slug },
      select: {
        short_name: true,
        full_name: true,

        id: true,
        slug: true,
        main_image: true,
      },
    });
  } catch (error) {
    console.error("Не удалось получить информацию о модели", error);
    return null;
  }
}
