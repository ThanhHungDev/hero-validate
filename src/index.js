export * as default from './Validator';




// var V = require('./Validator');



// const message = {
//     password: ":name failure...",
//     mycustom: "try turn off mycustom"
// }

// V.setMessages(message);
// V.setLocale(V.languages.vi)

// const data = {
//     password: 'hungff',
//     confirm_password: "fdsfd",
// }

// /// create rule for your form
// const rules = {
//     password     : "required|min_length:7|max_length:100",
//     confirm_password : {
//         required: true,
//         mycustom: function (value) {
//             if (value !== data.password) {
//                 return {}; /// try return {} or string 
//                 // return "Password confirm is incorrect"
//             }
//             return true;
//         },
//     },
// };

// let result = V.validate(data,  rules)
// console.log( JSON.stringify(result)  ) 

