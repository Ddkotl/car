"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function getTagsCount(): Promise<number | undefined> {
  try {
    return await dataBase.tag.count();
  } catch (error) {
    console.log(error);
    return;
  }
}
