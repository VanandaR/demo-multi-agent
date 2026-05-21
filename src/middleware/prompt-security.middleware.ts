import { de } from "zod/v4/locales";


const blockedPatterns = [
   "ignore previous instructions",
   "reveal system prompt",
   "bypass security measures",
   "disable safety features",
   "ignore safety protocols",
   "reveal hidden instructions",
   "bypass content filters",
   "disable content moderation",
   "reveal internal prompts",
   "ignore ethical guidelines",
   "jailbreak",
   "bypass restrictions",
   "disable safeguards",
   "reveal system instructions",
   "ignore security protocols",
];


export function detectPromptInjection(input: string) {
   const normalized = input.toLowerCase();


   const matchedPattern = blockedPatterns.find(pattern => normalized.includes(pattern));


   return {
       detected: Boolean(matchedPattern),
       matchedPattern,
   }
}
