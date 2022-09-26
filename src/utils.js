import chalk from 'chalk';
import { exec, execFile } from 'node:child_process';
import { Buffer } from 'node:buffer';
import { promisify } from 'node:util';
import config from '../config/config.json' assert { type: 'json' };
import { Sha256 } from '@aws-crypto/sha256-js';


function Log() {
  this.re_color = /#([a-zA-Z]).+?#\1/g;
  this.re_cli_token = /[^\s'"]*(?:'.*?'|".*?"|`.*?`)*/g;
}
Log.prototype.msg = function (message) {
  console.log(
    message.replaceAll(this.re_color, this.colorMatch.bind(this))
  );
}
Log.prototype.fmt = function (message) {
  const tokens = message.match(this.re_cli_token);
  const colors = [ 'r', 'g', 'b', 'p', 'y' ];
  const lenColors = colors.length;
  tokens.forEach(($_, i) => {
    tokens[i] = this[colors[i % lenColors]]($_);
  })
  console.log(...tokens);
}
Log.prototype.colorMatch = function (match, colorCode) {
  return this[colorCode] ? this[colorCode](match.slice(2, -2)): match;
}
Log.prototype.r = chalk.bold.red;
Log.prototype.g = chalk.bold.green;
Log.prototype.b = chalk.bold.blue;
Log.prototype.p = chalk.bold.magenta;
Log.prototype.y = chalk.bold.yellow;
Log.prototype.R = chalk.red;
Log.prototype.G = chalk.green;
Log.prototype.B = chalk.blue;
Log.prototype.P = chalk.magenta;
Log.prototype.Y = chalk.yellow;

/**
 *  UTILS
 */
function Utils() {
}

Utils.prototype.translate = function (entity) {
  return {
    // service to asset
    service: (entity) => {
    },
    // asset to service
    asset: (entity) => {
    },
    // entity to image
    image: (entity) => {
    },
    // entity to container
    container: (entity) => {
    },
  };
}

Utils.prototype.truncateSHA256 = function(sha256) {
  return sha256.replace('sha256', '').substring(0, 12);
}

/**
 * Docker utils
 *
 */

function DockerUtils() {
  this.shell = promisify(exec);
  this.noShell = promisify(execFile);
}

DockerUtils.prototype.exec = async function runADockerCommand(command, shell) {
  try {
    const { stdout, stderr } = shell
          ? await this.shell('docker ' + command)
          : await this.noShell('docker ' + command); // does not work yet
    return {
      data: Buffer.isBuffer(stdout) ? stdout.toString('utf-8').trim() : stdout.trim(),
    };
  } catch (err) {
    //log(err.stderr);
    // Commands which accept multiple arguments such as:
    // docker image rm 1 2 3 ...
    // will throw an error for each of the images that it could not
    // delete but will write to sdtout those images that it could delete
    // as such an 'error' is not strictly an error
    return { err: err.stderr.trim(), data: err.stdout.trim() };
  }
}

/**
 * Crypto Utils
 *
 */

function CryptoUtils() {
}

/**
 * Produce a hash out of the contents of a file
 * lib: https://github.com/aws/aws-sdk-js-crypto-helpers/tree/master/packages/sha256-js
 * @param { string } buffer
 * @returns { promise }
 */
CryptoUtils.prototype.makeChecksum = async function(buffer) {
  let hash = new Sha256();
  let tostr = '';
  hash.update(buffer);
  hash = await hash.digest();
  hash.forEach($_ => tostr += $_.toString(16));
  return tostr;
}

/**
 *  TIME UTILS
 */
function TimeUtils() {
}

/**
 * A datetime string may make use of the optional fractional seconds if it
 * follows the RFC3339 standard. This function will trim those off and return
 * the result
 * @param {string} datetime
 */
TimeUtils.prototype.rmFractionalSecs = function removeFractionalSeconds(datetime) {
  if (typeof datetime === 'object') {
    datetime = datetime.toJSON();
  }
  const hasFractionalSecs = datetime.search('\\..*Z$');
  return hasFractionalSecs < 0 ? datetime : datetime.substring(0, hasFractionalSecs) + 'Z';
}
TimeUtils.prototype.greaterThan = function compareThisDateToArgDate(datetimeA, datetimeB) {
  datetimeA = new Date(datetimeA).getTime();
  datetimeB = new Date(datetimeB).getTime();
  return datetimeA > datetimeB ? true : false;
}

const utils = new Utils();
utils.docker = new DockerUtils();
utils.time = new TimeUtils();
utils.crypto = new CryptoUtils();
const log = new Log();

export {
  config,
  log,
  utils
}
