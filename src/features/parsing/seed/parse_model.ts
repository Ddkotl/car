import { dataBase } from "@/shared/lib/db_connect";
import { CarsModels } from "../../../../generated/prisma";

export const parseModel = async ({
  shortName,
  fullName,
  slug,
  brandName,
  preview_img_url,
  power,
  drivetype,
  acceleration,
  battery_capacity,
  range,
  description,
  contentImagesPaths,
}: {
  shortName: string;
  fullName: string;
  slug: string;
  brandName: string;
  preview_img_url: string;
  power: string;
  drivetype: string;
  acceleration: string;
  battery_capacity: string;
  range: string;
  description: string;
  contentImagesPaths: string[];
}) => {
  try {
    const createdModel: CarsModels = await dataBase.carsModels.upsert({
      where: { short_name: shortName },
      update: {},
      create: {
        full_name: fullName,
        short_name: shortName,
        slug: slug,
        main_image: preview_img_url,
        car_brand: {
          connect: { name: brandName },
        },
        specifications: {
          create: {
            images: contentImagesPaths,
            power: power,
            drivetype: drivetype,
            acceleration: acceleration,
            battery_capacity: battery_capacity,
            range: range,
            description: description,
          },
        },
      },
    });

    console.log("Model created: ", createdModel.full_name);
  } catch (error) {
    console.log("Error creating model: ", error);
  }
};
