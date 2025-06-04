import { getAllBrandsSlugAndDate } from "@/entities/brands/_actions/get_all_brands_slug_and_date";
import { getAllModeLsSlugAndDate } from "@/entities/models/_actions/get_all_models_slug_and_date";
import { getAllPostsSlugAndDate } from "@/entities/posts/_actons/get_all_posts_slug_and_date";
import { MetadataRoute } from "next";

export async function getSitemapData(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SAIT_URL;

  const news = await getAllPostsSlugAndDate("NEWS");
  const reviews = await getAllPostsSlugAndDate("REVIEWS");
  const brands = await getAllBrandsSlugAndDate();
  const models = await getAllModeLsSlugAndDate();

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/news`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/reviews`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/brands`, lastModified: new Date().toISOString() },
    ...news?.map((newsItem) => ({
      url: `${baseUrl}/news/${newsItem.slug}`,
      lastModified: newsItem.updatedAt || newsItem.createdAt || new Date().toISOString(),
    })),
    ...reviews?.map((review) => ({
      url: `${baseUrl}/reviews/${review.slug}`,
      lastModified: review.updatedAt || review.createdAt || new Date().toISOString(),
    })),
    ...brands?.map((brand) => ({
      url: `${baseUrl}/brands/${brand.slug}`,
      lastModified: brand.updatedAt || brand.createdAt || new Date().toISOString(),
    })),
    ...models?.map((model) => ({
      url: `${baseUrl}/model/${model.slug}`,
      lastModified: model.updatedAt || model.createdAt || new Date().toISOString(),
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await getSitemapData();
}
