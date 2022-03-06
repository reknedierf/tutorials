import {Context} from 'koa';
import Router from 'koa-router';

const router = new Router();
// router.prefix('/v1');

router.get('/health', async (ctx: Context, next: any) => {
  ctx.status = 200;
  ctx.body = 'UP';
  await next();
});

export default router;
