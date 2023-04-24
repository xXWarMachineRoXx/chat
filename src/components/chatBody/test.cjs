const axios = require('axios');
let data = '{"email" :"john@acme.inc",\r\n "password" : "Password1!"}';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://192.168.1.80:3000//auth/sign_in',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'Cookie': '__profilin=p%3Dt'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data,null,1));
})
.catch((error) => {
  // console.log(error);
  console.log(error.response.data.errors)
});
