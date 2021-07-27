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

/// you can setting locale for support 2 language : en - vi 
Validation.setLocale(Validation.languages.vi)

const data = {
  name    : 'Trương Thanh Hùng Đẹp Trai',
  email   : 'truongpham260620gmail.com',
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

## React Validation

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
