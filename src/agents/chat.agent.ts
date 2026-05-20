import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createModel } from "../llm/model";

export async function chatAgent(question : string) {
    const model = createModel();
    const response = await model.invoke([
        new SystemMessage("You are a helpful assistant that answers questions."),
        new HumanMessage(question)
    ]);
    return response.content;
}