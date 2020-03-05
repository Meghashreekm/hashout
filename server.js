const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-opyl157i.auth0.com",
  audience: "https://checker/api"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-opyl157i.auth0.com/.well-known/jwks.json`,
    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qUTJORVF4UWtNNU5FWXlNRFpETXpkQ05EUXhNamN4TlRaRk5qY3hRVVZHTmpReE1VUTJOZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1vcHlsMTU3aS5hdXRoMC5jb20vIiwic3ViIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2hlY2tlci9hcGkiLCJpYXQiOjE1ODE1NjY4NTUsImV4cCI6MTU4MTY1MzI1NSwiYXpwIjoiMTJRcE5GdlVNeVZFcVlNUHVJTmJzY1dsNjgxS1k5ZjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.vDpJKbdpLG_B9TlUwVVqFzuzEOqRyTSxdYwUCeKsiz2SvYy6uAXjWoXp1CtxMttMUBKv4_mcJpfacdk3b9DwSEVEb8lbztzAZ6EJ_sSZPkSw1nALFP7_IiYW9qBvbbMziUUyoeCEAENK2v-1bn8zgkYv_MGEpbAQNGRMzLXEeLQT1sjnB8t2NcD6TX49JpQE_PcJxqVM7nIl9MU_k1Gb7sOfXJBV0bDg0xZYH4BbQuPCvyvpRhyUJnbcbAPJuRDSx3usmoxb1F-pj2gQ-IN8ZkFaDPfLwQp1GwxRfDe4E48DBGssrefTIh1HGb0o2uU7JEAOGXI_4WXHDBvTKLn1Ew",
    token_type: "Bearer",
  }),

  //audience: authConfig.audience,
  issuer: `https://dev-opyl157i.auth0.com/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));