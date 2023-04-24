const axios = require('axios');
let data = '{\r\n "email" :rijul.179303112@muj.manipal.edu,\r\n "password" : Password@151\r\n}';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://app.chatwoot.com/auth/sign_in',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
