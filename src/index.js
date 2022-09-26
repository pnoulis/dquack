import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import routes from './routes/routes.js';

const app = new Koa();

app.use(koaBody({
  enableTypes: [ 'json', 'form', 'text' ]
}));
if (process.env.NODE_ENV === 'development') {
  const { default: PrettyJson } = await import('koa-json');
  app.use(PrettyJson({ pretty: true, spaces: 2 }));
}
routes(app);
app.listen(8080); // 80 thousand and 80
