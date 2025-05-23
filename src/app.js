import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});

process.on('SIGINT', async () => {
  console.log('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM');
  process.exit(0);
});
