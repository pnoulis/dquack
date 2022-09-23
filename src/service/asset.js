/**
 * Module dependencies
 */

import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config, UtilsTime } from '../utils.js';

const PATH_ASSETS = config.assets;

function Asset(name) {
  this.name = name;
  this.path = resolve(PATH_ASSETS, name);
  this.mTime = '';
}

/**
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
 * List assets found within designated paths
 *
 * @param { boolean } map if true listing should map each asset to a
 * a service name
 * @returns { promise }
 */
Asset.prototype.ls = function listAllAvailableAssets(map) {
  return readdir(PATH_ASSETS);
}

/**
 * Datetimes formated against RFC3339 may include fractional seconds for extreme
 * precision which is an overkill for dquack. This function removes them.
 *
 * @returns { string }
 */
Asset.prototype.getMTime = async function getModificationTime() {
  let { mtime } = await stat(this.path);
  return UtilsTime.prototype.rmFractionalSecs(mtime);
}

export default Asset;
