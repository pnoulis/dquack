import config from '../config/config.json' assert { type: 'json' };

const log = function(message) {
  console.log(message);
}

export { config, log }