const router = require("express").Router();
const dashInfo = require('../models/dashboard.js');
const checkJwt = require('../middleware/auth0Check');

router.get('/dashboard',checkJwt,async function(req,res){

    const dash = new dashInfo();
    let re = dash.getDashboard();
    re.then((re)=>{
        console.log('data is ', re);
        res.send(re);


    });


});

module.exports=router;