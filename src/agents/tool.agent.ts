import { HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import { createModel } from "../llm/model";
import { calculatorTool } from "../tools/calculator.tool";
import { datetimeTool } from "../tools/datetime.tool";

const tools = [calculatorTool, datetimeTool];

export async function toolAgent(question: string) {
    const model = createModel();
    const modelWithTools = model.bindTools(tools);

    const aiMessage = await modelWithTools.invoke([
        new SystemMessage("Use tools when necessary to answer the question."),
        new HumanMessage(question)
    ]);
    const toolCalls = aiMessage.tool_calls || [];

    if (toolCalls.length === 0) {
        return String(aiMessage.content);
    }

    const toolsMessages: ToolMessage[] = [];

    for (const call of toolCalls) {
       let result: unknown;


       if (call.name === calculatorTool.name) {
           result = await calculatorTool.invoke(call.args as { a: number; b: number })
       } else if (call.name === datetimeTool.name) {
           result = await datetimeTool.invoke({});
       } else {
           result = `Unknown tool: ${call.name}`;
       }


       toolsMessages.push(
           new ToolMessage({
               content: String(result),
               tool_call_id: call.id || "",
           })
       );
   }

    const finalResponse = await modelWithTools.invoke([
        new SystemMessage("Answer the question using the results from the tools."),
        new HumanMessage(question),aiMessage,...toolsMessages
    ]);

    return String(finalResponse.content);
}

