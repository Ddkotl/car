import { TEXT_AI_MODELS } from "../ai_client";

const ERROR_PATTERNS = [
  "произошла ошибка",
  "ошибка при генерации",
  "не могу выполнить",
  "не могу обработать",
  "не могу предоставить",
  "это нарушает авторское право",
  "не могу перевести",
  "не могу выполнить этот запрос",
  "не могу помочь с этим",
  "это запрещено",
  "не могу создать этот контент",
  "не могу ответить на этот запрос",
  "не имею права",
  "это нарушает политику",
  "не могу выполнить ваш запрос",
  "извините, но я не могу",
  "не могу предоставить этот перевод",
  "мне запрещено это делать",
  "это противоречит правилам",
  "это не допускается",
  "я не могу обработать этот текст",
  "не могу предоставить ответ",
  "не имею возможности обработать этот запрос",
  "авторские права",
  "i cannot process",
  "i can't translate",
  "this violates copyright",
  "i'm sorry, but i can't do that",
  "i am unable to complete this request",
  "i cannot generate this content",
  "this request is against policy",
  "i can't assist with that",
  "i am unable to provide this translation",
  "i am not allowed to process this",
  "i am restricted from generating this",
  "this is not permitted",
  "i cannot comply with this request",
  "i am unable to generate this response",
  "i cannot help with this request",
  "this content violates our guidelines",
  "this request is not allowed",
  "Request",
  "request",
  "requests",
  "request limit",
  "requests limit",
  "error",
  "role",
  "bot limit",
  "limit exceeded",
  "blocked by",
  "prohibited",
  "rate limit",
  "rate limit of this model",
  "limit of this model is reached",
  "502 Bad Gateway",
  "502",
];

const containsError = (response: string, must_contain?: string): boolean => {
  const contain_er = ERROR_PATTERNS.some((pattern) => response.toLowerCase().includes(pattern));
  if (contain_er) {
    return contain_er;
  }
  if (must_contain && response.search(must_contain) === -1) {
    return true;
  }
  return false;
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const safeTranslate = async (
  text: string,
  translateFunction: (ai_model: string, text: string, context?: string, temperature?: number) => Promise<string>,
  context?: string,
  temperature?: number,
  retries: number = 100,
  must_contain?: string,
): Promise<string> => {
  for (let i = 0; i < retries; i++) {
    const model_count = TEXT_AI_MODELS.length;
    const current_ai_model = TEXT_AI_MODELS[i % model_count];
    try {
      console.log("use : ", current_ai_model);
      await sleep(10000);
      const response = await translateFunction(current_ai_model, text, context, temperature); // Упрощенный вызов
      if (response && !containsError(response, must_contain)) {
        console.log("ai ok");
        return response;
      }
      console.log(`Попытка ${i + 1} не удалась, повторяем...`);
    } catch (error) {
      console.log(`Ошибка перевода (попытка ${i + 1}):`, error);
    }
    await sleep(1000); // Увеличиваем задержку между попытками
  }
  console.log("Превышено количество попыток. Операция не выполнена.");
  return "";
};
