import 'dotenv/config';
import Koa from 'koa';
import router from './router';
import logger from './logger';
import json from 'koa-json';
import cors from 'koa-cors';
import winston from 'winston';

const app = new Koa();
const port: number = process.env.PORT as unknown as number || 3000;

app
    .use(json())
    .use(cors())
    .use(logger(winston))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
  console.info('webserver started on port ',
      port);
});
