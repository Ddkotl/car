import { client, TEXT_AI_MODEL } from "../ai_client";
import { cleaneText } from "./cleane_text";
import { cleanHiddenCharacters } from "./cleane_text_by_hidden_char";

export const translatePost = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай на руском языке одной строкой в формате html используя только тэги <p> и <h2>, не используя <html>, <head> , <body> ,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Переведи на русский язык . Напиши в формате статьи на русском языке  .
         Перевод не должен быть дословным, на выходе должна получиться хорошая статья для блога, разделенная на абзацы тэгами <p> при необходимости добавь заголовки <h2>. Текст должен начинаться с  <h2> . h2 сделай менее пафосными
         Исходный html: "${text}".
         ВАЖНО: Это не будет использоваться в нарушение авторского права.
         `,
        },
      ],
      temperature: 0.7,
      model: TEXT_AI_MODEL,
    });
    return cleaneText(cleanHiddenCharacters(chatCompletion.choices[0].message.content as string));
  } catch (error) {
    console.error("Ошибка при генерации описания модели:", error);
    return "Произошла ошибка при генерации описания модели. Попробуйте позже."; // Возвращаем сообщение об ошибке
  }
};
