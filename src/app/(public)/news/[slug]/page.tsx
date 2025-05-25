import { DeleteNewsButton } from "@/entities/posts";
import { getSingleNewsBySlug } from "@/entities/posts/_actons/get_news_by_slug";
import { increaseNewsViewsCountAction } from "@/entities/posts/_actons/increase_news_views_count_action";
import { SimilarNews } from "@/entities/posts/_ui/similar-news";
import { TagBage } from "@/entities/tags";
import { BookmarksButton } from "@/features/bookmarks/ui/bookmark_button";
import { Card, CardContent, CardHeader, TimeAgo, Title } from "@/shared/components";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const news = await getSingleNewsBySlug(pageParams.slug);
  if (!news) notFound();

  const description = news.meta_description || "Получите последние обзоры смартфонов и новости технологий.";
  const imageUrl = news.previewImage || "/logo_opengraf.jpg";
  const url = `https://tech24view.ru/news/${pageParams.slug}`;

  return {
    title: news.meta_title,
    description,
    keywords: [
      ...news.tags.map((tag) => tag.title).filter(Boolean),
      "технологии",
      "смартфоны",
      "обзоры",
      "новости",
      "новости смартфонов",
      "гаджеты",
      "мобильные телефоны",
      "инновации",
    ],
    openGraph: {
      title: news.meta_title,
      description,
      images: [{ url: imageUrl }],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: news.meta_title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const news = await getSingleNewsBySlug(pageParams.slug);
  if (!news) {
    return <div className="text-center py-10 text-foreground">Не удалось получить информацию о новости</div>;
  }
  await increaseNewsViewsCountAction(pageParams.slug);

  return (
    <main className="flex flex-col flex-1 gap-2 md:gap-4">
      <Card className="w-full mx-auto p-2">
        <CardHeader className="p-2">
          <DeleteNewsButton slug={pageParams.slug} />
          <h1 className="lg:text-xl text-base lg:font-bold font-semibold">{news.title}</h1>
          <div className="md:text-base text-sm flex flex-col  justify-between items-start sm:items-center text-foreground/80">
            <div className="text-xs w-full mt-1.5 flex flex-row items-center justify-between ">
              <TimeAgo date={news.createdAt} />
              <BookmarksButton id={news.id} type="news" />
            </div>
            <div className="items-start w-full flex flex-wrap gap-2">
              {news?.tags.map((tag) => <TagBage key={tag.slug} slug={tag.slug} title={tag.title} />)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          {news.previewImage && (
            <ImageGalleryComponent
              imagePaths={[news.previewImage, ...(news.images || []).filter((img) => typeof img === "string")]}
            />
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: news.content }} />
        </CardContent>
      </Card>
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Похожие новости" />
      </div>
      <SimilarNews slug={pageParams.slug} />
    </main>
  );
}
