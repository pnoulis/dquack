/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';

Object.setPrototypeOf(Container.prototype, DockerClient.prototype);

function Container() {
}
Container.prototype.resolve = async function (service) {
}

export default Container;