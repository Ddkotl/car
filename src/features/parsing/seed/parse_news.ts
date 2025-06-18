import { dataBase } from "@/shared/lib/db_connect";
import { sleep } from "@/shared/lib/sleep";
import { transliterateToUrl } from "@/shared/lib/transliterate";
import { publishToTelegram } from "../publish_content/publish_to_telegram";
import { privateConfig } from "@/shared/lib/config/private";
import { publishToInstagram } from "../publish_content/publish_to_instagram";

export async function ParseNews(
  metaTitle: string,
  metaDescription: string,
  slug: string,
  date: Date,
  ingTitle: string,
  ruTitle: string,
  content: string,
  previewImage: string,
  images: string[],
  tags: string[],
) {
  const news_tags = await Promise.all(
    tags.map((tag) => {
      const slug = transliterateToUrl(tag);
      return dataBase.tag.upsert({
        where: { slug: slug },
        update: {},
        create: { title: tag, slug: slug },
      });
    }),
  );

  const createdNews = await dataBase.posts.upsert({
    where: { original_title: ingTitle, type: "NEWS" },
    update: {},
    create: {
      createdAt: date,
      original_title: ingTitle,
      type: "NEWS",
      meta_title: metaTitle,
      meta_description: metaDescription,
      slug: slug,
      title: ruTitle,
      content: content,
      preview_image: previewImage,
      images: images,
      tags: {
        connect: news_tags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  console.log(`Created news with title: ${createdNews.title}`);
  await sleep(1000);
  if (privateConfig.NODE_ENV === "production") {
    console.log("start parse to tg");
    await publishToTelegram({
      type: "news",
      slug: slug,
      meta_description: metaDescription,
      previewImage: previewImage,
      ruTitle: ruTitle,
      tags: tags,
    });
    await sleep(1000);
    await publishToInstagram({
      type: "news",
      meta_description: metaDescription,
      previewImage: previewImage,
      ruTitle: ruTitle,
      tags: tags,
    });
  }
}
