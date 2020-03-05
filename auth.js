var request = require("request");
var token;
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

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var jsonRawData = JSON.parse(body);
  token= jsonRawData.access_token;
  console.log(token)
});
