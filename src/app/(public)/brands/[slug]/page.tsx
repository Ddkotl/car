import { getBrandBySlug } from "@/entities/brands/_actions/get_brand_by_slug";
import {
  PhoneModelSearch,
  PhoneModelsList,
} from "@/entities/phone_models";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { BrandWithModelsCount } from "@/entities/brands";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const pageParams = await params;
  const brand: BrandWithModelsCount | null =
    await getBrandBySlug(pageParams.slug);
  const brandName = brand?.name.toUpperCase();
  const pageTitle = `Модели ${brandName}`;
  const pageDescription = `Список всех доступных моделей ${brandName}`;
  const canonicalUrl = `https://tech24view.ru/brands/${pageParams.slug}`;

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `новинки ${brandName}`,
      `смартфоны ${brandName}`,
      `${brandName}`,
      `Модели ${brandName}`,
      "брэнды смартфонов",
      "технологии",
      "смартфоны",
      "обзоры",
      "новости",
      "новости смартфонов",
      "гаджеты",
      "мобильные телефоны",
      "инновации",
    ],
    ogImage: "/logo_opengraf.jpg",
    canonical: canonicalUrl,
  });
}

export default async function ModelsByBrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const pageParams = await params;
  const brand: BrandWithModelsCount | null =
    await getBrandBySlug(pageParams.slug);

  if (!brand) {
    return (
      <div className="text-center text-foreground text-xl mt-10">
        Бренд не найден
      </div>
    );
  }
  return (
    <main className="flex flex-col flex-1   gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <h1 className="text-lg lg:text-2xl w-full gap-4 text-center md:text-start">
            {`Все модели ${brand.name.toUpperCase()}`}
          </h1>
          <PhoneModelSearch brandSlug={pageParams.slug} />
        </div>

        <PhoneModelsList brandSlug={pageParams.slug} />
      </div>
    </main>
  );
}
