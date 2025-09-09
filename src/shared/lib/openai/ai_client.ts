import OpenAI from "openai";
import { privateConfig } from "../config/private";

export const client = new OpenAI({
  apiKey: "",
  baseURL: `http://localhost:${privateConfig.G4F_PORT}/v1`,
});

export const TEXT_AI_MODELS = ["gpt-4o", "gpt-4.1", "gpt-4", "gpt-4o-mini", "gpt-3.5-turbo"];
export const IMAGE_AI_MODEL = "flux";
