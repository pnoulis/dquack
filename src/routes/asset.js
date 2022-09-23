/**
   * Module dependencies
 */
import Router from '@koa/router';
import Asset from '../assets/asset.js';

const router = new Router();

// instantiate Asset for subsequent middleware
router.use(async (ctx, next) => {
  ctx.state.asset = new Asset(ctx.params.id || '');
  await next();
});

router.get('/assets', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.ls();
});

router.post('/assets', async (ctx, next) => {
  ctx.response.bdoy = await ctx.state.asset.write();
});

router.get('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.cat();
});

router.put('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.write(true);
});

router.delete('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.rm();
});

export default router;
