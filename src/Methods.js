const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export let methods = {
    /**
     * @param value
     * @return {boolean|{value}}
     */
    alpha(value) {
        return /^[a-zA-Z]+$/.test(value) || { value };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    alpha_dash(value) {
        return /^[A-Za-z\-]+$/.test(value) || { value };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    alpha_numeric(value) {
        return /^[A-Za-z0-9]+$/.test(value) || { value };
    },

    /**
     * @param value
     * @return {boolean|{}}
     */
    array(value) {
        return Array.isArray(value) || {};
    },

    /**
     * @param value
     * @param from
     * @param to
     * @return {{from, to, value}|boolean}
     */
    between(value, from, to) {
        if (typeof value === 'string') {
            if (value.length >= from && value.length <= to) {
                return true;
            }
        } else {
            if (value >= from && value <= to) {
                return true;
            }
        }
        return { from, to, value };
    },

    /**
     * @param value
     * @return {boolean}
     */
    boolean(value) {
        return typeof value === 'boolean' || {};
    },

    /**
     * @param value
     * @return {boolean}
     */
    checked(value) {
        return (
            value === 1 || value === 'on' || value === true || value === 'true' || {}
        );
    },

    /**
     * @param value
     * @param values
     * @return {{value_to_contain: *}|boolean}
     */
    contains_all(value, ...values) {
        if (!Array.isArray(value)) {
            value = String(value);
        }
        for (let i = 0, l = values.length; i < l; i++) {
            if (value.indexOf(values[i]) === -1) {
                return { value_to_contain: values[i] };
            }
        }
        return true;
    },

    /**
     * @param value
     * @param values
     * @return {boolean|{value_to_contain: string}}
     */
    contains_one(value, ...values) {
        if (!Array.isArray(value)) {
            value = String(value);
        }
        for (let i = 0, l = values.length; i < l; i++) {
            if (value.indexOf(values[i]) > -1) {
                return true;
            }
        }
        return { value_to_contain: values.join(',') };
    },

    /**
     * @param value
     * @return {boolean}
     */
    date(value) {
        return !isNaN(Date.parse(value)) || {};
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    email(value) {
        return emailRegex.test(value) || { value };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    phone(value) {
        value = String(value);
        return /^\d{7,}$/.test(value.replace(/[\s()+\-\.]|ext/gi, '')) || { value };
    },

    /**
     * @param value
     * @param suffix
     * @return {boolean|{suffix: string}}
     */
    ends_with(value, suffix) {
        suffix = String(suffix);
        value = String(value);
        return (
            value.indexOf(suffix, value.length - suffix.length) !== -1 || { suffix }
        );
    },

    /**
     * @param value
     * @param param
     * @return {boolean|{value}}
     */
    equals(value, param) {
        return String(value) === String(param) || { value: param };
    },

    /**
     * @param value
     * @param arr
     * @return {boolean|{value: string}}
     */
    in_array(value, ...arr) {
        return arr.indexOf(String(value)) > -1 || { value: arr.join(',') };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    ip(value) {
        return ipRegex.test(value) || { value };
    },

    /**
     * @param value
     * @return {{}|boolean}
     */
    json(value) {
        try {
            JSON.parse(String(value));
            return true;
        } catch (e) {
            return {};
        }
    },

    /**
     * @param value
     * @param max
     * @return {{max}|boolean}
     */
    max(value, max) {
        if (typeof value === 'string') {
            if (value.length <= max) return true;
        } else if (typeof value !== undefined) {
            if (value <= max) return true;
        }
        return { max };
    },

    /**
     * @param value
     * @param min
     * @return {{min}|boolean}
     */
    min(value, min) {
        if (typeof value === 'string') {
            if (value.length >= min) return true;
        } else if (typeof value !== undefined) {
            if (value >= min) return true;
        }
        return { min };
    },

    /**
     * @param value
     * @param param
     * @return {boolean|{value}}
     */
    not_equals(value, param) {
        return String(value) !== String(param) || { value: param };
    },

    /**
     * @param value
     * @param arr
     * @return {boolean|{value}}
     */
    not_in(value, ...arr) {
        return arr.indexOf(String(value)) === -1 || { value };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    numeric(value) {
        return /^-?\d+$/.test(value) || { value };
    },

    /**
     * @param value
     * @return {boolean|{value}}
     */
    object(value) {
        return (typeof value === 'object' && !Array.isArray(value)) || { value };
    },

    /**
     * @param value
     * @param prefix
     * @return {boolean|{prefix: string}}
     */
    starts_with(value, prefix) {
        prefix = String(prefix);
        value = String(value);
        return value.indexOf(prefix) === 0 || { prefix };
    },

    /**
     * @param value
     * @return {{value}|boolean}
     */
    url(value) {
        try {
            new URL(value);
            return true;
        } catch (e) {
            return { value };
        }
    },
};

/**
 * @param {string} name
 * @returns {function}
 */
export function getValidationMethod(name) {
    if (methods.hasOwnProperty(name) === false) {
        throw `The validation method "${name}" does not exist`;
    }
    return methods[name];
}




// var rules = {
//     required: function (val) {
//         var str;

//         if (val === undefined || val === null) {
//             return false;
//         }

//         str = String(val).replace(/\s/g, "");
//         return str.length > 0 ? true : false;
//     },

//     required_if: function (val, req, attribute) {
//         req = this.getParameters();
//         if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
//             return this.validator.getRule("required").validate(val);
//         }

//         return true;
//     },

//     required_unless: function (val, req, attribute) {
//         req = this.getParameters();
//         if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
//             return this.validator.getRule("required").validate(val);
//         }

//         return true;
//     },

//     required_with: function (val, req, attribute) {
//         if (this.validator._objectPath(this.validator.input, req)) {
//             return this.validator.getRule("required").validate(val);
//         }

//         return true;
//     },

//     required_with_all: function (val, req, attribute) {
//         req = this.getParameters();

//         for (var i = 0; i < req.length; i++) {
//             if (!this.validator._objectPath(this.validator.input, req[i])) {
//                 return true;
//             }
//         }

//         return this.validator.getRule("required").validate(val);
//     },

//     required_without: function (val, req, attribute) {
//         if (this.validator._objectPath(this.validator.input, req)) {
//             return true;
//         }

//         return this.validator.getRule("required").validate(val);
//     },

//     required_without_all: function (val, req, attribute) {
//         req = this.getParameters();

//         for (var i = 0; i < req.length; i++) {
//             if (this.validator._objectPath(this.validator.input, req[i])) {
//                 return true;
//             }
//         }

//         return this.validator.getRule("required").validate(val);
//     },

//     boolean: function (val) {
//         return (
//             val === true ||
//             val === false ||
//             val === 0 ||
//             val === 1 ||
//             val === "0" ||
//             val === "1" ||
//             val === "true" ||
//             val === "false"
//         );
//     },

//     // compares the size of strings
//     // with numbers, compares the value
//     size: function (val, req, attribute) {
//         if (val) {
//             req = parseFloat(req);

//             var size = this.getSize();

//             return size === req;
//         }

//         return true;
//     },

//     string: function (val, req, attribute) {
//         return typeof val === "string";
//     },

//     sometimes: function (val) {
//         return true;
//     },

//     /**
//      * Compares the size of strings or the value of numbers if there is a truthy value
//      */
//     min: function (val, req, attribute) {
//         var size = this.getSize();
//         return size >= req;
//     },

//     /**
//      * Compares the size of strings or the value of numbers if there is a truthy value
//      */
//     max: function (val, req, attribute) {
//         var size = this.getSize();
//         return size <= req;
//     },

//     between: function (val, req, attribute) {
//         req = this.getParameters();
//         var size = this.getSize();
//         var min = parseFloat(req[0], 10);
//         var max = parseFloat(req[1], 10);
//         return size >= min && size <= max;
//     },

//     email: function (val) {
//         // Added umlaut support https://github.com/skaterdav85/validatorjs/issues/308
//         var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         if (!re.test(val)) {
//             // added support domain 3-n level https://github.com/skaterdav85/validatorjs/issues/384
//             re = /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
//         }
//         return re.test(val);
//     },

//     numeric: function (val) {
//         var num;

//         num = Number(val); // tries to convert value to a number. useful if value is coming from form element

//         if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
//             return true;
//         } else {
//             return false;
//         }
//     },

//     array: function (val) {
//         return val instanceof Array;
//     },

//     url: function (url) {
//         return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
//     },

//     alpha: function (val) {
//         return /^[a-zA-Z]+$/.test(val);
//     },

//     alpha_dash: function (val) {
//         return /^[a-zA-Z0-9_\-]+$/.test(val);
//     },

//     alpha_num: function (val) {
//         return /^[a-zA-Z0-9]+$/.test(val);
//     },

//     same: function (val, req) {
//         var val1 = this.validator._flattenObject(this.validator.input)[req];
//         var val2 = val;

//         if (val1 === val2) {
//             return true;
//         }

//         return false;
//     },

//     different: function (val, req) {
//         var val1 = this.validator._flattenObject(this.validator.input)[req];
//         var val2 = val;

//         if (val1 !== val2) {
//             return true;
//         }

//         return false;
//     },

//     in: function (val, req) {
//         var list, i;

//         if (val) {
//             list = this.getParameters();
//         }

//         if (val && !(val instanceof Array)) {
//             var localValue = val;

//             for (i = 0; i < list.length; i++) {
//                 if (typeof list[i] === "string") {
//                     localValue = String(val);
//                 }

//                 if (localValue === list[i]) {
//                     return true;
//                 }
//             }

//             return false;
//         }

//         if (val && val instanceof Array) {
//             for (i = 0; i < val.length; i++) {
//                 if (list.indexOf(val[i]) < 0) {
//                     return false;
//                 }
//             }
//         }

//         return true;
//     },

//     not_in: function (val, req) {
//         var list = this.getParameters();
//         var len = list.length;
//         var returnVal = true;

//         for (var i = 0; i < len; i++) {
//             var localValue = val;

//             if (typeof list[i] === "string") {
//                 localValue = String(val);
//             }

//             if (localValue === list[i]) {
//                 returnVal = false;
//                 break;
//             }
//         }

//         return returnVal;
//     },

//     accepted: function (val) {
//         if (val === "on" || val === "yes" || val === 1 || val === "1" || val === true) {
//             return true;
//         }

//         return false;
//     },

//     confirmed: function (val, req, key) {
//         var confirmedKey = key + "_confirmation";

//         if (this.validator.input[confirmedKey] === val) {
//             return true;
//         }

//         return false;
//     },

//     integer: function (val) {
//         return String(parseInt(val, 10)) === String(val);
//     },

//     digits: function (val, req) {
//         var numericRule = this.validator.getRule('numeric');
//         if (numericRule.validate(val) && String(val.trim()).length === parseInt(req)) {
//             return true;
//         }

//         return false;
//     },

//     digits_between: function (val) {
//         var numericRule = this.validator.getRule("numeric");
//         var req = this.getParameters();
//         var valueDigitsCount = String(val).length;
//         var min = parseFloat(req[0], 10);
//         var max = parseFloat(req[1], 10);

//         if (numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max) {
//             return true;
//         }

//         return false;
//     },

//     regex: function (val, req) {
//         let reqPattern = req;
//         var mod = /[g|i|m]{1,3}$/;
//         var flag = req.match(mod);
//         flag = flag ? flag[0] : "";

//         req = req.replace(mod, "").slice(1, -1);
//         req = new RegExp(req, flag);
//         return !!req.test(val);
//     },

//     date: function (val, format) {
//         return isValidDate(val);
//     },

//     present: function (val) {
//         return typeof val !== "undefined";
//     },

//     after: function (val, req) {
//         var val1 = this.validator.input[req];
//         var val2 = val;

//         if (!isValidDate(val1)) {
//             return false;
//         }
//         if (!isValidDate(val2)) {
//             return false;
//         }

//         if (new Date(val1).getTime() < new Date(val2).getTime()) {
//             return true;
//         }

//         return false;
//     },

//     after_or_equal: function (val, req) {
//         var val1 = this.validator.input[req];
//         var val2 = val;

//         if (!isValidDate(val1)) {
//             return false;
//         }
//         if (!isValidDate(val2)) {
//             return false;
//         }

//         if (new Date(val1).getTime() <= new Date(val2).getTime()) {
//             return true;
//         }

//         return false;
//     },

//     before: function (val, req) {
//         var val1 = this.validator.input[req];
//         var val2 = val;

//         if (!isValidDate(val1)) {
//             return false;
//         }
//         if (!isValidDate(val2)) {
//             return false;
//         }

//         if (new Date(val1).getTime() > new Date(val2).getTime()) {
//             return true;
//         }

//         return false;
//     },

//     before_or_equal: function (val, req) {
//         var val1 = this.validator.input[req];
//         var val2 = val;

//         if (!isValidDate(val1)) {
//             return false;
//         }
//         if (!isValidDate(val2)) {
//             return false;
//         }

//         if (new Date(val1).getTime() >= new Date(val2).getTime()) {
//             return true;
//         }

//         return false;
//     },

//     hex: function (val) {
//         return /^[0-9a-f]+$/i.test(val);
//     },

//     ipv4: function (val, req, attribute) {
//         if (typeof val != 'string')
//             return false;

//         // regex to check that each octet is valid
//         var er = /^[0-9]+$/;
//         // ipv4 octets are delimited by dot
//         octets = val.split('.');
//         // check 1: ipv4 address should contains 4 octets
//         if (octets.length != 4)
//             return false;

//         for (let i = 0; i < octets.length; i++) {
//             const element = octets[i];
//             // check 2: each octet should be integer bigger than 0
//             if (!er.test(element))
//                 return false;

//             // check 3: each octet value should be less than 256
//             var octetValue = parseInt(element);
//             if (octetValue >= 256)
//                 return false;
//         }

//         // if all checks passed, we know it's valid IPv4 address!
//         return true;
//     },

//     ipv6: function (val, req, attribute) {
//         if (typeof val != 'string')
//             return false;

//         // regex to check that each hextet is valid
//         var er = /^[0-9a-f]+$/;
//         // ipv6 hextets are delimited by colon
//         hextets = val.split(':');

//         // check 1: ipv6 should contain only one consecutive colons
//         colons = val.match(/::/);
//         if (colons != null && val.match(/::/g).length > 1)
//             return false;

//         // check 2: ipv6 should not be ending or starting with colon
//         //          edge case: not with consecutive colons
//         if (val[0] == ':' && (colons == null || (colons != null && colons.index != 0)))
//             return false;
//         if (val[val.length - 1] == ':' && (colons == null || (colons != null && colons.index != val.length - 2)))
//             return false;

//         // check 3: ipv6 should contain no less than 3 sector
//         //         minimum ipv6 addres - ::1
//         if (3 > hextets.length)
//             return false;

//         // check 4: ipv6 should contain no more than 8 sectors
//         //         only 1 edge case: when first or last sector is ommited
//         var isEdgeCase = (hextets.length == 9 && colons != null && (colons.index == 0 || colons.index == val.length - 2));
//         if (hextets.length > 8 && !isEdgeCase)
//             return false;

//         // check 5: ipv6 should contain exactly one consecutive colons if it has less than 8 sectors
//         if (hextets.length != 8 && colons == null)
//             return false;

//         for (let i = 0; i < hextets.length; i++) {
//             const element = hextets[i];

//             if (element.length == 0)
//                 continue;

//             // check 6: all of hextets should contain numbers from 0 to f (in hexadecimal)
//             if (!er.test(element))
//                 return false;

//             // check 7: all of hextet values should be less then ffff (in hexadeimal)
//             //          checking using length of hextet. lowest invalid value's length is 5.
//             //          so all valid hextets are length of 4 or less
//             if (element.length > 4)
//                 return false;
//         }
//         return true;
//     },

//     ip: function (val, req, attribute) {
//         return rules['ipv4'](val, req, attribute) || rules['ipv6'](val, req, attribute);
//     }

// };