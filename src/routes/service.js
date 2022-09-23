/**
 * Module dependencies
 */
import Router from '@koa/router';
import Service from '../services/service.js';

const router = new Router();

// instantiate Service for subsequent middleware
router.use(async (ctx, next) => {
  ctx.state.service = new Service(ctx.query.user, ctx.query.app);
  await next();
});

router.get('/services', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.ls();
});

router.post('/services', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.procure(ctx.request.body);
});

router.get('/services/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.inspect();
});

router.put('/services/:id', async (ctx, next) => {
   ctx.response.body = await ctx.state.service.start(ctx.params.id, ctx.request.body);
   ctx.response.body = await ctx.state.service.stop(ctx.params.id, ctx.request.body);
});

router.delete('/services/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.service.rm(ctx.params.id, ctx.request.body);
});

export default router;
