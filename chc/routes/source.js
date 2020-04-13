const router = require("express").Router();
const SourceInfo = require('../models/source.js');
var uuid = require('uuid');
const checkJwt = require('../middleware/auth0Check');

router.post('/source',checkJwt, async function(req, res) {
    const source = new SourceInfo();
    const org = 'trew'
    source_id = uuid.v4();
    let response = {
        url_type: req.body.form.url_type, // values of box
        url: req.body.form.url, //source link
        sourceurl: req.body.form.source, // contains or equals
        xpath: req.body.form.xpath, // contains or not contains
        xpath_type: req.body.form.xpath_type, //values of box
        cron: req.body.form.cronExpression,
        broken_anchors: req.body.form.broken_anchors,
        group_links: req.body.form.group_links,
        redirects: req.body.form.redirects,
    }
    let result = await source.postSource(source_id, response.sourceurl, response.url_type, response.xpath_type, response.broken_anchors, response.group_links, response.redirects, org, response.url, response.xpath, response.cron)
        

})
module.exports = router;