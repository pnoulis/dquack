/**
 * Module dependencies
 */
import Router from '@koa/router';
import Service from '../service/service.js';

const router = new Router();
router.use(async (ctx, next) => {
  ctx.state.service = new Service(ctx.query.user, ctx.query.app);
  await next();
});
router.get('/service', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.ls();
});
router.get('/service/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.procure(ctx.params.id);
});
router.post('/service/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.start(ctx.params.id, ctx.request.body);
});
router.delete('/service/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.stop(ctx.params.id, ctx.request.body);
});
export default router;