import { messages, defaultMessage, defaultLocale, languages } from './messages';
import { methods } from './methods';
import { parseScheme } from './Rule';

export { setMessages, setDefaultMessage, setLocale, languages } from './messages';
export {
    setRuleSeparator,
    setRuleParamSeparator,
    setParamsSeparator,
} from './Rule';

/**
 * Extends `Validator` by adding new validation methods.
 *
 * @param {string} name
 * @param {function} method
 * @param {string|null} message
 */
export function extend(name, method, message = null) {
    if (methods.hasOwnProperty(name)) {
        throw `The validation method "${name}" already exists`;
    }

    if (typeof method !== 'function') {
        throw 'The validation method must be function';
    }

    methods[name] = method;

    if (message) {
        messages[name] = message;
    }
}

/**
 * Format Validation Messages
 * @param {string} name
 * @param {object|null} params
 * @param {string} ruleName
 * @returns {string}
 */
export function formatMessage(name, params, ruleName) {
    if (typeof params !== 'object') {
        params = {};
    }
    params.name = name;

    if (messages[ruleName] === undefined) {
        return defaultMessage;
    }

    let message = messages[ruleName];
    if( messages[name] !== undefined && messages[name][ruleName] !== undefined ){
        message = messages[name][ruleName];
    }

    Object.keys(params).map(function (key) {
        message = message.replace(':' + key, params[key]);
    });

    return message;
}

/**
 * Format Validation Errors
 * @param {object} errors
 * @param {object} failedRules
 * @returns {object}
 */
export function formatErrors(errors, failedRules) {
    return {
        hasError: Object.keys(errors).length > 0,
        errors: errors,
        isError: function (paramName, ruleName) {
            if (ruleName === undefined) {
                return errors[paramName] !== undefined;
            } else {
                return (
                    failedRules[paramName] !== undefined &&
                    failedRules[paramName].indexOf(ruleName) !== -1
                );
            }
        },
        getError: function (paramName, _join = ',', getAll = true) {
            if (!Array.isArray(errors[paramName]) || errors[paramName].length === 0) {
                return '';
            }
            return getAll ? errors[paramName].join(_join) : errors[paramName][0];
        },
        getAllError: function ( paramName, _join = ',' ) {
            if (!Array.isArray(errors[paramName]) || errors[paramName].length === 0) {
                return '';
            }
            return errors[paramName].join(_join)
        },
    };
}

/**
 * Get empty Validator
 * @return {object}
 */
export function getEmpty() {
    return validate({}, {});
}

/**
 * Validate given data with given rules
 *
 * @param {object} data Data to validate
 * @param {object} scheme Validation scheme
 * @param {function?} callback
 * @returns {object}
 */
export function validate(data, scheme, callback) {
    let errors = {};
    let failedRules = {};

    if (typeof data !== 'object' || typeof scheme !== 'object') {
        throw 'Both data and scheme must be object';
    }

    let rules = parseScheme(scheme);

    for (let paramName in rules) {
        failedRules[paramName] = [];

        for (let i = 0, l = rules[paramName].rules.length; i < l; i++) {
            let rule = rules[paramName].rules[i];
            let result = rule.validate(rules[paramName], data[paramName], data);
            let ruleName = result.rule ? result.rule : rule.name;

            if (result === true) {
                continue;
            }

            let err;
            if (typeof result === 'string') {
                err = result;
            } else {
                err = formatMessage(paramName, result, ruleName); /// to String object => exa : paramName: name result : { min: 30 } ruleName min => message string kết quả: "Đây là min"
            }

            if (errors[paramName] === undefined) {
                errors[paramName] = [err];
            } else {
                if (errors[paramName].indexOf(err) === -1) {
                    errors[paramName].push(err);
                }
            }

            failedRules[paramName].push(ruleName);
        }
    }

    const errorHandler = formatErrors(errors, failedRules);

    if (typeof callback === 'function') {
        callback(errorHandler);
    }

    return errorHandler;
}