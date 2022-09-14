import Router from '@koa/router';

const router = new Router();
router.get('/service', async (ctx, next) => {
  ctx.response.body = {
    route: 'get:services'
  };
});
router.get('/service/:id', async (ctx, next) => {
  ctx.response.body = {
    route: 'get:service/:id'
  };
});
router.post('/service/:id', async (ctx, next) => {
  ctx.response.body = {
    route: 'post:service/:id'
  };
});
router.delete('/service/:id', async (ctx, next) => {
  ctx.response.body = {
    route: 'delete:service/:id'
  };
});
export default router;