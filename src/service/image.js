/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';
import { config } from '../utils.js';

const BASE_REPOSITORY = config.repositories;

Object.setPrototypeOf(Image.prototype, DockerClient.prototype);

function Image(name) {
  this.ID = '';
  this.buildTime = '';
}
Image.prototype.resolve = async function (service) {
  if (!service.asset) return null;
  this.name = service.name;
  let tryBuildImage = async () => {};
  while ((tryBuildImage = this.shouldBuildImage(service))) {
    await tryBuildImage();
  }
  console.log(this);
}
Image.prototype.inspectImage = async function (properties, cb) {
  const command = `image inspect ${this.name} --format`;
  const { err, data } = await this.exec(command, properties);
  cb(err, data);
}
Image.prototype.shouldBuildImage = function (service) {
  if (!this.ID) return async () => {
    await this.inspectImage('{{ slice .Id 7 19 }}\n{{ .Metadata.LastTagTime }}', (err, data) => {
      if (err) return;
      const parts = data.split('\n');
      this.ID = parts[0];
      this.buildTime = parts[1];
    });
  }
  console.log('any other condition');
  return false;
}

export default Image;

