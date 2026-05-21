import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import { agentRouter } from './routes/agent.routes';
import { apiRateLimiter } from './middleware/rate-limit.middleware';
import { detectPromptInjection } from './middleware/prompt-security.middleware';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/agent', apiRateLimiter); // Apply rate limiting to agent routes 

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


app.use('/agent', agentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});