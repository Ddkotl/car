"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PhoneModeLFullInfo } from "../_domain/types";

export async function getPhoneModelInfo(slug: string): Promise<PhoneModeLFullInfo | null> {
  try {
    return await dataBase.phoneModels.findUnique({
      where: { slug },
      include: {
        specifications: true,
        Reviews: {
          select: {
            id: true,
            createdAt: true,
            previewImage: true,
            slug: true,
            views: true,
            title: true,
            meta_description: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Не удалось получить информацию о модели", error);
    return null;
  }
}
