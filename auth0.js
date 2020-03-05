var request = require("request");
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var app = express()


var token;
app.post('/api/login', (req, res) => {
var options = {
  method: 'POST',
  url: 'https://dev-opyl157i.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'password',
    username: 'johndoe',
    password: 'Test1234',
    audience: 'https://checker/api',
    scope: 'read:sample',
    client_id: 'wJIXpy1Cv9YnR4pSu1hsRa10EWToJjV8',
    client_secret: 'E6Ckc8mvzCyfgyOwIFVkyCPEtxZLR8eKKYUZ6TSEJ-p7uHBQrunSk5f4PTpgFjJ_'
  }
};
jwt.sign({options}, 'secretkey', (err, token) => {
 
  res.json({
    token
  });
});



request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var jsonRawData = JSON.parse(body);
  token= jsonRawData.access_token;
  console.log("token",token);

});
});
app.post('/login', validateToken, (req, res) => {  
 jwt.verify(req.token, 'secretkey', (err, authData) => {
   //console.log("loook",req.token)
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
  console.log("hello");
});




//app.use(validateToken);
function validateToken(req,res,next){
  console.log("validating Token")
  //console.log('request headers: ',req.headers);
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  //console.log('bearerHeader: ',bearerHeader);
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
   // console.log("bearer:",bearerToken);
    // Set the token
    req.token = bearerToken;
   // console.log("req.token:",req.token);

    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
app.listen(3004, err => {
    if (err) {
        console.log('unable to start server:', err);
    } else {
        console.log('Server started successfully on port 3004');
    }
})
