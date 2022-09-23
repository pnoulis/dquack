/**
 * Module dependencies
 */
import Asset from '../assets/asset.js';
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

Service.prototype.ls = async function () {
  const dir = await Asset.prototype.ls();
  return dir.map(asset => this.map(null, asset));
}

Service.prototype.inspect = async function() {
  return {};
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

/**
 * Map asset to service or service to asset.
 *
 * @param { string } asset <service.name>.<service.upstream.tag>.Dockerfile
 * @param { string } service <service.name>/<service.upstream.tap>
 * @returns { string } mapped entity
 * @throws { Error }
 */
Service.prototype.map = function(service, asset) {
  if (asset) { // map to service
    asset = asset.split('.').slice(0, -1);
    return asset.length < 2 ? asset[0] : `${asset[0]}:${asset[1]}`;
  } else if (service) { // map to asset
    service = service.split(':');
    return `${service[0]}.${service[1]}.Dockerfile`;
  } else {
    throw new Error('Insufficient arguments');
  }
}

export default Service;
