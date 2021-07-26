// export * as default from './Validator';
// export * as default from './Validator';


var V = require('./Validator');

V.setMessages({
    name: {
        required: 'đây là reqquire',
        min: 'Đây là min'
    },
    required: 'required override message',
    min: 'validator got parameter :min and value :value'
});
V.setLocale(V.languages.vi)

const data = {
    name: "gdgfd",
    age: "hung",
};

const scheme = {
    name: 'required|min:30|max:35',
    age: 'numeric|min:2',
};

let eror = V.validate(data, scheme)
console.log( JSON.stringify(eror), V.languages.vi ) 
