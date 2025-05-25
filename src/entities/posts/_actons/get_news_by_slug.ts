"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { NewsWithIncludes } from "../_domain/types";

export const getSingleNewsBySlug = async (slug: string): Promise<NewsWithIncludes | null> => {
  try {
    const news = await dataBase.news.findUnique({
      where: { slug: slug },
      include: {
        tags: true,
        bookmarks: true,
        _count: { select: { bookmarks: true } },
      },
    });

    if (news) {
      return {
        ...news,
        bookmarksCount: news._count.bookmarks,
      };
    }

    return null;
  } catch (error) {
    console.log("Error fetching news by slug:", error);
    throw error;
  }
};
