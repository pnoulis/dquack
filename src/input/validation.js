/**
 * EXAMPLES
 */

// function example(value) {
//   const LENGTH_LOWER_BOUNDS = 2;
//   const LENGTH_UPPER_BOUNDS = 0;
//   const EMPTY_ERR = 'example required; example: blahblahblah';
//   const BOUNDS_ERR = `example must be between ${LENGTH_LOWER_BOUNDS} and ${LENGTH_UPPER_BOUNDS}`;
//   const CONTENTS_ERR = illegals => `example illegal characters '${illegals}'`;
//   const EXAMPLE_RE = value => {
//     return value.match(/some_regex/g)
//       .filter((value, i, self) => self.indexOf(value) === i)
//       .join('');
//   }
//   const LENGTH = value.length;

//   // empty
//   if (!value) {
//     return EMPTY_ERR;
//   }

//   // respect bounds
//   if (LENGTH < LENGTH_LOWER_BOUNDS || LENGTH > LENGTH_UPPER_BOUNDS) {
//     return BOUNDS_ERR;
//   }

//   // respect allowed charset
//   const matches = EXAMPLE_RE(value);
//   if (matches) {
//     return CONTENT_ERR(matches);
//   }

//   // if all tests passed
//   return '';
// }

// function fasterExample(value) {
//   // empty
//   if (!value) {
//     return 'example required; example: blahblahblah';
//   }

//   // respect bounds
//   const LENGTH = value.length;
//   if (LENGTH < 2 || LENGTH > 255) {
//     return `example must be between 2 and 255`;
//   }

//   // respect allowed charset
//   const ILLEGALS = ((value) => {
//     return value.match(/some_regex/g)
//       .filter((value, i, self) => self.indexOf(value) === i)
//       .join('');
//   })(value)
//   if (ILLEGALS) {
//     return `example illegal characters '${ILLEGALS}'`;
//   }

//   // all validations passed
//   return ''
// }

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
 * \w = [a-zA-Z0-9_]
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

const getInputMap = () => {
  return {
    /**
     * SYSTEMD USER
     * https://systemd.io/USER_NAMES/ -> strict mode
     * ^[a-zA-Z_][a-zA-Z0-9_-]{0,30}$
     * The current user's registered login name.
     *
     * @param { string } value
     * @returns { string } An error message if any.
     */
    "service.author": value => {
      // is not empty
      if (!value) {
        return 'service.author: must not be empty';
      }
      // is within character size bounds and set
      if (!/^[a-zA-Z_][a-zA-Z0-9_-]{0,30}$/.test(value)) {
        return 'service.author: illegal characters or size'
      }
      return '';
    },

    /**
     * CANONICAL DOCKER IMAGE NAME: REGISTRY[:PORT]/USER/REPO[:TAG]
     * - LENGTH: 2-253
     * - example: registry-1.docker.io/dquack/pavlos/mssql:v1.0
     * DQUACK IMAGE NAME: dquack/USER/REPO:TAG
     * - LENGTH: 2-253 - len(registry-1.docker.io) = 253 - 20 = 2-233
     * - example: dquack/pavlos/mssql
     * ^[a-z](?:(?:\/[a-z])?(?:[-_.]{0,2}[a-z0-9])*)*$
     *
     * @param { string } value
     * @returns { string } An error message if any.
     */
    "service.name": value => {
      // is not empty
      if (!value) {
        return 'service.name: must not be empty';
      }
      // is within character size bounds
      const len = value.length();
      if (len < 2 || len > 233) {
        return 'service.name: must be within bounds [2-233]';
      }
      // is within character set
      if (!/^[a-z](?:(?:\/[a-z])?(?:[-_.]{0,2}[a-z0-9])*)*$/.test(value)) {
        return 'service.name: illegal characters';
      }
      return '';
    },

    /**
     * CANONICAL DOCKER TAG: [:TAG]
     * ^\w[-.\w]{0,126}[a-zA-Z0-9]$;
     * - LENGTH: 128
     * - example: v1.0
     *
     * @param { string } value
     * @returns { string } An error message if any.
     */
    "service.tag": value => {
      // is not empty
      if (!value) {
        return 'service.tag: must not be empty';
      }
      // is within character size bounds
      const len = value.length();
      if (len < 1 || len > 128) {
        return 'service.tag: must be within bounds [1-128]';
      }
      // is within character set
      if (!/^\w[-.\w]{0,126}[a-zA-Z0-9]$/.test(value)) {
        return 'service.tag: illegal characters';
      }
      return '';
    },
  }
}


let INPUT_MAP;
if (!INPUT_MAP) {
  INPUT_MAP = getInputMap();
}

const validate = function validateInput(key, value, strict = false) {
  if (!INPUT_MAP[key]) {
    if (strict) {
      throw new Error(`Unrecognized input set '${key}' - '${value}'`);
    }
    return '';
  }
  return INPUT_MAP[key](value);
}

export default validate;


