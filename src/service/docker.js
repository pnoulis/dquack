/**
 * Module dependencies
 */
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const PATH_ASSETS = './assets/services';

/**
 * Docker Client
 */
const exec = async function dockerClient(...args) {
}

/**
 * Docker Asset
 */
function Asset(service_name, path) {
  this.ID = service_name;
  this.path = path;
}
Asset.prototype.resolve = async function (service) {
  const dir = await Asset.prototype.ls();
  const path = dir.find(asset => asset === service.name + '.Dockerfile');
  return path ? new Asset(service.name, resolve(PATH_ASSETS, path)) : null;
}
Asset.prototype.ls = async function listAllAvailableAssets() {
  return readdir(PATH_ASSETS);
}

/**
 * Docker Image
 */
function Image(name) {
}
Image.prototype.resolve = async function (service) {
}
Image.prototype.exec = exec;

/**
 * Docker Container
 */
function Container() {
}
Container.prototype.resolve = async function (service) {
}
Container.prototype.exec = exec;

export { Asset, Image, Container };