import { privateConfig } from "@/shared/lib/config/private";
import TelegramBot from "node-telegram-bot-api";

export async function publishToTelegram({
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
    if (!privateConfig.TELEGRAM_BOT_KEY || !privateConfig.TELEGRAM_CHANNEL_ID) {
      return;
    }
    const bot = new TelegramBot(privateConfig.TELEGRAM_BOT_KEY, {
      polling: false,
    });
    const imageUrl = `${privateConfig.SAIT_URL}${previewImage}`;

    const icon = type === "news" ? "📰" : "📱";
    const postText = `
${icon} <b>${ruTitle}</b>
────────────────
${meta_description}

🔗 <a href="${privateConfig.SAIT_NAME}/${type}/${slug}">Читать полностью на сайте</a>
────────────────
🏷️ <i>Теги:</i> ${type === "news" ? "#Новости" : "#Обзоры"} ${tags.map((tag) => `#${tag}`).join(" ")}
    `.trim();

    await bot.sendPhoto(privateConfig.TELEGRAM_CHANNEL_ID, imageUrl, {
      caption: postText,
      parse_mode: "HTML",
      //  reply_markup: {
      //  inline_keyboard: [
      //  [
      //    {
      //    text: "🌐 <Смотреть на сайте>",
      //    url: `https://tech24view.ru/${type}/${slug}`,
      //    },
      //  ],
      //  ],
      //  },
    });

    // // Генерируем временные URL для всех изображений
    // const imageUrls = [previewImage].map((image) => {
    //   return `https://tech24view.ru${image}`;
    // });

    // // Формируем текст поста
    // const postText = `<b>${ruTitle}</b>\n\n${meta_description}\n\n<a href="https://tech24view.ru/${type}/${slug}">Читать полностью на сайте</a>\n<a href="https://tech24view.ru">Новости, обзоры, характеристики</a>`;

    // // Создаем медиагруппу
    // const mediaGroup: InputMediaPhoto[] = imageUrls.map((url, index) => ({
    //   type: "photo",
    //   media: url, // Используем временный URL
    //   caption: index === 0 ? postText : "", // Текст добавляем только к первой картинке
    //   parse_mode: "HTML",
    // }));

    // // Отправляем медиагруппу в канал

    // await bot.sendMediaGroup(privateConfig.TELEGRAM_CHANNEL_ID, mediaGroup);
    console.log("Пост успешно опубликован в Telegram!");
  } catch (error) {
    console.log("Ошибка при публикации поста в Telegram:", error);
  }
}
