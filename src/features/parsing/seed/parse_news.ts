import { dataBase } from "@/shared/lib/db_connect";
import { sleep } from "@/shared/lib/sleep";
import { transliterateToUrl } from "@/shared/lib/transliterate";

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
  tags.map(async (tag) => {
    const slug = transliterateToUrl(tag);
    return await dataBase.tag.upsert({
      where: { title: tag },
      update: {}, // Если тег существует, ничего не изменяем
      create: { title: tag, slug: slug }, // Если нет, создаем новый
    });
  });

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
        connect: tags.map((tag) => ({ title: tag })), // Соединяем новость с тегами
      },
    },
  });

  console.log(`Created news with title: ${createdNews.title}`);
  await sleep(1000);
  // if (privateConfig.NODE_ENV === "production") {
  //   console.log("start parse to tg");
  //   await publishToTelegram({
  //     type: "news",
  //     slug: slug,
  //     meta_description: metaDescription,
  //     previewImage: previewImage,
  //     ruTitle: ruTitle,
  //     tags: tags,
  //   });
  //   await delay(1000);
  //   await publishToInstagram({
  //     type: "news",
  //     slug: slug,
  //     meta_description: metaDescription,
  //     previewImage: previewImage,
  //     ruTitle: ruTitle,
  //     tags: tags,
  //   });
  // }
}
