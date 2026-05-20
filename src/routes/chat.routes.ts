import { Router } from "express";
import z from "zod";
import { chatAgent } from "../agents/chat.agent";

export const chatRouter = Router();

const schema = z.object({
    question: z.string().min(1, "Question is required")
});

chatRouter.post("/", async (req, res) => {
    try {
        const { question } = schema.parse(req.body);
        const answer = await chatAgent(question);
        res.json({ answer });
    } catch (error) {
        console.error("Error in chat route:", error);
        res.status(400).json({ error: "Invalid request data" });
    }
});
