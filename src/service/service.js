/**
 * Module dependencies
 */
import Asset from './asset.js';
import Image from './image.js';
import Container from './container.js';

function Service(user, app) {
  this.user = user;
  this.app = app;
  this.name = '';
}

Service.prototype.resolve = async function () {
  this.asset = await Asset.prototype.resolve(this);
  //this.image = await Image.prototype.resolve(this);
  //this.container = await Container.prototype.resolve(this);
  return this;
}
Service.prototype.ls = function () {
  return Asset.prototype.ls(true);
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
