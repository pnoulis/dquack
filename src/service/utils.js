/**
 * Module dependencies
 */
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { log } from '../utils.js';

function DockerClient() {
};
DockerClient.prototype.exec = async function runADockerCommand(command, ...args) {
  try {
    const { stdout, stderr } = await promisify(execFile)('docker', command.split(' ').concat(args));
    return {
      data: Buffer.isBuffer(stdout) ? stdout.toString('utf-8') : stdout,
    };
  } catch (err) {
    log(err.stderr);
    return { err };
  }
}

export { DockerClient }