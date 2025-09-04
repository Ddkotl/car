import { getSinglePostBySlug } from "@/entities/posts/_actons/get_posts_by_slug";
import { SomePosts } from "@/entities/posts/_ui/some_posts";
import { TagBage } from "@/entities/tags/_ui/tag_bage";
import { BookmarksButton } from "@/features/bookmarks/ui/bookmark_button";
import { Title } from "@/shared/components/custom/app-title";
import { TimeAgo } from "@/shared/components/custom/get-time";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const post = await getSinglePostBySlug(pageParams.slug, "NEWS");
  if (!post) notFound();

  const description = post.meta_description || "Получите последние обзоры электроавтомобилей";
  const imageUrl = post.preview_image || "/logo_opengraf.jpg";
  const url = `${privateConfig.SAIT_URL}/news/${pageParams.slug}`;

  return {
    title: post.meta_title,
    description,
    keywords: [
      ...post.tags.map((tag) => tag.title).filter(Boolean),
      "автомобили",
      "электоавтомобили",
      "электрокары",
      "новости",
      "гаджеты",
      "инновации",
    ],
    openGraph: {
      title: post.meta_title,
      description,
      images: [{ url: imageUrl }],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title,
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
  const post = await getSinglePostBySlug(pageParams.slug, "NEWS");
  if (!post) {
    return <div className="text-center py-10 text-foreground">Не удалось получить информацию о новости</div>;
  }

  return (
    <main className="flex flex-col flex-1 gap-2 md:gap-4">
      <Card className="w-full mx-auto p-2 gap-2">
        <CardHeader className="p-2">
          <h1 className="lg:text-xl text-base lg:font-bold font-semibold">{post.title}</h1>
          <div className="md:text-base text-sm flex flex-col  justify-between items-start sm:items-center text-foreground/80">
            <div className="text-xs w-full mt-1.5 flex flex-row items-center justify-between ">
              <TimeAgo date={post.createdAt} />
              <BookmarksButton id={post.id} type="NEWS" />
            </div>
            <div className="items-start w-full flex flex-wrap gap-2">
              {post?.tags.map((tag) => (
                <TagBage key={tag.slug} slug={tag.slug} title={tag.title} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          {post.preview_image && (
            <ImageGalleryComponent
              imagePaths={[post.preview_image, ...(post.images || []).filter((img) => typeof img === "string")]}
            />
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Похожие новости" />
      </div>
      <SomePosts slug={pageParams.slug} count={20} type="NEWS" tags={post.tags} />
    </main>
  );
}
