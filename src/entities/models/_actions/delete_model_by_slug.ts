"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function deleteModelBySlug(slug: string) {
  try {
    await dataBase.phoneModels.delete({
      where: { slug: slug },
    });
  } catch (error) {
    console.error(error);
  }
}
