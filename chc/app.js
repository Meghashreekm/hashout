const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./db/db.js')
const bodyParser = require('body-parser');
const index = require('./routes/index');
app.use(cors());
app.use(bodyParser.json());
app.use(index);
const port=process.env.PORT

app.listen(`${port}`, err => {
    if (err) {
        console.log('Error in starting node server: ', `${port}`);
    } else {
        console.log('Node server started successfully on port: ', `${port}`);
        client.connect()
            .then(result => {
                console.log('Connected to database successfully');
            })
            .catch(err => {
                console.log('Error in connecting to database: ', err);
            })
    }
});