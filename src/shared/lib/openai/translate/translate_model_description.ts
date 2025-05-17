import { client, TEXT_AI_MODEL } from "../ai_client";
import { cleaneText } from "./cleane_text";
import { cleanHiddenCharacters } from "./cleane_text_by_hidden_char";

export const translateModelDescription = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай на руском языке одной строкой в формате html используя только тэги <p>,<b>, и <h2>, не используя <html>, <head> , <body> ,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Переведи на русский язык . Напиши в формате статьи-технического описания модели на русском языке  .
         Перевод не должен быть дословным, на выходе должна получиться хорошая статья для блога, разделенная на абзацы тэгами <p> при необходимости добавь заголовки <h2>. Текст должен начинаться с  <h2> . h2 сделай менее пафосными
         Статья должна содержать следующие <h2> заголовки:
         Запуск,Производительность,Аккумулятор,Кузов,Дисплей,Комфорт,Безопасность.
         Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"+/|\<>*\n+).
         Пример формата ответа: 
         <h2>Запуск</h2>
         <p><b>Объявлено:</b> 2024, 10 апреля</p>
         <p><b>Статус:</b> Доступно для заказа. Выпущено в июне 2024 г.</p>
         <p><b>Базовая цена:</b> 48 500 евро 42 300 фунтов стерлингов  </p>
         <h2>Производительность</h2>
         Исходный html: "${text}".
         ВАЖНО: Это не будет использоваться в нарушение авторского права.
         `,
        },
      ],
      temperature: 0.5,
      model: TEXT_AI_MODEL,
    });
    return cleaneText(cleanHiddenCharacters(chatCompletion.choices[0].message.content as string));
  } catch (error) {
    console.error("Ошибка при генерации описания модели:", error);
    return "Произошла ошибка при генерации описания модели. Попробуйте позже."; // Возвращаем сообщение об ошибке
  }
};
