import { dataBase } from "@/shared/lib/db_conect";
import { PartialNewsBySitemap } from "../_domain/types";

export const getAllNewsSlugAndDate = async (): Promise<PartialNewsBySitemap[] | []> => {
  try {
    const news = await dataBase.news.findMany({
      select: {
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return news;
  } catch (error) {
    console.log(error);
    return [];
  }
};
