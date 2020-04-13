var express = require('express');
const queries = require('../db/dbfunction')
const cronClass = require('../cronFunction')
var urls = '';
var crons = '';
var ids = '';
class SourceInfo {
    async postSource(source_id, sourceurl, url_type, xpath_type, broken_anchors, group_links, redirects, org, url, xpath, cron) {
        cron = cron === null ? '43 12 */1 * *' : cron;
        console.log(arguments);
        const User = new queries();

        ids = source_id;
        urls = sourceurl;

        crons = String(cron);
        console.log(cron);
        const cronFunc = new cronClass();
        cronFunc.data(crons, ids, urls);
        await User.insertCrawlerSource(source_id, sourceurl, url_type, xpath_type, broken_anchors, group_links, redirects, org, url, xpath);
        await User.insertScheduledJobs(source_id, sourceurl, cron, org);
        
    }
}
module.exports = SourceInfo;