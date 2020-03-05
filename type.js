var request = require("request");
//var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;
var cors = require('cors');
//var data = require('./test');
const { Client } = require('pg');
//app.use(cors());
app.use(bodyParser.json())
const clients = new Client({
    "port": 5432,
    "user": "postgres",
    "password": "sona2002",
    "database": "project",
})
app.get('/brokenlinktype', async(req, res) => {
  const results = await clients.query("select * from ur dbname  ")
  res.send(results.rows);
})