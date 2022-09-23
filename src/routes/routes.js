/**
 * Module dependencies
 */
import Router from '@koa/router';
import serviceRouter from './service.js';
import assetRouter from './asset.js';

const miscRouter = new Router();

miscRouter.get('/', async (ctx, next) => {
  const routes = [];
  let method = '';
  routes.push('---------- SERVICES --------');
  serviceRouter.stack.forEach(route => {
    method = route.methods[0];
    if (method) {
      if (method === 'HEAD') {
        method = 'GET';
      }
      routes.push(`${method}: '${route.path}'`);
    }
  });
  routes.push('---------- ASSETS ----------');
  assetRouter.stack.forEach(route => {
    method = route.methods[0];
    if (method) {
      if (method === 'HEAD') {
        method = 'GET';
      }
      routes.push(`${method}: '${route.path}'`);
    }
  });
  ctx.response.body = routes;
});

function registerRoutes(app) {
  app.use(
    miscRouter.routes(),
    miscRouter.allowedMethods(),
  ).use(
    serviceRouter.routes(),
    serviceRouter.allowedMethods(),
  ).use(
    assetRouter.routes(),
    assetRouter.allowedMethods(),
  );
}

export default registerRoutes;
