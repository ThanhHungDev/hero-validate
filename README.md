
## Installation

You can install `hero-validate` using npm or yarn package manager:

```bash
npm install hero-validate --save
#or
yarn add hero-validate

```

### Usage

```javascript
/// import code js to your project
const Validation = require('hero-validate');
/// create rule for your form
const rules = {
    name         : 'required|min:2|max:50',
    email        : "required|email",
    password     : "required|min:8|max:100",
};
/// custom message for your form
Validation.setMessages({
    name: {
        required: "Field Name is required --- override message",
        min: "Field :name can't be less than :min --- override message", /// replace value param
        max: ":name cant be greater than :max  --- override message :D ", /// replace value param :max
    },
    required: 'required override message', /// default message of rule required not define field 
    min: 'validator got parameter :min and value :value' /// default message of rule min not define field 
    ....
});

/// show all language support
console.log(Validation.languages)
/// you can setting locale for support 2 language : en - vi - ja
Validation.setLocale(Validation.languages.vi)

const data = {
  name    : 'Trương Thanh Hùng Đẹp Trai',
  email   : 'thanhhungdevgmail.com',
  password: 'ahihi@1',
};

const result = Validation.validate( data,  rules );
console.log(JSON.stringify(result))
/// {"hasError":true,"errors":{"email":["email phải là mail hợp lệ"],"password":["password phải lớn hơn hoặc bằng 8."]}}

result.isError('name', 'ruleName' ); // Boolean Get if given field has error, ruleName default null will get all

result.getError('name', '-'); // will Get first error message of field or join error string by - character. Default join string error by `,`

result.getAllError('name', "|"); //  will Get all error message of field or join error string by | character. Default join string error by `,`
```
## Example Validate an object

```js
import Validation from 'hero-validate'
/// create rule for your form
const rules = {
    email        : "required|email|min:8|max:20",
    password     : "required|min:7|max:100",
};
const message = {
    email: "email failure!!!",
    password: ":name failure..."
}
const data = {
  email: 'jbvalidate@gmail.com',
  password: 'hungfff'
}
/// custom message for your form
Validation.setMessages(message);
const result = Validation.validate( data,  rules );
```

will return obect error, if you need check hasError `result.hasError`

## Custom rule Validation
- Example 1 - object rule

```js
import Validation from 'hero-validate'
/// create rule for your form
const rules = {
    password     : "required|min_length:7|max_length:100",
    confirm_password : {
        required: true,
        mycustom: function (value) {
            if (value !== data.password) {
                return {}; /// try return {} or string 
                // return "Password confirm is incorrect"
            }
            return true;
        },
    },
};
const message = {
    password: ":name failure...",
    mycustom: "try turn off mycustom"
}
const data = {
    password: 'hungfff',
    confirm_password: "fdsfds", /// name underscore
}
/// custom message for your form
Validation.setMessages(message);
const result = Validation.validate( data,  rules );
```
- Example 2 - create function validate public

```js
Validation.extend(
    'validate_address', /// underscore
    function (value, arg1, arg2, ...rest) {
        
        if (",#-/ !@$%^*(){}|[]\\".indexOf(value) >= 0) {
            return true
        }
        return {
            value: value,
            /// arg1, arg2, ...rest
        }
    },
    'Default Error Message: :name cant be :value'
);
// usage: { 
//    address1: 'validate_address:arg1,arg2|required',
//    address2: 'validate_address:arg1|required',
//    address3: 'validate_address:arg1,arg2,arg3|min:7',
// }
```

## React Validation

demo code sanbox : https://codesandbox.io/embed/sweet-cache-x6keg?fontsize=14&hidenavigation=1&theme=dark

- Example

```jsx
import React, { useState, useEffect } from "react";
import Validator from "hero-validate";
/// create rule for your form
const rules = {
    email: "required|email|min:8|max:20",
    password: "required|min:7|max:40"
};
Validator.setLocale(Validator.languages.vi)
/// custom message for your form
Validator.setMessages({
    email: "sfsdfds :name ",
    password: {
        min: "sdfsdf password min"
    }
});

export default function TestMyValidate() {
    const [values, setValues] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({email: false, password: false});
    const [errors, setErrors] = useState(Validator.getEmpty());

    /// add function error custom
    const hasErr = (name) => {
        return touched[name] && errors.isError(name);
    };
    /// add function when value change
    const handleChange = (event) => {
        event.persist();
        setTouched({ ...touched, [event.target.name]: true });
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    /// hook react
    useEffect(() => {
        setErrors(Validator.validate(values, rules));
    }, [values]);

    return (
        <div className="App">
            <form>
                <label htmlFor="email"> mail of u </label>
                <input
                    type="text"
                    className={hasErr("email") ? "error" : ""}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                { hasErr("email") && (
                    <div className="text-red">{errors.getError("email")}</div>
                )}

                <label htmlFor="password"> password of you </label>
                <input
                    type="password"
                    className={hasErr("password") ? "error" : ""}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
                { hasErr("password") && (
                    <div className="text-red">{errors.getError("password")}</div>
                )}
            </form>
        </div>
    );
}

```


## Rule support

