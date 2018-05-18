import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import foods from './routes/foods';

const { PORT = 8080 } = process.env;

express()
  .use(bodyParser.json())
  .use(cors({ origin: '*' }))
  .use(foods)
  .listen(PORT, () => console.log(`...Server is listening to port ${PORT}`));
