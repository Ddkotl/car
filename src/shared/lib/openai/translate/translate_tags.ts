import { client, TEXT_AI_MODEL } from "../ai_client";

export const translateTags = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай на строго в указанном формате без добавления комментариев.",
        },
        {
          role: "user",
          content: ` переведи тэги для моей статьи  блога . Тэг должен состоять из 1-2 слов. Названия брэнда, марки, модели не переводи.

Ответь строго строкой с результатами в формате:  tag1, tag2, .... 
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>) или текст вне массива.
 Вот тэги для обработки: ${text}`,
        },
      ],
      temperature: 0.1,
      model: TEXT_AI_MODEL,
    });

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("generateTags error", error);
    return "";
  }
};
