const router = require("express").Router();
const sourceName = require('../models/sourcename.js');
const checkJwt = require('../middleware/auth0Check');


router.post('/sourcename',checkJwt, async function(req, res) {
    let sourcename = req.body.source
    const sname = new sourceName();
    let info = sname.getSourcename(sourcename);
    info.then((info) => {
        console.log('data is ', info);
        res.send(info)


    });


});


module.exports = router;