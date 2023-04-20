const { default: axios } = require('axios');
const { time } = require('console');
const express = require('express');
const app = express();


let data= {
    "first": [1,2,3],
    "second": [4,5,1],
    "third": [6,7,8]
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})
app.get('/cors', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://app.chatwoot.com/api/v1/accounts/81256/conversations?status=open&sort_by=last_activity_at',
        headers: { 
          'api_access_token': '3QnqCzmLdSTYJFFSjuriLXC5', 
          
        }
      };
      
      console.time(`RESPONSE TIME request `)
      axios.request(config)
      .then((response) => {
        console.log("response sent : ",JSON.stringify(response.data.data.meta.all_count) );
        res.send(response.data.data.meta)
        console.timeEnd(`RESPONSE TIME request `)
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(2)
      });

})

app.post('/', (req, res) => {
    console.log(req.body)
})
app.listen(8081, () => {
    console.log('listening on port 8081')
})