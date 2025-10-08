import OpenAI from "openai";
import { privateConfig } from "../config/private";

export const client = new OpenAI({
  apiKey: "",
  baseURL: `http://localhost:${privateConfig.G4F_PORT}/v1`,
});

export const TEXT_AI_MODELS = ["deepseek-v3","deepseek-v3.1","llama","gpt-4"];
export const IMAGE_AI_MODEL = "flux";
