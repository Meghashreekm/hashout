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
  token = jsonRawData.access_token;
  //console.log(body);
 /*if(token!=null)
  {
   // fn();
    

  }*/
app.use((req,res,next)=>{
  if(req.body.token){
    next();
  }else{
    res.send('You are not allowed to access this');
  }
})
});


app.post('/login',(req,res)=>{
  // match the credentials
  if (req.body.name === options.form.username && req.body.password === options.form.password) {
    res.json({ success: true, token: token })
}
else {

    res.json({ success: false, token: null })
}
})

/*async function fn() {
  //let data = await clients.query("select $1:org_id from Users where username=$2",['johndeo'] );
  var data = await clients.query("select org_id from Users " );
//console.log(data);
}*/
app.get('/dashboard', async(req, res) => {
  const results = await clients.query("select * from Job_Run_History  ")
  res.send(results.rows);
})

app.post('/source',(req,res)=>{
  var sourcename=req.body.sourcename;
  var active=req.body.active;
  var sourceurl=req.body.sourceurl;
  var x_path=req.body.x_path;
  var in_page_anchors=req.body.in_page_anchors;
  var group_links_type=req.body.group_links_type;
  var redirect_capturing=req.body.group_links_type;
  var startdate=req.body.startdate;
  var freq=req.body.cron;
  var multiple=req.body.multiple;


  console.log("Source name = "+ sourcename +", sourceurl is "+sourceurl+",active is "+active +",x_path is "+x_path+",in_page_anchors is "+in_page_anchors);
  res.json({success:true,data:"DONE"});//sending to postman
  
});

app.get('/graph',(req,res)=>
{
  var sourcename=req.body.sourcename;
  var brokenlinks=req.body.brokenlinks;
});


/*async function fn(){
  
  try{
    
    let data = await clients.query("select id from org");
    console.log(data);

  }
  catch(err){
    return 'error';
  }
}*/

app.listen(port, err => {
  if (err) {
      console.log('Error in starting node server: ', port);
  } else {
      console.log('Node server started successfully on port: ', port);
      clients.connect()
          .then(result => {
              console.log('Connected to database successfully');
          })
          .catch(err => {
              console.log('Error in connecting to database: ', err);
          })
  }
});


/* add source= crawler source, add scheduler=scheduler
 job,dashboard of first page= job run history, 
broken link type=crawler results*/