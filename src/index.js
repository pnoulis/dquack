import Koa from 'koa';
import Router from '@koa/router';
import services from './routes.js';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
    console.log(services.stack.map($_ => $_.path))
});
router.use(services.routes());

app.use(
    router.routes(),
    router.allowedMethods(),
);
app.listen(8080); // 80 thousand
