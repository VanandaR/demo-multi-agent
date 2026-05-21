import { Router } from "express";
import { z } from "zod";

import { multiAgentApp } from "../workflows/multi-agent.workflow.js";
import { getMemory } from "../memory/shared-memory.js";
import { detectPromptInjection } from "../middleware/prompt-security.middleware.js";
import { logEvent } from "../utils/logger.js";
import { log } from "node:console";

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

        logEvent("info", "agent_request_received", { question });

        const securityCheck = detectPromptInjection(question);


        if (securityCheck.detected) {
            logEvent("warn", "prompt_injection_attempt", { question, pattern: securityCheck.matchedPattern });
            return res.status(400).json({
                error: "Potential prompt injection detected.",
                pattern: securityCheck.matchedPattern,
            });
        }


        const result = await runMultiAgent(question);
        logEvent("info", "agent_request_completed", { question });
        res.json({
            route: result.route,
            answer: result.answer,
        })
    } catch (error) {
        logEvent("error", "agent_request_error", { error: error instanceof Error ? error.message : String(error) });
        console.error("Error processing request:", error);
        res.status(400).json({ error: "An error occurred while processing the request." });
    }
});


agentRouter.get("/memory", (req, res) => {
    logEvent("info", "memory_request_received");
    res.json({
        memory: getMemory(),
    });
});
