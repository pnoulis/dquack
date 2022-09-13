import Router from '@koa/router';
const router = new Router();
export default router;

Router.get('/services', list);
Router.get('/service/:id', procure);
Router.post('/service/:id', start);
Router.delete('/service/:id', stop);

const list = async function listAvailableContainerizedServices(ctx, next) {
  return {
    route: 'list service'
  }
}
const procure = async function checkAllContainerizedServiceDependenciesExist(ctx, next) {
  return {
    route: 'touch service'
  }
}
const start = function startContainerizedService(ctx, next) {
  return {
    route: `post:service/${ID}`
  }
}
const stop = function stopContainerizedService(ctx, next) {
  return {
    route: `delete:service/${ID}`
  }
}

