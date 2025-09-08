import OpenAI from "openai";
import { privateConfig } from "../config/private";

export const client = new OpenAI({
  apiKey: "",
  baseURL: `http://localhost:${privateConfig.G4F_PORT}/v1`,
});

export const TEXT_AI_MODELS = [
  "gpt-5",
  "deepseek-v3",
  "gpt-4.5",
  "gpt-4o",
  "gpt-4",
  "gpt-4o-mini",
  "deepseek-r1",
  "o4",
  "o3",
  "o1",
];
export const IMAGE_AI_MODEL = "flux";
