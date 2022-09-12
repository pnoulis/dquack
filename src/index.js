import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import Router from '@koa/router';
import services from './routes.js';

const app = new Koa();
const router = new Router();

app.use(koaBody())
if (process.env.NODE_ENV === 'development') {
  const { default: PrettyJson } = await import('koa-json');
  app.use(PrettyJson({ pretty: true, spaces: 2 }));
}

app.use(async function(ctx, next) {
  console.log(ctx.href);
  await next();
});

router.get('/', async (ctx, next) => {
  ctx.response.body = router.stack.map($_ => $_.path)
});
router.use(services.routes(), services.allowedMethods());

app.use(
  router.routes(),
  router.allowedMethods(),
);
app.listen(8080); // 80 thousand and 80