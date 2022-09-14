import { Asset, Image, Container } from './docker.js';

function Service(user, app) {
  this.user = user;
  this.app = app;
}

Service.prototype.resolve = async function () {
  this.asset = await Asset.prototype.resolve(this) || null;
  this.image = await Image.prototype.resolve(this) || null;
  this.container = await Container.prototype.resolve(this) || null;
  return this;
}
Service.prototype.ls = async function () {
  return Asset.prototype.ls();
}
Service.prototype.procure = function (service) {
  this.name = service;
  return this.resolve();
}
Service.prototype.start = function (service, settings) {
  this.settings = settings;
  return this;
}
Service.prototype.stop = function (service, settings) {
  this.settings = settings;
  return this;
}
export default Service;