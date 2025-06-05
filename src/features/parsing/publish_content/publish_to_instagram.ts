import { privateConfig } from "../../config/private";

export async function publishToInstagram({
  type,
  slug,
  meta_description,
  ruTitle,
  previewImage,
  tags,
}: {
  type: "news" | "reviews";
  slug: string;
  ruTitle: string;
  meta_description: string;
  previewImage: string;
  tags: string[];
}) {
  try {
    if (!privateConfig.FACEBOOK_ACCESS_TOKEN || !privateConfig.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
      console.log("Не настроены параметры для публикации в Instagram");
      return;
    }

    const imageUrl = `https://tech24view.ru${previewImage}`;
    // const imageUrl = "https://cdn.pixabay.com/photo/2024/05/30/22/14/bird-8799413_1280.jpg";
    const icon = type === "news" ? "📰" : "📱";
    const postText = `
${icon} ${ruTitle}
────────────────
${meta_description}

🔗 Читать полностью: https://tech24view.ru/${type}/${slug}
────────────────
🏷️ Теги: ${type === "news" ? "#Новости #Технологии" : "#Обзоры #Гаджеты"} ${tags.map((tag) => `#${tag}`).join(" ")}
    `.trim();

    // 1. Создаем контейнер для медиа
    const creationResponse = await fetch(
      `https://graph.facebook.com/v22.0/${privateConfig.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: postText,
          access_token: privateConfig.FACEBOOK_ACCESS_TOKEN,
        }),
      },
    );

    const creationData = await creationResponse.json();
    const creationId = creationData.id;

    if (!creationId) {
      throw new Error("Не удалось создать контейнер медиа");
    }

    // 2. Публикуем контейнер
    const publishResponse = await fetch(
      `https://graph.facebook.com/v22.0/${privateConfig.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: privateConfig.FACEBOOK_ACCESS_TOKEN,
        }),
      },
    );

    const publishData = await publishResponse.json();

    if (publishData.error) {
      throw new Error(publishData.error.message);
    }

    console.log("Пост успешно опубликован в Instagram! ID:", publishData.id);
  } catch (error) {
    console.log("Ошибка при публикации поста в Instagram:", error);
  }
}

// (async () => {
//   await publishToInstagram({
//     type: "news",
//     slug: "slug111",
//     meta_description: "metaDescription1111",
//     previewImage: "https://ggscore.com/media/logo/t41813.png?27",
//     ruTitle: "ruTitle11111",
//     tags: ["tags"],
//   });
// })();
