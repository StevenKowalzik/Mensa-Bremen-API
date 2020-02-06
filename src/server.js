import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import foods from './routes/foods';

const { PORT = 3000 } = process.env;

morgan('tiny');

express()
  .use(bodyParser.json())
  .use(cors({ origin: '*' }))
  .use(foods)
  .listen(PORT, () => console.log(`...Server is listening to port ${PORT}`));
