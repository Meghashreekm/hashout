var express = require('express');
const queries=require('../db/dbfunction')

class UserInfo{
 getCrawlerHistory(){
     const Users = new queries();
     const infos = Users.getcrawler();
     return infos;
     
  }
  
}



module.exports = UserInfo

