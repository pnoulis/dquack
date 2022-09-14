import { Asset, Image, Container } from './docker.js';

function Service(user, name) {
  this.user = user;
  this.name = name || '';
}

Service.prototype.resolve = async function (user, service) {
  if (!(this instanceof Service)) {
    return Service.prototype.resolve.bind(new Service(user, service))(user, service);
  }
  this.name = service || user;
  this.asset = await Asset.prototype.resolve(this) || null;
  this.image = await Image.prototype.resolve(this) || null;
  this.container = await Container.prototype.resolve(this) || null;
  return this;
}
Service.prototype.ls = async function () {
  return Asset.prototype.ls();
}
Service.prototype.procure = function () {
}
Service.prototype.start = function () {
}
Service.prototype.stop = function () {
}
export default Service;