/**
 * Module dependencies
 */

import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { DockerClient } from './utils.js';
import { config } from '../utils.js';

const PATH_ASSETS = config.assets;

Object.setPrototypeOf(Asset.prototype, DockerClient);

function Asset(path) {
  this.path = path;
}
Asset.prototype.resolve = async function (service) {
  const dir = await Asset.prototype.ls();
  const asset = dir.find(asset => asset === service.name.replace('/', '_') + '.Dockerfile');
  return asset ? new Asset(resolve(PATH_ASSETS, asset)) : null;
}
Asset.prototype.ls = async function listAllAvailableAssets() {
  return readdir(PATH_ASSETS);
}

export default Asset;