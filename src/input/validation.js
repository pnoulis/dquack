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

const DOCKER_NAME_UPPER_BOUNDS = 255;
const DOCKER_NAME_LOWER_BOUNDS = 2;
const DOCKER_TAG_LOWER_BOUNDS = 0;
const DOCKER_TAG_UPPER_BOUNDS = 128;
const DOCKER_NAME_COMPONENT_RE = /^[a-z][-.\w]$/ // dont allow the fist character to be a number
const DOCKER_NAME_RE = /^[a-z](?:\/{1,1}[a-z]|[-.\w])+$/ // 253 characters in total
const DOCKER_TAG_RE = /^\w[-.\w]{0,127}$/; // 128 characters in total
//  ^(?:[a-z]*?|\/[a-z](?:[-._]{0,2}[a-z0-9])*(\/\b)?)*$
// REGISTRY[:PORT]/USER/REPO[:TAG]

const getInputMap = () => {
  return {
    "service.author": () => {
    },
    "service.name": () => {
    },
    "service.tag": () => {
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


// const
// charsAllowedProduct = "(a-z0-9,.-_:%\"')",
// INPUT_VALIDATIONS = {
//   password(password) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `Password exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Password required, example: Liberty1",
//     wrongFormat = "Password must contain at least 1 capital letter and 1 number";

//     if (!password) return emptyInput;
//     if (password.length > LENGTH_LIMIT) return tooLong;
//     if (!/.*(\d+.*[A-Z]+.*|[A-Z]+.*\d+.*)+.*/.test(password)) return wrongFormat;
//     return false;
//   },
//   username(username) {
//     const
//     LENGTH_LIMIT = 30,
//     tooLong = `Username exceeds ${LENGTH_LIMIT} characters`,
//     wrongFormat = "Expected format: (John)",
//     emptyInput = "Username required, example: John";

//     if (!username) return emptyInput;
//     if (username.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isAlphanumeric(username, ["en-US"])) return wrongFormat;
//     return false;
//   },
//   email: function(email) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `Email exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Email required, example: me@gmail.com",
//     wrongFormat = "Expected format: (me@gmail.com)";

//     if (!email) return emptyInput;
//     if (email.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isEmail(email)) return wrongFormat;
//     return false;
//   },
//   admin: function(bool) {
//     const
//     wrongFormat = "Exected format for admin: true or false";

//     if (typeof bool !== "boolean") return wrongFormat;
//     return false;
//   },
//   programmer: function(bool) {
//     const
//     wrongFormat = "Exected format for programmer: true or false";

//     if (typeof bool !== "boolean") return wrongFormat;
//     return false;
//   },
//   tel: function(number) {
//     const
//     LENGTH_LIMIT = "30",
//     tooLong = `Mobile phone exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Mobile number required, example: 07544945926",
//     wrongFormat = "Expected format: (07544945926)";

//     if (!number) return emptyInput;
//     if (number.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isNumeric(number)) return wrongFormat;
//     return false;
//   },
//   mobile(number) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `Mobile exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Mobile number required, example: 07544945926",
//     wrongFormat = "Expected format: (07544945926)";

//     if (!number) return emptyInput;
//     if (number.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isNumeric(number)) return wrongFormat;
//     return false;
//   },
//   type: function(type) {
//     const
//     emptyInput = "Type required!",
//     wrongFormat =  "Expected format: (only a-z)";

//     if (!type) return emptyInput;
//     if (!validator.isAlpha(type, ["en-US"], {ignore: " "})) return wrongFormat;
//     return false;
//   },
//   city(city) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `City exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "City required, example: New York",
//     wrongFormat = "Expected format: (New York)";

//     if (!city) return emptyInput;
//     if (city.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isAlpha(city, ["en-US"], {ignore: " "})) return wrongFormat;
//     return false;
//   },
//   fullname(fullname) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `Name exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Name required, example: John Scott",
//     wrongFormat = "Expected format: (John Scott)";

//     if (!fullname) return emptyInput;
//     if (fullname.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isAlpha(fullname, ["en-US"], {ignore: " "})) return wrongFormat;
//     return false;
//   },
//   region(region) {
//     const
//     OPTIONAL = true,
//     LENGTH_LIMIT = 150,
//     tooLong = `Region exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Region required, example: Texas",
//     wrongFormat = "Expected format: (Texas)";

//     if (!region && OPTIONAL) return false;
//     if (region.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isAlpha(region, ["en-US"], {ignore: " "})) return wrongFormat;
//     return false;
//   },
//   postcode: function(postcode) {
//     const
//     LENGTH_LIMIT = 30,
//     tooLong = `Postcode exceeds ${LENGTH_LIMIT} characters`,
//     emptyInput = "Postcode required, example: BS16 5SE, 55438, ...",
//     wrongFormat = "Expected format: BS16 5SE, 55438, ...";

//     if (!postcode) return emptyInput;
//     if (postcode.length > LENGTH_LIMIT) return tooLong;
//     if (!validator.isPostalCode(postcode, "any")) return wrongFormat;
//     return false;
//   },

//   street: function(street) {
//     const
//     LENGTH_LIMIT = 150,
//     tooLong = `Street field should be less than ${LENGTH_LIMIT} characts`,
//     emptyInput = "Address line required, example: 10 Downing Street, Westminster",
//     wrongFormat = "Expected format: 10 Downing Street, Westminster";

//     if (!street) return emptyInput;
//     if (street.length > LENGTH_LIMIT) return tooLong;
//     if (/[^a-zA-Z0-9\s,.-_ ]/.test(street)) return wrongFormat;
//     return false;
//   },

//   country: function(country) {
//     const
//     LENGTH_LIMIT = 30,
//     tooLong = `Country exceeds ${LENGTH_LIMIT} characters`,
//     wrongFormat = "Countries do not use numerals or specials characters",
//     emptyInput = "Country required!";

//     if (!country) return emptyInput;
//     if (country === "country*") return emptyInput;
//     if (country.length > LENGTH_LIMIT) return tooLong;
//     if (/[^a-z]/.test(country)) return wrongFormat;
//     return false;
//   },
//   comment(comment) {
//     const
//     OPTIONAL = true,
//     LENGTH_LIMIT = 300,
//     tooLong = `Comment exceeds ${LENGTH_LIMIT} characters`,
//     wrongFormat = "Allowed characters are: (a-z A-Z 0-9 , .)";

//     if (!comment && OPTIONAL) return false;
//     if (comment.length > LENGTH_LIMIT) return tooLong;
//     if (/[^a-zA-Z0-9,.<> ]/.test(comment)) return wrongFormat;
//     return false;
//   },

//   // generic
//   alphaNum: function(string) {
//     const emptyInput = "One of the fields was left empty!",
//           wrongFormat = "Only alphanumeric characters are allowed!";
//     if (!string)
//       return emptyInput;
//     else if (!validator.isAlphanumeric(string, ["en-US"]))
//       return wrongFormat;
//     else
//       return false;
//   },
//   title: function(string) {
//     const LENGTH_LIMIT = 40,
//           emptyInput = "The title was left empty!",
//           tooLong = `The title must be less than ${LENGTH_LIMIT} characters long`,
//           wrongFormat = `Title field is allowed only ${charsAllowedProduct}`;

//     if (!string)
//       return emptyInput;
//     else if (string.length > LENGTH_LIMIT)
//       return tooLong;
//     else if (/[^\w\s\n-,.:%"']/.test(string))
//       return wrongFormat;
//     else
//       return false;
//   },

//   description: function(string) {
//     const LENGTH_LIMIT = 200,
//           emptyInput = "The description was left empty!",
//           tooLong = `The description must be less than ${LENGTH_LIMIT} characters long!`,
//           wrongFormat = `Description field is allowed only ${charsAllowedProduct}`;

//     if (!string)
//       return emptyInput;
//     else if (string.length > LENGTH_LIMIT)
//       return tooLong;
//     else if (/[^\w\s-,.:%"']/.test(string))
//       return wrongFormat;
//     else
//       return false;
//   },

//   supplier: function(string) {
//     const OPTIONAL = true,
//           LENGTH_LIMIT = 15,
//           tooLong = `The supplier must be less than ${LENGTH_LIMIT} characters long!`,
//           wrongFormat = `Supplier field is allowed only ${charsAllowedProduct}`;

//     if (!string && OPTIONAL) return false;
//     else if (string.length > LENGTH_LIMIT) return tooLong;
//     else if (/[^\w\s-,.:%"']/.test(string)) return wrongFormat;
//     else return false;
//   },

//   supplierId: function(string) {
//     const OPTIONAL = true,
//           LENGTH_LIMIT = 15,
//           tooLong = `The supplier id must be less than ${LENGTH_LIMIT} characters long!`,
//           wrongFormat = `Supplier id field is allowed only ${charsAllowedProduct}`;

//     if (!string && OPTIONAL) return false;
//     else if (string.length > LENGTH_LIMIT) return tooLong;
//     else if (/[^\w\s-,.:%"']/.test(string)) return wrongFormat;
//     else return false;
//   },

//   tags: function(array) {
//     const emptyInput = "No tag was selected!";

//     if (!array.length) return emptyInput;
//     else return false;
//   },

//   units: function(number) {
//     const string = number.toString(),
//           emptyInput = "Units field is empty!",
//           wrongFormat = "Units field is allowed only (0-9.)";

//     if (!string) return emptyInput;
//     else if (/[^0-9.]/.test(string)) return wrongFormat;
//     else return false;
//   },

//   wpu: function(number) {
//     const string = number.toString(),
//           emptyInput = "Wpu field is empty!",
//           wrongFormat = "Wpu field is allowed only (0-9.)";

//     if (!string) return emptyInput;
//     else if (/[^0-9.]/.test(string)) return wrongFormat;
//     else return false;
//   },

//   ppu: function(number) {
//     const string = number.toString(),
//           emptyInput = "Ppu field is empty!",
//           wrongFormat = "Ppu field is allowed only (0-9.)";

//     if (!string) return emptyInput;
//     else if (/[^0-9.]/.test(string)) return wrongFormat;
//     else return false;
//   },

//   tp: function(number) {
//     const
//     string = number.toString(),
//     emptyInput = "Tp Field is empty!",
//     wrongFormat = "Tp field is allowed only (0-9.)";

//     if (!string) return emptyInput;
//     else if (/[^0-9.]/.test(string)) return wrongFormat;
//     else return false;
//   },

//   mus: function(array) {
//     const isEmpty = "Measuring unit has not been selected";
//     if (!array.length) return isEmpty;
//     return false;
//   },
//   mu: function(string) {
//     const emptyInput = "Measuring units field is empty!";

//     if (!string) return emptyInput;
//     else return false;
//   },

//   pus: function(array) {
//     const isEmpty = "Price unit has not been selected";
//     if (!array.length) return isEmpty;
//     return false;
//   },
//   pu: function(string) {
//     const emptyInput = "Price units field is empty!";

//     if (!string) return emptyInput;
//     return false;
//   },

//   stock: function(number) {
//     const OPTIONAL = true,
//           string = number.toString(),
//           emptyInput = "Stock field is empty!",
//           wrongFormat = "Stock field is allowed only (0-9)";

//     if (!string && OPTIONAL) return false;
//     else if (/[^0-9]/.test(string)) return wrongFormat;
//     else return false;
//   },

//   img: function(img) {
//     if (!img.originalname) return "you forgot to upload an image";

//     const LENGTH_LIMIT = 124, // completely arbitrary
//           ext = MyPath.extractExt(img.originalname),
//           filename = MyPath.extractName(img.originalname),
//           mime = img.mimetype,
//           IMG_FORMATS = [
//             "image/jpeg",
//             "image/png",
//             "image/gif",
//             "image/webp",
//             "image/svg+xml",
//             "image/tiff",
//             "image/bmp",
//           ],
//           tooLong = `The image name exceeds ${LENGTH_LIMIT} chararcters, please shorten it`,
//           illegalChars = "Please reformat the image file name to only include characters from" +
//           "the set: [a-zA-Z0-9-_.] (no spaces are allowed)",
//           notAnImg = "The file you tried to upload is not an img." +
//           "The accepted formats are: (jpg, jpeg), (png), (gif), (webp), (bmp), (svg+xml)",
//           isImg = function() {
//             let match = false;
//             IMG_FORMATS.forEach(format => {
//               if (format === mime) match = true;
//             });
//             return match;
//           };

//     if (filename.length > LENGTH_LIMIT) return tooLong;
//     else if (/[^a-zA-Z0-9-_]/.test(filename)) return illegalChars;
//     else if (!isImg()) return notAnImg;
//     else return false;
//   },
// };

// export default validate;
