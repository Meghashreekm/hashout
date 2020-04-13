const router = require("express").Router();
const checkJwt = require('../middleware/auth0Check');
const UserInfo = require('../models/auth0.js');

router.get('/api/private', checkJwt, function (req, res) {
    const token = req.headers.authorization || '';
    const User = new UserInfo();
    let data = User.getUserInfo(token);
    data.then(({data}) => {
      res.send(data)
        

    User.getOrgid(data);
  }); 
 
});


  module.exports=router;
