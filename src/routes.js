import Router from '@koa/router';
import serviceRouter from './service/routes.js';

const miscRouter = new Router();

miscRouter.get('/', async (ctx, next) => {
    const routes = [];
    serviceRouter.stack.forEach(route => routes.push(route.path));
    ctx.response.body = routes;
});

function registerRoutes(app) {
    app.use(
        miscRouter.routes(),
        miscRouter.allowedMethods(),
    ).use(
        serviceRouter.routes(),
        serviceRouter.allowedMethods(),
    )
}

export default registerRoutes;