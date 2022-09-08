import Router from '@koa/router';
const router = new Router();

router.get('/service/list', async (ctx, next) => {
    ctx.response.body = '/service/list';
});
router.post('/service/touch/:id', async (ctx, next) => {
    ctx.response.body = `/service/touch/${ctx.params.id}`
});
router.post('/service/start/:id', async (ctx, next) => {
    ctx.response.body = `/service/start/${ctx.params.id}`
});
router.post('/service/stop/:id', async (ctx, next) => {
    ctx.response.body = `/service/stop/${ctx.params.id}`
});

export default router;
