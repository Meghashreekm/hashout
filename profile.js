var request = require('request');
var options = {
 'headers': {
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qUTJORVF4UWtNNU5FWXlNRFpETXpkQ05EUXhNamN4TlRaRk5qY3hRVVZHTmpReE1VUTJOZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1vcHlsMTU3aS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8YWJjIiwiYXVkIjoiaHR0cHM6Ly9jaGVja2VyL2FwaSIsImlhdCI6MTU4Mjc4NDE4MSwiZXhwIjoxNTgyODcwNTgxLCJhenAiOiJ3SklYcHkxQ3Y5WW5SNHBTdTFoc1JhMTBFV1RvSmpWOCIsImd0eSI6InBhc3N3b3JkIiwicGVybWlzc2lvbnMiOlsiY3JlYXRlIiwiY3JlYXRldXNlciIsImRlbGV0ZSIsInJlYWQiLCJ1cGRhdGUiXX0.DgU7y4xzAuBM8J-k-BqowkYpenzCLkpKQ1PkCI609tbh51KX8XayjTPbEtCafIpSnYmqCTdmk-7HLDBBnsKj0BD21mW2U8rgC2fxo5zJlgiwsHvOF0CB18Hq2VSEzOyEHvkOCIu9gA1yhPPvtOGXq3gkv_xTKQj-Y7wqH1deoGSeHeJ4oGCtAIM7bf6mN0hGh0r6JzF0pgS4jSqCQH_n_fFmwLwbveeSFv95D7i_M1_XGe_G_Olc-nVnyhsuOIB72yS9ZNLWB5ZrneKlCf-Q_4tccyjB68wg4iWSgfJKqzDc2uqzjxQmAZ83SMn7W5b6OCWjYdI78swFdrYYeJxi2g'
  },  'method': 'GET',
  'url': 'localhost:3000/dev-opyl157i.auth0.com/userinfo',
 
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
