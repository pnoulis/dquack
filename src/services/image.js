/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';
import { config, utils } from '../utils.js';

const BASE_REPOSITORY = config.repositories;

Object.setPrototypeOf(Image.prototype, DockerClient.prototype);

function Image(name, ID, buildTime) {
  this.name = name || '';
  this.ID = ID || 0;
  this.buildTime = buildTime || 0;
}

/**
 *
 * @param { Object } service { name: 'dquack/mssql:2019' }
 * @returns {}
 */
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
  this.buildTime = utils.time.prototype.rmFractionalSecs(parts[1]);
  if (utils.time.greaterThan(service.asset.writeTime, this.buildTime)) {
    // Asset modified since last build; should build.
    const { err } = await this.rmImage(); // remove previous image
    if (err) throw new Error(err);
    return true;
  }
  return false;
}
/**
 *
 * @param { string } asset An absolute path uniquely identifying an asset
 * @returns { promise }
 */
Image.prototype.build = function (asset) {
  const command = `image build --quiet --tag ${this.name} - < ${asset}`;
  return utils.docker.exec(command, true);
}
Image.prototype.rmImage = function () {
  const command = `image rm ${this.name}`;
  return this.exec(command);
}

Image.prototype.getInstances = async function () {
  const command = "image ls --quiet --filter 'reference=dquack/*/*";
  const { err, data } = await DockerClient.prototype.exec(command);
  if (err) throw new Error(err);
  else if (!data) return [];
  else return data.split('\n');
}

/**
 *
 * @param { array } instances
 * @returns { array } deleted instances
 * @throws { Error } in case of unexpectedError
 */
Image.prototype.rmStaleInstances = async function(instances) {
  const command = `image rm ${instances.toString().replace(/,/g, ' ')}`;
  const { err, data } = await DockerClient.prototype.exec(command);
  if (err) {
    const unexpectedErrors = err.match(!/^.*image is referenced in multiple repositories$/gm) || [];
    if (unexpectedErrors.length > 0) {
      throw new Error(unexpectedErrors.join('\n'));
    } else {
      return instances.filter($_ => new RegExp($_).test(data));
    }
  } else if (!data) {
    return [];
  } else {
    return instances.filter($_ => new RegExp($_).test(data));
  }
}
Image.prototype.setName = function() {
}
export default Image;

