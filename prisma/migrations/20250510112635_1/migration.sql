/*
  Warnings:

  - You are about to drop the column `carMarksId` on the `cars_models` table. All the data in the column will be lost.
  - You are about to drop the `car_marks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars_models" DROP CONSTRAINT "cars_models_carMarksId_fkey";

-- AlterTable
ALTER TABLE "cars_models" DROP COLUMN "carMarksId",
ADD COLUMN     "car_brand_id" TEXT;

-- DropTable
DROP TABLE "car_marks";

-- CreateTable
CREATE TABLE "car_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_brands_name_key" ON "car_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "car_brands_slug_key" ON "car_brands"("slug");

-- AddForeignKey
ALTER TABLE "cars_models" ADD CONSTRAINT "cars_models_car_brand_id_fkey" FOREIGN KEY ("car_brand_id") REFERENCES "car_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
