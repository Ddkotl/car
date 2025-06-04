import { PostsList } from "@/entities/posts/_ui/posts_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Search } from "@/shared/components/custom/search";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = `Обзоры электромобилей `;
  const pageDescription = "Список всех обзоров электромобилей";
  const canonicalUrl = `${privateConfig.SAIT_URL}/reviews`;

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    keywords: ["обзоры", "автомобили", "электоавтомобили", "электрокары", "новости", "гаджеты", "инновации"],
    ogImage: "/logo_opengraf.jpg",
    canonical: canonicalUrl,
  });
}

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title text="Обзоры электромобилей" size="xl" className="md:text-start" />
          <Search placeholder="🔍 Поиск обзора по названию..." />
        </div>
        <PostsList searchTerm={q} variant="REVIEWS" />
      </div>
    </main>
  );
}
