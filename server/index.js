const axios = require('axios');
const bodyParser = require('body-parser');
// const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config()


//requests counter
let requests_count = 1

//cors setup  
// allowed origins : all for now
// TO DO : change to specific origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//pretty json
app.set('json spaces', 2)

//** */
//** routes */
//** GET /conversations */
//** get all conversations   */
//** */

app.get('/conversations', (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.host_url + '/api/v1/accounts/2/conversations?status=open&sort_by=last_activity_at',
    headers: {
      'api_access_token': process.env.api_access_token,
    }
  };
  console.log('\n========= Conversations ============\n\n')
  console.time(`RESPONSE TIME request`)

  axios.request(config)
    .then((response) => {
      console.log("response  sent (consolidated keys) : ", Object.keys(response.data.data));
      res.send(response.data.data)

      requests_count++;
      console.log('\n=======================================\n\n')


    })
    .catch((error) => {
      // console.error(error.data);
      res.sendStatus(2)
    });
  console.timeEnd(`RESPONSE TIME request`)
  console.log("request count : ", requests_count)

})


//** */
//** routes */
//** GET  conversations/meta */
//** get all conversations meta info */
//** */

app.get('/conversations/meta', (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.host_url + '/api/v1/accounts/2/conversations/meta',
    headers: {
      'api_access_token': process.env.api_access_token,

    }
  };
  console.log('\n========= Conversations/meta ============\n\n')
  console.time(`RESPONSE TIME request`)

  axios.request(config)
    .then((response) => {
      console.log("response sent : ", JSON.stringify(response.data.meta));
      res.send(response.data.meta)
      requests_count++;
      console.log('\n===========Conversations/meta==========\n\n')
    })
    .catch((error) => {
      console.log('\n===========ERROR : (Conversations/meta) ==========\n\n')
      console.log(error);
      res.send(error)
      console.log('\n===========ERROR : (Conversations/meta) ==========\n\n')
      // res.sendStatus(2)
    });
  console.timeEnd(`RESPONSE TIME request`)
  console.log("request count : ", requests_count)

})


//***/
//** routes */
//** GET  conversations/:conversationId/messages */
//** get specific conversations messages  */
//** */

app.get('/conversations/:conversationId/messages', (req, res) => {
  // Extract the conversation ID from the request parameters
  const conversationId = req.params.conversationId;

  // Extract any additional query parameters from the request
  const after = req.query.after;

  // TODO: Use the conversationId and after parameters to fetch the appropriate messages
  // and return them in the response
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.host_url + '/api/v1/accounts/2/conversations/' + conversationId + '/messages?after=0',
    headers: {
      'api_access_token': process.env.api_access_token,
    }
  };

  console.time(`conversations/:conversationId/messages request`)

  axios.request(config)
    .then((response) => {
      console.log('\n========= Conversations/' + conversationId + '/messages============\n\n')
      res.send(response.data);

      requests_count++;
      console.log("consolidated keys:", Object.keys(response.data))
      console.log("requests count :", requests_count)
      console.timeEnd(`conversations/:conversationId/messages request`)

      console.log('\n=======================================\n\n')




    })
    .catch((error) => {
      console.log('\x1b[31m%s\x1b[0m', '\n===========ERROR : (Conversations/' + conversationId + '/messages) ==========\n\n');
      console.error(" Error Message: ", error.message);
      console.error('\x1b[33m', "Probable Cause :  route : /conversations/:conversationId=" + conversationId + " does not exist", "\x1b[0m",);
      console.error(" Method: ", error.config.method);

      console.error(' Request Url: ', error.request.path);
      console.error(" Redirected Url: ", error.config.url);

      console.error(" Error Code: ", error.code);
      console.error(" Headers :\n", error.config.headers);
      // console.error("Error Data:",error.data);
      console.log('\x1b[31m%s\x1b[0m', '\n===========ERROR : (Conversations/' + conversationId + '/messages) ==========\n\n');




    });

});




app.post('/conversations/:conversationId/messages/', (req, res) => {
  console.log("req",req.body)
  // Extracts conversationId request
  const conversationId = req.params.conversationId;

  // Extract any additional query parameters from the request
  const after = req.query.after;

  let data = JSON.stringify(req.body);


  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.host_url+'/api/v1/accounts/2/conversations/'+conversationId+'/messages',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': process.env.api_access_token,
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error);
    });

});

// parse application/json
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(8081, () => {
  console.log('Server listening on port 8081')
})

