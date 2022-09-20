/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';
import { config, UtilsTime } from '../utils.js';

const BASE_REPOSITORY = config.repositories;

Object.setPrototypeOf(Image.prototype, DockerClient.prototype);

function Image(name, ID, buildTime) {
  this.name = name;
  this.ID = ID;
  this.buildTime = buildTime;
}
Image.prototype.resolve = async function (service) {
  if (!service.asset) return null;
  this.name = service.name;
  if (!await this.shouldBuildImage(service)) {
    return new Image(this.name, this.ID, this.buildTime)
  }
  const { err, data } = await this.buildImage(service.asset.path);
  if (err) return null;
  // a side effect of shouldBuildImage is that it extracts the 
  // ID and the buildTime off the image
  if (!await this.shouldBuildImage(service)) {
    return new Image(this.name, this.ID, this.buildTime)
  }
  return null;
}
Image.prototype.inspectImage = function (properties) {
  const command = `image inspect ${this.name} --format '${properties}'`;
  return this.exec(command);
}
Image.prototype.shouldBuildImage = async function (service) {
  const { err, data } = await this.inspectImage(
    '{{ slice .Id 7 19 }}\n{{ .Metadata.LastTagTime }}'
  );
  if (err) return true;  // No such image found; should build.
  const parts = data.split('\n').slice(0, 2);
  this.ID = parts[0];
  this.buildTime = UtilsTime.prototype.rmFractionalSecs(parts[1]);
  if (UtilsTime.prototype.greaterThan(service.asset.writeTime, this.buildTime)) {
    // Asset modified since last build; should build.
    const { err } = await this.rmImage(); // remove previous image
    if (err) throw new Error(err);
    return true;
  }
  return false;
}
Image.prototype.buildImage = function (asset) {
  const command = `image build --quiet --tag ${this.name} - < ${asset}`;
  return this.exec(command);
}
Image.prototype.rmImage = function () {
  const command = `image rm ${this.name}`;
  return this.exec(command);
}
export default Image;

