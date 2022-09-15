/**
 * Module dependencies
 */

import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { DockerClient } from './utils.js';
import { config } from '../utils.js';

const PATH_ASSETS = config.assets;

Object.setPrototypeOf(Asset.prototype, DockerClient);

function Asset(serviceName, path) {
  this.ID = serviceName;
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

export default Asset;