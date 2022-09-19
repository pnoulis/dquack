import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import routes from './routes/routes.js';

const app = new Koa();

app.use(koaBody())
if (process.env.NODE_ENV === 'development') {
  const { default: PrettyJson } = await import('koa-json');
  app.use(PrettyJson({ pretty: true, spaces: 2 }));
}
app.use(async function(ctx, next) {
  console.log(ctx.href);
  await next();
});
routes(app);
app.listen(8080); // 80 thousand and 80