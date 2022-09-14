import Router from '@koa/router';
import service_router from './service/routes.js';

const misc_router = new Router();

misc_router.get('/', async (ctx, next) => {
    const routes = [];
    service_router.stack.forEach(route => routes.push(route.path));
    ctx.response.body = routes;
});

function registerRoutes(app) {
    app.use(
        misc_router.routes(),
        misc_router.allowedMethods(),
    ).use(
        service_router.routes(),
        service_router.allowedMethods(),
    )
}

export default registerRoutes;