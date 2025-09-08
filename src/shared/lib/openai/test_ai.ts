import { client, TEXT_AI_MODELS } from "./ai_client";

async function test() {
  const res = await client.chat.completions.create({
    model: TEXT_AI_MODELS[0],
    messages: [
      {
        role: "system",
        content: "Отвечай на русcком языке  строго в  формате строки ,  без добавления комментариев.",
      },
      { role: "user", content: "Hello" },
    ],
  });
  console.log(res.choices[0].message.content);
}
test();
