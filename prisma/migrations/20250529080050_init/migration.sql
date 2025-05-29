-- CreateEnum
CREATE TYPE "PostTypes" AS ENUM ('NEWS', 'REVIEWS');

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "original_title" TEXT NOT NULL,
    "type" "PostTypes" NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview_image" TEXT,
    "images" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "car_model_id" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_models" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "short_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "main_image" TEXT NOT NULL,
    "car_brand_id" TEXT NOT NULL,

    CONSTRAINT "cars_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specification" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "power" TEXT NOT NULL,
    "drivetype" TEXT NOT NULL,
    "acceleration" TEXT NOT NULL,
    "battery_capacity" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car_model_id" TEXT NOT NULL,

    CONSTRAINT "specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostsTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostsTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_original_title_key" ON "reviews"("original_title");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_slug_key" ON "reviews"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_title_key" ON "reviews"("title");

-- CreateIndex
CREATE UNIQUE INDEX "car_brands_name_key" ON "car_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "car_brands_slug_key" ON "car_brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cars_models_short_name_key" ON "cars_models"("short_name");

-- CreateIndex
CREATE UNIQUE INDEX "cars_models_full_name_key" ON "cars_models"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "cars_models_slug_key" ON "cars_models"("slug");

-- CreateIndex
CREATE INDEX "_PostsTags_B_index" ON "_PostsTags"("B");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_car_model_id_fkey" FOREIGN KEY ("car_model_id") REFERENCES "cars_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_models" ADD CONSTRAINT "cars_models_car_brand_id_fkey" FOREIGN KEY ("car_brand_id") REFERENCES "car_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specification" ADD CONSTRAINT "specification_car_model_id_fkey" FOREIGN KEY ("car_model_id") REFERENCES "cars_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsTags" ADD CONSTRAINT "_PostsTags_A_fkey" FOREIGN KEY ("A") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsTags" ADD CONSTRAINT "_PostsTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
