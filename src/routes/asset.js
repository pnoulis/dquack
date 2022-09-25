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


/**
 * List available assets
 *
 * GET host/assets
 * GET host/assets/
 */
router.get('/assets', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.ls();
});

/**
 * Create a new asset
 *
 * POST text/plain host/assets body:data
 */
router.post('/assets', async (ctx, next) => {
  ctx.response.bdoy = await ctx.state.asset.write(ctx.request.body);
});

/**
 *
 */
router.get('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.cat(ctx.params.id);
});

router.put('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.write(ctx.request.body, true);
});

router.delete('/assets/:id', async (ctx, next) => {
  ctx.response.body = await ctx.state.asset.rm(ctx.params.id);
});

export default router;
