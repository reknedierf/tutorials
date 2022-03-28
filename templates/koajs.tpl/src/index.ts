import 'dotenv/config';
import Koa from 'koa';
import router from './router';
import logger from './logger';
import json from 'koa-json';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import winston from 'winston';

export const app = new Koa();
const port: number = process.env.PORT as unknown as number || 3000;

app
    .use(json())
    .use(cors())
    .use(bodyParser())
    .use(koaHelmet())
    .use(logger(winston))
    .use(router.routes())
    .use(router.allowedMethods());

export const server = app.listen(port, () => {
  console.info('webserver started on port ',
      port);
});


