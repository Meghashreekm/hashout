const router = require("express").Router();
const UserInfo = require('../models/crawlerHistory.js');
const checkJwt = require('../middleware/auth0Check');


router.get('/crawlerHistory',checkJwt, async function (req, res) {
    const User = new UserInfo();
    let info = User.getCrawlerHistory();
    info.then((info)=>{
        console.log('data is ', info);
        res.send(info);


    });


});


module.exports=router;