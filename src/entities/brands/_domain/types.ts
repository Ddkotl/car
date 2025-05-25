import { CarBrands } from "../../../../generated/prisma";

export type BrandWithModelsCount = CarBrands & {
  _count: {
    car_models: number;
  };
};
export type PartialBrandsBySitemap = Pick<CarBrands, "createdAt" | "slug">;
