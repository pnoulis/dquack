/**
 * Module dependencies
 */
import { DockerClient } from './utils.js';

Object.setPrototypeOf(Container.prototype, DockerClient.prototype);


// Run a container in interactive mode
// docker run -it dquack/*:* /bin/bash
function Container() {
}
Container.prototype.resolve = async function (service) {
}

export default Container;
