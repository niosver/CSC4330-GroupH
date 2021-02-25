import express, { Request, Response } from 'express';
import { Logger, RequestLogger } from './Logger';

const app = express();
const port = process.env.PORT || 8000;

app.use(RequestLogger());

app.get('/api/hello', (_req: Request, res: Response) => {
  res.send('hello!');
});

app.listen(port, () => {
  const message = `Sever running on port ${port}`;
  Logger.log(message);
});
