import { client } from "../ai_client";

export const generateText = async (
  ai_model: string,
  text: string,
  context?: string,
  temperature?: number,
): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай на русcком языке  строго в  формате строки ,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Сгенерируй ${context} так, чтобы он звучал естественно для русскоязычного читателя.
Ответь строго строкой.
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>)
Вот текст из которого нужно брать информацию для генерации:
${text}`,
        },
      ],
      temperature: temperature ? temperature : 0,
      model: ai_model,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (e) {
    console.error("ai translate text error", e);
    return "";
  }
};
