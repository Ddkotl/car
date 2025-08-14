import { client } from "./ai_client";

async function test() {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Hello" }],
  });
  console.log(res.choices[0].message.content);
}
test();
