"use server";

import { dataBase } from "@/shared/lib/db_connect";
import { PostTypes } from "../../../../generated/prisma";

export const getSomePosts = async ({ count, tagSlug, type }: { count: number; tagSlug?: string; type: PostTypes }) => {
  try {
    const news = await dataBase.posts.findMany({
      take: count,
      where: { type: type, tags: { some: { slug: tagSlug } } },
      orderBy: {
        createdAt: "desc",
      },
    });

    return news;
  } catch (error) {
    console.error("Error fetching some posts:", error);
  }
};
