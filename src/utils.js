import config from '../config/config.json' assert { type: 'json' };

function log(message) {
  console.log(message);
}

/**
 *  UTILS
 */
function Utils() {
}

Utils.prototype.translate = function (entity) {
  return {
    // service to asset
    service: (entity) => {
    },
    // asset to service
    asset: (entity) => {
    },
    // entity to image
    image: (entity) => {
    },
    // entity to container
    container: (entity) => {
    },
  };
}

/**
 *  TIME UTILS
 */
function TimeUtils() {
}

/**
 * A datetime string may make use of the optional fractional seconds if it
 * follows the RFC3339 standard. This function will trim those off and return
 * the result
 * @param {string} datetime
 */
TimeUtils.prototype.rmFractionalSecs = function removeFractionalSeconds(datetime) {
  if (typeof datetime === 'object') {
    datetime = datetime.toJSON();
  }
  const hasFractionalSecs = datetime.search('\\..*Z$');
  return hasFractionalSecs < 0 ? datetime : datetime.substring(0, hasFractionalSecs) + 'Z';
}
TimeUtils.prototype.greaterThan = function compareThisDateToArgDate(datetimeA, datetimeB) {
  datetimeA = new Date(datetimeA).getTime();
  datetimeB = new Date(datetimeB).getTime();
  return datetimeA > datetimeB ? true : false;
}


/**
 *  REGEX UTILS
 */

/**
 * A not exchaustive list of regex syntax for the javascript engine
 *
 * Basic Features
 * https://www.regular-expressions.info/refbasic.html
 * Special and Non-printable Characters
 * https://www.regular-expressions.info/refcharacters.html
 * Character classes
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
 * Archors
 * https://www.regular-expressions.info/refanchors.html
 * Word boundaries
 * https://www.regular-expressions.info/refwordboundaries.html
 * Flags
 * g = global search
 * i = case insensitive
 * m = ^ and $ match newline characters
 * s = allows . to match newline characters
 *
 * A regex is created by using either a regex literal:
 * /regexLiteral/flags;
 * OR
 * The regex constructor
 * new RegExp('regex', 'flags');
 */


const utils = new Utils();
utils.time = new TimeUtils();

export {
  config,
  log,
  utils
}
