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
    password     : "required|min:6|max:100",
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
    ...
});

var V = require('./Validator');

V.setMessages({
  name: {
      required: 'this is reqquire my custom :D',
      min: ':name min error rule :min'
  },
  required: 'required override message',
  min: 'validator got parameter :min and value :value'
});
/// you can setting locale for support 2 language : en - vi 
V.setLocale(V.languages.vi)

const data = {
  name    : 'Trương Thanh Hùng Đẹp Trai',
  email   : 'truongpham260620@gmail.com',
  password: 'ahihi@123',
};

const result = Validator.validate(
  data,
  rules,
);

// Get if validate returned error
result.hasError; // Boolean

// Get errors object
result.errors; // Object

// Get if given field has error
result.isError('name'); // Boolean

// Get if given field has error of given validation rule
result.isError('name', 'max'); // Boolean
result.isError('name', 'mycustom'); // Boolean
// Note: you cant get whether inline function passed validation or not

// Get first validation error message of field
result.getError('name', '-'); // will join error string by - character. Default join string error by `,`

// Get all validation error messages of field
result.getAllError('name', "|"); // will join error string by | character. Default join string error by `,`
```
