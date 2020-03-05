// server.js

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
    jwksUri: `https://dev-opyl157i.auth0.com/.well-known/jwks.json`,
    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qUTJORVF4UWtNNU5FWXlNRFpETXpkQ05EUXhNamN4TlRaRk5qY3hRVVZHTmpReE1VUTJOZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1vcHlsMTU3aS5hdXRoMC5jb20vIiwic3ViIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2hlY2tlci9hcGkiLCJpYXQiOjE1ODE1NjY4NTUsImV4cCI6MTU4MTY1MzI1NSwiYXpwIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.vDpJKbdpLG_B9TlUwVVqFzuzEOqRyTSxdYwUCeKsiz2SvYy6uAXjWoXp1CtxMttMUBKv4_mcJpfacdk3b9DwSEVEb8lbztzAZ6EJ_sSZPkSw1nALFP7_IiYW9qBvbbMziUUyoeCEAENK2v-1bn8zgkYv_MGEpbAQNGRMzLXEeLQT1sjnB8t2NcD6TX49JpQE_PcJxqVM7nIl9MU_k1Gb7sOfXJBV0bDg0xZYH4BbQuPCvyvpRhyUJnbcbAPJuRDSx3usmoxb1F-pj2gQ-IN8ZkFaDPfLwQp1GwxRfDe4E48DBGssrefTIh1HGb0o2uU7JEAOGXI_4WXHDBvTKLn1Ew",
  token_type: "Bearer",

  }),

  // Validate the audience and the issuer.
  audience: 'https://checker/api',
  issuer: `https://dev-opyl157i.auth0.com/`,
  algorithms: ['RS256']
});
// server.js

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  

  
  // This route needs authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });
  var options = { method: 'POST',
  url: 'https://dev-opyl157i.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"12QpNFvUMyVEqYMPuINbscWl681KY9f7","client_secret":"VuRuIONktUU73_HSITr3nNdLUhKzNZPp9ChGENB0PtYU0_6vnkrQaztjVgFfCcli","audience":"https://checker/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
var options = { method: 'GET',
  url: 'http://localhost:3010/api/private',
  headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qUTJORVF4UWtNNU5FWXlNRFpETXpkQ05EUXhNamN4TlRaRk5qY3hRVVZHTmpReE1VUTJOZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1vcHlsMTU3aS5hdXRoMC5jb20vIiwic3ViIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2hlY2tlci9hcGkiLCJpYXQiOjE1ODE2NzIyNjksImV4cCI6MTU4MTc1ODY2OSwiYXpwIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.OAF5lvZmE4LIDEbstBaLaAKgyhJKEgQXynFflAzrwtDrlfZVd1RUF7pDVPBzNhc5ROp0GJJG6qpN-MhqrZNnFCITWX-sdsfouzHr_FsKsggX77ABxG0O8sQs3pWzdAW5JpLgW75fTubkcuWn-MD-SwOdwi89aW7IUVwzN5YdJXw8Zy9gDl0nVkb6RCMSCYim7Zw9ICcnfObsZKU8cMG_2XXuwUfzJsepw3H7PjrROZIqHgmdmDpkh61z9mo0nh9LlOtKv-c8743rp_NNtTNgVDB5Db7KjjsC7sbZ_t5Yemw5GCKFp4csKw_sddTAJcFVKk4FCuIUfPcKWFjjsC4D8A' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
  app.listen(3010, function (err) {
    
    if (err) {
        console.log("unable to strat server");

    }
    else {
        console.log("server started successfully");
    }
});