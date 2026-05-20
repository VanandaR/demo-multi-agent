import { ChatOpenAI } from "@langchain/openai";

export function createModel() {
  return new ChatOpenAI({
    temperature: 0.2,
    model: process.env.OLLAMA_MODEL || "qwen3:1.7b",
    apiKey: process.env.OLLAMA_API_KEY || "ollama",
    configuration:{
        baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
    }
  });
}