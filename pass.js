var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-opyl157i.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"wJIXpy1Cv9YnR4pSu1hsRa10EWToJjV8","client_secret":"E6Ckc8mvzCyfgyOwIFVkyCPEtxZLR8eKKYUZ6TSEJ-p7uHBQrunSk5f4PTpgFjJ_","audience":"https://dev-opyl157i.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
