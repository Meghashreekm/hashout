const { Client } = require('pg')
const http = require("http");

require("dotenv").config();

let dbPort= process.env.DB_PORT;
let dbUser = process.env.DB_USER;
let dbPassword= process.env.DB_PASSWORD;
let dbDatabase= process.env.DB_DATABASE;
const client = new Client({
    "port": `${dbPort}`,
    "user": `${dbUser}`,
    "password": `${dbPassword}`,
    "database": `${dbDatabase}`,
});

module.exports=client;



