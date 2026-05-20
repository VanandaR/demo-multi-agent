import {tool} from "@langchain/core/tools";
import { z } from "zod";

export const calculatorTool = tool(
    async({a,b})=>{
        return String(a * b);
    },
    {
        name: "multiply",
        description: "Multiply two numbers a and b.",
        schema: z.object({
            a: z.number().describe("The first number to multiply."),
            b: z.number().describe("The second number to multiply.")
        })
    }
);