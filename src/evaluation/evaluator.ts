import fs from 'fs';
import { runMultiAgent } from '../workflows/multi-agent.workflow';


async function main() {
   const raw = fs.readFileSync('src/evaluation/evaluation.config.json', 'utf-8');


   const cases = JSON.parse(raw);


   let passed = 0;


   for (const item of cases) {
       const result = await runMultiAgent(item.question);


       const ok = result.route === item.expectedRoute;


       if (ok) passed++;


       console.log(
           item.question,
           result.route,
           ok ? '✅' : '❌',
       );
   }


   console.log(`Passed ${passed} out of ${cases.length} cases.`);
}
main().catch((err) => {
   console.error('Error during evaluation:', err);
});
