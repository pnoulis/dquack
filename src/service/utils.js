/**
 * Module dependencies
 */
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { log } from '../utils.js';

const promiseExec = promisify(exec);
function DockerClient() {
}
DockerClient.prototype.exec = async function runADockerCommand(command) {
  try {
    const { stdout, stderr } = await promiseExec('docker ' + command);
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

export { DockerClient }
