/**
 * Module dependencies
 */

import { readdir, stat, open } from 'node:fs/promises';
import { basename } from 'node:path'
import { resolve } from 'node:path';
import { config, utils } from '../utils.js';
import Image from '../services/image.js';

const PATH_ASSETS = config.assets;
const PATH_CACHE = config.cache;
const SHA256_TRUNCATE = sha256 => sha256.substring(0, 12);


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

/**
 * Upload an asset
 *
 * @param { string } dockerfile
 * @param { boolean } append
 * @returns { promise }
 */
Asset.prototype.write = async function appendOrCreate(dockerfile, append) {
  // TODO validations
  // 1. Check if a dockerfile can be successfully built into an image
  // 1.1 Save dockerfile into a temporary filename; where filename is [hash].pending
  // 1.2 If [hash].pending already exists return an arrorr
  // 1.3 Try to build the dockerfile
  // 2. Check if the dockerfile defines the requested labels


  // 1.1 && 1.2
  let path = await utils.crypto.makeChecksum(dockerfile);
  path = resolve(PATH_CACHE, 'tmp', `${utils.truncateSHA256(path)}.pending`);

  // let filehandle;
  // try {
  //   filehandle = await open(path, 'a'); // change back to ax for prod
  //   await filehandle.write(dockerfile, 0, 'utf8');
  // } catch (err) {
  //   if (err.code === 'EEXIST') {
  //     throw new Error('Duplicate dockerfile pending validation');
  //   }
  // } finally {
  //   await filehandle.close();
  // }


  // 1.3
  const image = new Image(`dquack/validate:${basename(path, '.pending')}`);
  // let res = await image.build(path);
  // if (res.err) throw new Error('Failed to build image');


  // 2
  const command = `inspect ${image.name} --format '{{ json .Config.Labels }}'`;
  let { err, data } = await utils.docker.exec(command, true);
  if (err) throw new Error(err);
  data = JSON.parse(data);
  console.log(data);

  return '';
}
Asset.prototype.isValid = function (data) {
  // lock write
  // validate metadata
  // build image
  // is valid or is not valide
}

Asset.prototype.lockWrite = function (data) {
}

Asset.prototype.validateMetadata = function (data) {
  const metadata = new Map([
    ['service.author', ''],
    ['service.name', ''],
    ['service.tag', ''],
    ['service.upstream.repository', ''],
    ['service.upstream.service', ''],
    ['service.upstream.version', ''],
    ['service.upstream.tag', '']
  ])

  metadata.forEach((value, key) => {

  })

  return metadata;
}
Asset.prototype.hash = function contentHash(data) {
}

Asset.prototype.cat = function returnBufferOrString(asset) {
  return {};
}

Asset.prototype.rm = function deletesAsset() {
  return {};
}

Asset.prototype.validate = function ensureDockerfileIsValid(dockerfile) {

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
