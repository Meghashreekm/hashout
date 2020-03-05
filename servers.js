const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
var request = require("request");


// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-opyl157i.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://checker/api',
  issuer: 'https://dev-opyl157i.auth0.com/',
  algorithms: ['RS256']
});
// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  var options = {
    method: 'POST',
    url: 'https://dev-opyl157i.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      grant_type: 'client_credentials',
      client_id: '12QpNFvUMyVEqYMPuINbscWl681KY9f7',
      client_secret: '12QpNFvUMyVEqYMPuINbscWl681KY9f7',
      audience: 'https://checker/api'
    }
  };
  
 /* request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });*/
  // This route needs authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });
  // server.js

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});
/*var options = {
    method: 'POST',
    url: 'https://dev-opyl157i.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      grant_type: 'client_credentials',
      client_id: '26YfOo47rHiM7N4OA3scmQw03s3uiMyq',
      client_secret: 'ksauBandV0UO_xDyOP2_LvteWX4XRrHTQqqO0o4AZDXa4oKbtfkR6T5pCA8hOgUI',
      audience: 'https://checker/api'
    }
  };*/
  var options = {
    method: 'GET',
    url: 'http://localhost:3010/api/private',
    headers: {authorization: 'Bearer 8Rzn5umKKCDCnn9liJiMeM3fNok6jJ0I'}
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log("error");
  });
app.listen(3010, function (err) {
    
    if (err) {
        console.log("unable to strat server");

    }
    else {
        console.log("server started successfully");
    }
});
//https://manage.auth0.com/dashboard/us/dev-opyl157i/applications/12QpNFvUMyVEqYMPuINbscWl681KY9f7/quickstart