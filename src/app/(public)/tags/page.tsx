import { TagsList } from "@/entities/tags/_ui/tags_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Search } from "@/shared/components/custom/search";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Тэги",
    description: "Список тэгов для поиска новостей и обзоров",
    keywords: ["тэги", "автомобили", "электоавтомобили", "электрокары", "новости", "гаджеты", "инновации"],
    ogImage: "/logo_opengraf.jpg",
    canonical: `${privateConfig.SAIT_URL}/tags`,
  });
}

export default async function TagsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title size="xl" text="Тэги новостей и обзоров" />
          <Search placeholder="🔍 Поиск тэга по названию..." />
        </div>
        <TagsList searchTerm={q} />
      </div>
    </main>
  );
}
