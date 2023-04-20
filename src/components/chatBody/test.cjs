const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://app.chatwoot.com//api/v1/accounts/81256/conversations?status=open&sort_by=last_activity_at',
  headers: { 
    'api_access_token': '3QnqCzmLdSTYJFFSjuriLXC5', 
    
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});