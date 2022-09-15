/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';
import { config } from '../utils.js';

const BASE_REPOSITORY = config.repositories;

Object.setPrototypeOf(Image.prototype, DockerClient.prototype);

function Image(name) {
  this.tag = '';
  this.repository = '';
  this.name = '';
  this.ID = '';
}
Image.prototype.resolve = async function (service) {
  if (!service.asset) return null;
  //this.tag = service.asset.name.split('.')
}

export default Image;

