import { BrandSearch } from "@/entities/brands/_ui/brand_search";
import { BrandList } from "@/entities/brands/_ui/brands_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Брэнды телефонов",
    description:
      "Список всех доступных брэндов современных смартфонов",
    keywords: [
      "брэнды",
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
    canonical: "https://tech24view.ru/brands",
  });
}

export default async function BrandsPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title
            text="Брэнды мобильных телефонов"
            size="xl"
          />
          <BrandSearch />
        </div>
        <BrandList />
      </div>
    </main>
  );
}
