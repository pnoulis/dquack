import Koa from 'koa';
import Router from '@koa/router';
import services from './routes.js';

const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV === 'development') {
    const { default: PrettyJson } = await import('koa-json');
    app.use(PrettyJson({ pretty: true, spaces: 2 }));
}

router.get('/', async (ctx, next) => {
    ctx.response.body = router.stack.map($_ => $_.path)
});
router.use(services.routes());

app.use(
    router.routes(),
    router.allowedMethods(),
);
app.listen(8080); // 80 thousand
