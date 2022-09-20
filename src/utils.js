import config from '../config/config.json' assert { type: 'json' };

function log(message) {
  console.log(message);
}

function UtilsTime() {

}

/**
 * A datetime string may make use of the optional fractional seconds if it
 * follows the RFC3339 standard. This function will trim those off and return
 * the result
 * @param {string} datetime 
 */
UtilsTime.prototype.rmFractionalSecs = function removeFractionalSeconds(datetime) {
  if (typeof datetime === 'object') {
    datetime = datetime.toJSON();
  }
  const hasFractionalSecs = datetime.search('\\..*Z$');
  return hasFractionalSecs < 0 ? datetime : datetime.substring(0, hasFractionalSecs) + 'Z';
}
UtilsTime.prototype.greaterThan = function compareThisDateToArgDate(datetimeA, datetimeB) {
  datetimeA = new Date(datetimeA).getTime();
  datetimeB = new Date(datetimeB).getTime();
  return datetimeA > datetimeB ? true : false;
}

export {
  config,
  log,
  UtilsTime
}