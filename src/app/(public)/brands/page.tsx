import { BrandList } from "@/entities/brands/_ui/brands_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Search } from "@/shared/components/custom/search";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Брэнды электромобилей",
    description: "Список всех доступных брэндов современных электромобилей",
    keywords: ["автомобили", "электоавтомобили", "электрокары", "новости", "гаджеты", "инновации"],
    ogImage: "/logo_opengraf.jpg",
    canonical: `${privateConfig.SAIT_URL}/brands`,
  });
}

export default async function BrandsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
          <Title text="Брэнды электромобилей" size="xl" />
          <Search placeholder="🔍 Поиск брэнда по названию..." />
        </div>
        <BrandList searchTerm={q} />
      </div>
    </main>
  );
}
