/**
 * Module dependencies
 */

import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { DockerClient } from './utils.js';
import { config, UtilsTime } from '../utils.js';

const PATH_ASSETS = config.assets;

Object.setPrototypeOf(Asset.prototype, DockerClient);

function Asset(path) {
  this.path = path;
  this.writeTime = '';
}

/**
 *
 * @param {service} service 
 * The service parameter specified by the user is in the form: repository/subdir:tag
 * Because both a '/' and a ':' are illegal filename characters in bash; they would
 * require quoting. Instead an asset's name has the form: repository.subdir.tag.Dockerfile
 * @returns object
 */
Asset.prototype.resolve = async function (service) {
  const dir = await Asset.prototype.ls();
  let asset = dir.find(asset => asset === service.name.replace(/[/|:]/g, '.') + '.Dockerfile');
  if (!asset) return null;
  asset = new Asset(resolve(PATH_ASSETS, asset));
  asset.writeTime = await asset.getCreationTime();
  return asset;
}
Asset.prototype.ls = async function listAllAvailableAssets() {
  return readdir(PATH_ASSETS);
}
Asset.prototype.getCreationTime = async function modificationTimeIsCreationTime() {
  let { mtime } = await stat(this.path);
  return UtilsTime.prototype.rmFractionalSecs(mtime);
}

export default Asset;