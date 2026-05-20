import { Router } from "express";
import { z } from "zod";

import { multiAgentApp } from "../workflows/multi-agent.workflow.js";
import { getMemory } from "../memory/shared-memory.js";

async function runMultiAgent(question: string) {
    const result = await multiAgentApp.invoke({
        question,
        answer: "",
        route: ""
    });
    return result;
}


export const agentRouter = Router();


const schema = z.object({
   question: z.string().min(1, "Question cannot be empty."),
});


agentRouter.post("/", async (req, res) => {
   try {
       const { question } = schema.parse(req.body);
       const result = await runMultiAgent(question);
       res.json({
           route: result.route,
           answer: result.answer,
       })
   } catch (error) {
       console.error("Error processing request:", error);
       res.status(400).json({ error: "An error occurred while processing the request." });
   }
});


agentRouter.get("/memory", (req, res) => {
   res.json({
       memory: getMemory(),
   });
});
