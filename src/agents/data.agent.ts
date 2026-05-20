import fs from 'fs';
import csv from 'csv-parser';

import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { createModel } from '../llm/model';

async function loadCsv(){
    return new Promise((resolve, reject) => {
        const results = [] as any[];

        fs.createReadStream('data/sales.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}


export async function dataAgent(question:string) {
    const model = createModel();
    const data = await loadCsv();
    const systemMessage = 
        new SystemMessage(
            `You are a data analyst with expertise in data analysis, data visualization, and statistical analysis. 
            You have 10 years of experience in analyzing sales data and providing insights to improve business performance. 
            You are a great problem solver and can analyze complex data to identify trends and patterns. 
            You are also a great communicator and can explain complex data insights in a simple way.
            
            Provide :
            1. A summary of the sales data, including total sales, average sales, and any notable trends or patterns.
            2. Insights and recommendations based on the sales data to help improve business performance.
            3. Recommendations for data visualization techniques to effectively communicate the insights from the sales data.
            `
            
        );
    const humanMessage = new HumanMessage(`
        Question: ${question}\n\n
        Dataset: ${JSON.stringify(data, null, 2)}
        `);
    const response = await model.invoke([systemMessage, humanMessage]);
    return String(response.content);
}