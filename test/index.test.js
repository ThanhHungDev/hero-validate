import V from "../src/index"

V.setMessages({
    name: {
        required: 'đây là reqquire',
        min: 'Đây là min'
    },
    required: 'required override message',
    min: 'validator got parameter :min and value :value'
});

it('should validate an object', () => {
    const data = {
        name: "gdgfd",
      age: "hung",
    };
  
    const scheme = {
      name: 'required|min:30',
      age: 'numeric',
    };
  
    let eror = V.validate(data, scheme)
    console.log( JSON.stringify(eror) )
    expect(eror.hasError).toBe(true);
});
