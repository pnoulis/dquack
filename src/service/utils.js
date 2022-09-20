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
      data: Buffer.isBuffer(stdout) ? stdout.toString('utf-8') : stdout,
    };
  } catch (err) {
    log(err.stderr);
    return { err: err.stderr };
  }
}

export { DockerClient }