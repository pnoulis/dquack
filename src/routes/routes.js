/**
 * Module dependencies
 */
import chalk from 'chalk';
import Router from '@koa/router';
import serviceRouter from './service.js';
import assetRouter from './asset.js';
import { log } from '../utils.js';

const miscRouter = new Router();

const attachSession = async (ctx, next) => {
  ctx.state.user = ctx.query.user || '';
  ctx.state.app = ctx.query.app || '';
  await next();
}

const logRouteInformation = async (ctx, next) => {
  log.fmt(`user: ${ctx.state.user}`);
  log.fmt(`app: ${ctx.state.app}`);
  log.fmt(`${ctx.method}: ${ctx.href}`);
  await next();
}

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

miscRouter.get('/test', async (ctx, next) => {
  return ctx.response.body = {}
})

function registerRoutes(app) {
  app.use(
    attachSession
  ).use(
    logRouteInformation
  ).use(
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
