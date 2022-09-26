import chalk from 'chalk';
import { exec, execFile } from 'node:child_process';
import { Buffer } from 'node:buffer';
import { promisify } from 'node:util';
import config from '../config/config.json' assert { type: 'json' };
import { Sha256 } from '@aws-crypto/sha256-js';


function Log() {
  this.re_color = /#([a-z]).+?#\1/g;
}

Log.prototype.msg = function (message) {
  console.log(
    message.replaceAll(this.re_color, this.colorMatch.bind(this))
  );
}

Log.prototype.colorMatch = function (match, colorCode) {
  return this[colorCode] ? this[colorCode](match.slice(2, -2)): match;
}
Log.prototype.r = chalk.bold.red; // red
Log.prototype.g = chalk.bold.green; // green
Log.prototype.b = chalk.bold.blue; // blue
Log.prototype.p = chalk.bold.magenta // purple
Log.prototype.y = chalk.bold.yellow; // yellow

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


/**
 *  REGEX UTILS
 */

/**
 * A not exchaustive list of regex syntax for the javascript engine
 *
 * Basic Features
 * https://www.regular-expressions.info/refbasic.html
 * Special and Non-printable Characters
 * https://www.regular-expressions.info/refcharacters.html
 * Character classes
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
 * Archors
 * https://www.regular-expressions.info/refanchors.html
 * Word boundaries
 * https://www.regular-expressions.info/refwordboundaries.html
 * Flags
 * g = global search
 * i = case insensitive
 * m = ^ and $ match newline characters
 * s = allows . to match newline characters
 *
 * A regex is created by using either a regex literal:
 * /regexLiteral/flags;
 * OR
 * The regex constructor
 * new RegExp('regex', 'flags');
 */


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