```js

/**
 * Validates if given values is `undefined` `null` or empty string.
 * @message Parameter is required
 * @example ...'|required'
 */
'required';

/**
 * Tells validator to pass value in validator function as string
 * @example ...'|string'
 */
'string';

/**
 * Tells validator to pass value in validator function as number
 * @example ...'|number'
 */
'number';

/**
 * Rule for parameter that is not required
 * @example ...'|nullable'
 */
'nullable';

/**
 * Validates if given value contains only letters
 * @message Parameter can only contain leters
 * @example ...'|alpha|'
 * @param value
 * @return {boolean|{value}}
 */
alpha(value) {
    return /^[a-zA-Z]+$/.test(value) || { value };
},

/**
 * Validates if given value contains only letters and dashes
 * @message Parameter can only contain letters and dashes
 * @example ...'|alpha_dash|'
 * @param value
 * @return {boolean|{value}}
 */
alpha_dash(value) {
    return /^[A-Za-z\-]+$/.test(value) || { value };
},

/**
 * Validates if given value contains only digits and letters
 * @message Parameter can only contain digits and letters
 * @example ...'|alpha_numeric|'
 * @param value
 * @return {boolean|{value}}
 */
alpha_numeric(value) {
    return /^[A-Za-z0-9]+$/.test(value) || { value };
},

/**
 * Validates if given value is array
 * @message Parameter must be array
 * @example ...'|array|'
 * @param value
 * @return {boolean|{}}
 */
array(value) {
    return Array.isArray(value) || {};
},

/**
 * Returns error if given value is between given parameter, if value is not numeric compares string length
 * @message Parameter must be between From and To
 * @example ...'|between:20,40|'
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
 * Validates if given value is boolean
 * @message Parameter must be boolean
 * @example ...'|boolean|'
 * @param value
 * @return {boolean}
 */
boolean(value) {
    return typeof value === 'boolean' || {};
},

/**
 * Validates if checkbox is checked. Valid values: `'on', 1, 'true', true`
 * @message Parameter must be checked
 * @example ...'|checked|'
 * @param value
 * @return {boolean}
 */
checked(value) {
    return (
        value === 1 || value === 'on' || value === true || value === 'true' || {}
    );
},

/**
 * Validates if given value don't contains every given parameter
 * @message Parameter must contain "Value"
 * @example ...'|contains_all:foo,bar,2|'
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
 * Validates if given value don't contains one of parameter
 * @message Parameter must contain "Value"
 * @example ...'|contains_one:foo,bar,2|'
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
 * Validates if given value is valid date
 * @message Parameter must be valid date
 * @example ...'|date|'
 * @param value
 * @return {boolean}
 */
date(value) {
    return !isNaN(Date.parse(value)) || {};
},

/**
 * Validates if given value is correct email
 * @message Parameter must be correct e-mail
 * @example ...'|email|'
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
 * Validates if given value ends with given suffix
 * @message Parameter must end with Value
 * @example ...'|ends_with:foo|'
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
 * Validates if given value equals to given parameter
 * @message Parameter must equal to Value
 * @example ...'|equals:foo|'
 * @param value
 * @param param
 * @return {boolean|{value}}
 */
equals(value, param) {
    return String(value) === String(param) || { value: param };
},

/**
 * Validates if given value is in given array
 * @message Parameter is invalid
 * @example ...'|in_array:1,2,a,b,c|'
 * @param value
 * @param arr
 * @return {boolean|{value: string}}
 */
in_array(value, ...arr) {
    return arr.indexOf(String(value)) > -1 || { value: arr.join(',') };
},

/**
 * Validates if given value is valid IP Address
 * @message Parameter must be valid ip adress
 * @example ...'|ip|'
 * @param value
 * @return {boolean|{value}}
 */
ip(value) {
    return ipRegex.test(value) || { value };
},

/**
 * Validates if given value is valid json
 * @message Parameter must be valid json
 * @example ...'|json|'
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
 * Returns error if given value is less than given parameter, if value is not numeric compares string length
 * @message Parameter cant be greater than Value
 * @example ...'|max:20|'
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
 * Returns error if given value is greater than given parameter, if value is not numeric compares string length
 * @message Parameter cant be less than Value
 * @example ...'|min:20|'
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
 * Returns error if given value is less than given parameter  -- compares string length
 * @message Parameter cant be greater than Value
 * @example ...'|max_length:20|'
 * @param value
 * @param max
 * @return {{max}|boolean}
 */
max_length(value, max) {
    if (typeof value === 'string') {
        if (value.length <= max) return true;
    }
    
    return { max };
},

/**
 * Returns error if given value is greater than given parameter -- compares string length
 * @message Parameter cant be less than Value
 * @example ...'|min_length:20|'
 * @param value
 * @param min
 * @return {{min}|boolean}
 */
min_length(value, min) {
    if (typeof value === 'string') {
        if (value.length >= min) return true;
    }
    
    return { min };
},

/**
 * Validates if given value don't equals to given parameter
 * @message Parameter can't be Value
 * @example ...'|not_equals:foo|'
 * @param value
 * @param param
 * @return {boolean|{value}}
 */
not_equals(value, param) {
    return String(value) !== String(param) || { value: param };
},

/**
 * Validates if given value is not in given array
 * @message Parameter cant be Value
 * @example ...'|not_in:1,2,a,b,c|'
 * @param value
 * @param arr
 * @return {boolean|{value}}
 */
not_in(value, ...arr) {
    return arr.indexOf(String(value)) === -1 || { value };
},

/**
 * Validates if given value contains only digits
 * @message Parameter can only contain numbers
 * @example ...'|numeric|'
 * @param value
 * @return {boolean|{value}}
 */
numeric(value) {
    return /^-?\d+$/.test(value) || { value };
},

/**
 * Validates if given value is object
 * @message Parameter must be object
 * @example ...'|object|'
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
 * Validates if given value is valid URl
 * @message Parameter must be valid URL
 * @example ...'|url|'
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
}
```