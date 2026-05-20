import { tool } from '@langchain/core/tools';
import { z } from 'zod';


export const datetimeTool = tool(
   async () => {
       return new Date().toISOString();
   },
   {
       name: "get_current_datetime",
       description: "Get the current date and time in ISO format.",
       schema: z.object({}),
   }
);