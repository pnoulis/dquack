import Router from '@koa/router';
import list from './service/list.js';
import touch from './service/touch.js';
import start from './service/start.js';
import stop from './service/stop.js';

const router = new Router();

router.get('/service', async (ctx, next) => {
    ctx.response.body = list();
});
router.put('/service/:id', async (ctx, next) => {
    ctx.response.body = touch(ctx.params.id);
});
router.post('/service/:id', async (ctx, next) => {
    ctx.response.body = start(ctx.params.id);
});
router.delete('/service/:id', async (ctx, next) => {
    ctx.response.body = stop(ctx.params.id);
});

export default router;
