import OpenAI from "openai";
import { privateConfig } from "../config/private";

export const client = new OpenAI({
  apiKey: "",
  baseURL: `http://localhost:${privateConfig.G4F_PORT}/v1`,
});

export const TEXT_AI_MODEL = "deepseek-r1";
export const IMAGE_AI_MODEL = "flux";
