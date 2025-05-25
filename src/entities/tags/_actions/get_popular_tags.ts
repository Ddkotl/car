"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { Tag } from "@prisma/client";

export async function getPopularTags(count: number): Promise<Tag[] | null> {
  try {
    const tag = dataBase.tag.findMany({
      take: count,
      orderBy: {
        news: {
          _count: "desc",
        },
      },
    });
    return tag;
  } catch (error) {
    console.log("Не удалось получить популярные тэги", error);
    return null;
  }
}
