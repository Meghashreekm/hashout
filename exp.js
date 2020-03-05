var request = require("request");
const express = require('express');
const app = express();
const jwt = require('express-jwt');
var cors = require('cors');
const jwksRsa = require('jwks-rsa');
var token;
var options = {
    method: 'POST',
    url: 'https://dev-opyl157i.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
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
// This route doesn't need authentication
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var jsonRawData = JSON.parse(body);
    token = jsonRawData.access_token;
    console.log("token", token);
    // Authentication middleware. When used, the
    // Access Token must exist and be verified against
    // the Auth0 JSON Web Key Set
   
    
});
app.get('/api/public', function (req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
    console.log("hello public")
});
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-opyl157i.auth0.com/.well-known/jwks.json`,
    }),
    // Validate the audience and the issuer.
    audience: 'https://checker/api',
    issuer: `https://dev-opyl157i.auth0.com/`,
    algorithms: ['RS256'],
});
     
   
    // This route needs authentication
    app.get('/api/private', checkJwt, function (req, res) {
        const token = req.headers.authorization || '';

        var optionss = {
            method: 'GET',
            url: 'https://dev-opyl157i.auth0.com/userinfo',
            headers:{
                authorization: token
            }
          };

          console.log({token});
          
        //   res.json({
        //     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
        // });
          
          request(optionss, function (error, response,body) { 
            if (error) throw new Error(error);
                const userinfo = {};
                console.log({response});
             
            

                console.log({dataaaaaa : response.data});

            //  userinfo.name =   body.user.name;
            //  res.json({
            //       userinfo
            //    });

            res.json({
                message: 'Hello from a private endpoint! You need to be authenticated to see this.'
            });
            console.log("hello private")

          });
        });

        
    
app.listen(3010, function (err) {
    if (err) {
        console.log("unable to strat server");
    }
    else {
        console.log("server started successfully");
    }
});





