import { Annotation, END,START, StateGraph } from "@langchain/langgraph";
import { routeQuestion } from "../agents/router.agent";
import { chatAgent } from "../agents/chat.agent";
import { codingAgent } from "../agents/coding.agent";   
import { dataAgent } from "../agents/data.agent";
import { toolAgent } from "../agents/tool.agent";
import {addToMemory, getMemory} from "../memory/shared-memory";

const AgentState=Annotation.Root({
    question:Annotation<string>(),
    answer:Annotation<string>(),
    route:Annotation<string>()
})

async function routerNode(state:any){
    return {
        route:routeQuestion(state.question)
    }
}

async function chatNode(state:any){
    return {
        answer:await chatAgent(state.question)
    }
}

async function codingNode(state:any){
    return {
        answer:await codingAgent(state.question)
    }
}

async function dataNode(state:any){
    return {
        answer:await dataAgent(state.question)
    }
}

async function toolNode(state:any){
    return {
        answer:await toolAgent(state.question)
    }
}

async function memoryNode(state:any){
    addToMemory({
        timestamp: new Date().toISOString(),
        question: state.question,
        answer: state.answer,
        route: state.route
    });
    return {};
}

function decideRoute(state:any){
    return state.route;
}

const workflow = new StateGraph(AgentState)
.addNode("router", routerNode)
.addNode("chat", chatNode)
.addNode("coding", codingNode)
.addNode("data", dataNode)
.addNode("tool", toolNode)
.addNode("memory", memoryNode)
.addEdge(START, "router")
.addConditionalEdges("router", decideRoute, {
    "chat":"chat",
    "coding":"coding",
    "data":"data",
    "tool":"tool"
})
.addEdge("chat", "memory")
.addEdge("coding", "memory")
.addEdge("data", "memory")
.addEdge("tool", "memory")
.addEdge("memory", END)
;

export const multiAgentApp = workflow.compile();

export async function runMultiAgent(question: string) {
    const result = await multiAgentApp.invoke({
        question,
        answer: "",
        route: ""
    });
    return result;
}