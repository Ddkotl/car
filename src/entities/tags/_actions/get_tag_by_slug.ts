import { dataBase } from "@/shared/lib/db_conect";
import { TagsWithCounts } from "../_domain/types";

export async function getTagBYSlug(slug: string): Promise<TagsWithCounts | null> {
  try {
    const tag = dataBase.tag.findUnique({
      where: {
        slug: slug,
      },
      include: {
        _count: {
          select: { news: true, reviews: true },
        },
      },
    });
    return tag;
  } catch (error) {
    console.log("Не удалось получить тэг", error);
    return null;
  }
}
