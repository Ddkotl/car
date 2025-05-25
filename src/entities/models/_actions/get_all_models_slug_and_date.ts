import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModeLsBySitemap } from "../_domain/types";

export const getAllPhoneModeLsSlugAndDate = async (): Promise<PartialPhoneModeLsBySitemap[] | []> => {
  try {
    const phoneModels = await dataBase.phoneModels.findMany({
      select: {
        slug: true,
        createdAt: true,
      },
    });
    return phoneModels;
  } catch (error) {
    console.log(error);
    return [];
  }
};
