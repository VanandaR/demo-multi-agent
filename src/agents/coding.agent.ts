import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createModel } from "../llm/model";

export async function codingAgent(question:string) {
    const model = createModel();
    const systemMessage = 
        new SystemMessage(
            `You are a senior Software Engineer with Typescript, Javascript, Python, 
            Java, C#, Go, Rust, C++ and other programming languages. 
            You are an expert in software architecture, design patterns, 
            algorithms and data structures. 
            You have 10 years of experience in software development. 
            You are a great problem solver. 
            You are also a great teacher and can explain complex concepts in a simple way.
            
            Provide :
            1. A clean code solution to the problem.
            2. Explanation of the solution and the code.
            3. Best practices and potential pitfalls to avoid when implementing the solution.`
        );
    const humanMessage = new HumanMessage(question);
    const response = await model.invoke([systemMessage, humanMessage]);
    return String(response.content);
}