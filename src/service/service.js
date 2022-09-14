/**
 * Module dependencies
 */
import Asset from '../docker/asset.js';
import Image from '../docker/image.js';
import Container from '../docker/container.js';

function Service(user, app) {
  this.user = user;
  this.app = app;
}

Service.prototype.resolve = async function () {
  this.asset = await Asset.prototype.resolve(this);
  this.image = await Image.prototype.resolve(this);
  this.container = await Container.prototype.resolve(this);;
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