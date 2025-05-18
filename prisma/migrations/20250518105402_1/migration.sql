/*
  Warnings:

  - Made the column `car_brand_id` on table `cars_models` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cars_models" DROP CONSTRAINT "cars_models_car_brand_id_fkey";

-- AlterTable
ALTER TABLE "cars_models" ALTER COLUMN "car_brand_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "cars_models" ADD CONSTRAINT "cars_models_car_brand_id_fkey" FOREIGN KEY ("car_brand_id") REFERENCES "car_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
