/**
 * Module dependencies
 */

import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config, utils } from '../utils.js';

const PATH_ASSETS = config.assets;

function Asset(name) {
  this.name = name;
  this.path = resolve(PATH_ASSETS, name);
  this.mTime = '';
}

/**
 * Instantiate an asset.
 *
 * @param {service} service
 * @returns { promise }
 */
Asset.prototype.resolve = async function (service) {
  const dir = await Asset.prototype.ls();
  let asset = service.map(service.name);
  if (!dir.includes(asset)) return null;
  asset = new Asset(asset);
  asset.mTime  = await asset.getMTime();
  return asset;
}

/**
 * List available assets.
 *
 * @param { boolean } map if true listing should map each asset to a
 * a service name
 * @returns { promise }
 */
Asset.prototype.ls = function listAllAvailableAssets(map) {
  return readdir(PATH_ASSETS);
}

Asset.prototype.write = function appendOrWriteMode(append) {
  return {};
}

Asset.prototype.cat = function returnBufferOrString(buffer) {
  return {};
}

Asset.prototype.rm = function deletesAsset() {
  return {};
}

/**
 * Retrieve the modification time of the asset.
 *
 * @returns { string }
 */
Asset.prototype.getMTime = async function getModificationTime() {
  let { mtime } = await stat(this.path);
  return utils.rmFractionalSecs(mtime);
}

export default Asset;
