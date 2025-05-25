"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialNewsWithTags } from "../_domain/types";

export const getNewsWithPaginaton = async (
  page: number,
  pageSize: number,
): Promise<{
  news: PartialNewsWithTags[];
  totalNewsCount: number;
}> => {
  try {
    const [news, totalNewsCount] = await Promise.all([
      dataBase.news.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          createdAt: true,
          meta_description: true,
          slug: true,
          title: true,
          previewImage: true,
          views: true,
          tags: { select: { slug: true, title: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      dataBase.news.count(),
    ]);
    return { news, totalNewsCount };
  } catch (error) {
    console.error("Ошибка при получении новостей:", error);
    return { news: [], totalNewsCount: 0 };
  }
};
