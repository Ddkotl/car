"use server";

import { dataBase } from "@/shared/lib/db_connect";
import { PostTypes, Tag } from "../../../../generated/prisma";

export const getSomePosts = async ({
  count,
  tagSlug,
  type,
  slug,
  tags,
}: {
  count: number;
  tagSlug?: string;
  type: PostTypes;
  slug?: string;
  tags?: Tag[];
}) => {
  try {
    if (slug && tags) {
      const tags_ids = tags.map((e) => e.id);
      const similar_news = await dataBase.posts.findMany({
        take: count,
        where: {
          type: type,
          slug: { not: slug },
          tags: {
            some: { id: { in: tags_ids } },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return similar_news;
    }
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
