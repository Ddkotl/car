import { getBrandBySlug } from "@/entities/brands/_actions/get_brand_by_slug";
import { ModelsList } from "@/entities/models/_ui/model_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Search } from "@/shared/components/custom/search";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const brand = await getBrandBySlug(pageParams.slug);
  const brandName = brand?.name.toUpperCase();
  const pageTitle = `Модели ${brandName}`;
  const pageDescription = `Список всех доступных моделей ${brandName}`;
  const canonicalUrl = `${privateConfig.SAIT_URL}/brands/${pageParams.slug}`;

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `новинки ${brandName}`,
      `модели ${brandName}`,
      `${brandName}`,
      `Модели ${brandName}`,
      "брэнды элуктрокаров",
      "технологии",
      "автомобили",
      "электоавтомобили",
      "электрокары",
      "новости",
      "гаджеты",
      "инновации",
    ],
    ogImage: "/logo_opengraf.jpg",
    canonical: canonicalUrl,
  });
}

export default async function ModelsByBrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const pageParams = await params;
  const pageSearchParams = await searchParams;

  const brand = await getBrandBySlug(pageParams.slug);

  if (!brand) {
    return <div className="text-center text-foreground text-xl mt-10">Бренд не найден</div>;
  }
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
          <Title text={`Модели ${brand.name.toUpperCase()}`} size="xl" className="md:text-start" />
          <Search placeholder="🔍 Поиск модели по названию..." />
        </div>
        <ModelsList brandSlug={brand.slug} searchTerm={pageSearchParams.q} />
      </div>
    </main>
  );
}
