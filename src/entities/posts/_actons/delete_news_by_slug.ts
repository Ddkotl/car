"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function deleteNewsBySlug(slug: string): Promise<void> {
  try {
    await dataBase.news.delete({
      where: {
        slug: slug,
      },
    });
  } catch (error) {
    console.log("Error in deleteNewsBySlug", error);
  }
}
