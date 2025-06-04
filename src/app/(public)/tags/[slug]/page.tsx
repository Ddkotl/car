import { PostsList } from "@/entities/posts/_ui/posts_list";
import { getTagBYSlug, getTagBYSlugType } from "@/entities/tags/_actions/get_tag_by_slug";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const tag = await getTagBYSlug(pageParams.slug);
  return generateSEOMetadata({
    title: `Поиск по тэгу: ${tag?.title}`,
    description: `Список новостей и обзоров по тэгу ${tag?.title}`,
    keywords: ["тэги", "автомобили", "электоавтомобили", "электрокары", "новости", "гаджеты", "инновации"],
    ogImage: "/logo_opengraf.jpg",
    canonical: `${privateConfig.SAIT_URL}/tags/${tag?.slug}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const tag: getTagBYSlugType = await getTagBYSlug(pageParams.slug);
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <Title size="xl" text={`Все, найденное по тэгу: ${tag?.title}`} />
      <Tabs defaultValue="news">
        <TabsList>
          <TabsTrigger value="news">{`Новости`}</TabsTrigger>
          <TabsTrigger value="reviews">{`Обзоры`}</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <PostsList variant="NEWS" tagSlug={pageParams.slug} />
        </TabsContent>
        <TabsContent value="reviews">
          <PostsList variant="REVIEWS" tagSlug={pageParams.slug} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
