/**
 * Module dependencies
 */
import { Docker_client } from './utils.js';

Object.setPrototypeOf(Container.prototype, Docker_client.prototype);

function Container() {
}
Container.prototype.resolve = async function (service) {
}

export default Container;