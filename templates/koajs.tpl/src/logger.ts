import {Context} from 'koa';
import winston, {transports, format} from 'winston';
import * as path from 'path';

const logger = (
    winstonInstance: typeof winston,
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
((ctx: Context, next: () => Promise<any>) => void) => {
  winstonInstance.configure({
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
    transports: [
      new transports.File({
        filename: path.resolve(
            __dirname,
          process.env.LOG_FILE ? process.env.LOG_FILE : '../error.log',
        ),
        level: 'error',
      }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime();
    try {
      await next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }

    const ms = new Date().getTime() - start;

    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winstonInstance.log(logLevel, msg);
  };
};

export default logger;
