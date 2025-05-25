import { Tag } from "@prisma/client";

export type PartialTag = Pick<Tag, "slug" | "title">;

export type TagsWithCounts = Tag & {
  _count: {
    news: number;
    reviews: number;
  };
};
