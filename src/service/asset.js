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
  const dir = await Asset.prototype.ls(false);
  let asset = this.map(null, service.name);
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
Asset.prototype.ls = async function listAllAvailableAssets(map) {
  if (!map) return readdir(PATH_ASSETS);
  const dir = await readdir(PATH_ASSETS);
  return dir.map(asset => Asset.prototype.map(asset, null));
}

/**
 * Map asset to service or service to asset.
 *
 * @param { string } asset <service.name>.<service.upstream.tag>.Dockerfile
 * @param { string } service <service.name>/<service.upstream.tap>
 * @returns { string } mapped entity
 * @throws { Error }
 */
Asset.prototype.map = function(asset, service) {
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
