// const { default: axios } = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const express = require('express');
// const app = express();



// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
// app.get('/', (req, res) => {
//     res.send('Welcome to CORS server 😁')
// })
// app.get('/cors', (req, res) => {
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: 'https://app.chatwoot.com/api/v1/accounts/81256/conversations?status=open&sort_by=last_activity_at',
//         headers: { 
//           'api_access_token': '3QnqCzmLdSTYJFFSjuriLXC5', 
          
//         }
//       };
      
//       console.time(`RESPONSE TIME request `)
//       axios.request(config)
//       .then((response) => {
//         console.log("response sent : ",JSON.stringify(response.data.data.meta.all_count) );
//         res.send(response.data.data.meta)
//         console.timeEnd(`RESPONSE TIME request `)
//       })
//       .catch((error) => {
//         console.log(error);
//         res.sendStatus(2)
//       });

// })

// // parse application/json
// app.use(bodyParser.json());

// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.sendStatus(200);
// });

// app.listen(8081, () => {
//     console.log('Server listening on port 8081')
//   })

const express = require('express');
const app = express();
const cors = require('cors');

let origin_url = 'http://182.69.180.80/';
let port = 8081;
const corsOptions = {
  origin: origin_url
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log('Server running on '+origin_url,"port: "+port);
});
