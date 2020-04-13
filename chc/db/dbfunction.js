var express = require('express');
const client = require('./db.js')

class queries {
    /**
     * 
     * @param {String} org 
     * @param {String} sourcename 
     */
    async getsourceName(org, sourcename) {
        let nameSource = await client.query("select sourceid,lastrun from job_run where org_id=($1) and sourceurl=($2) order by lastrun desc limit 1", [org, sourcename])
        return nameSource;
    }

    /**
     * 
     * @param {String} orgId 
     */

    async getSource(orgId) {
        const source = await client.query("select sourceid,lastrun from job_run where org_id=($1) order by lastrun desc limit 1", [orgId])
        return source;
    }

    /**
     * 
     * @param {String} orgId 
     */
    async getsname(orgId) {
        const source = await client.query("select sourcename from crawler_source where org_id=($1)", [orgId])
        return source;
    }

    
    async getcrawler() {
        const crawlerInfo = await client.query("select sourceurl,lastrun,broken_links,pages_crawled from Job_Run where org_id='trew' ")

        return crawlerInfo.rows;
    }

    /**
     * 
     * @param {String} x 
     * @param {uuid} ids 
     * @param {string} cdate 
     */
    async getInfo(x, ids, cdate) {
        const result = await client.query(`select sum(total) from (select count(*) as total from crawler_result inner join url on url.id=crawler_result.id where crawler_result.link_status=($1) and source_id=($2) and crawler_result.startdate=($3) group by url.link, url.id) crawler_result`, [x, ids, cdate]);
        return result;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} cdate 
     */
    async getTotalLinks(ids, cdate) {
        const total_links = await client.query("select count(*) from crawler_result where source_id=($1) and startdate=($2)", [ids, cdate]);
        return total_links;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} cdate 
     */
    async getOtherLinks(ids, cdate) {
        const other_issue = await client.query("select count(*) from crawler_result where source_id=($1) and startdate=($2) and link_status in ('ConnectionError','broken anchor','SSLError','ReadTimeout')", [ids, cdate]);
        return other_issue;

    }

    /**
     * 
     * @param {uuid} ids 
     */
    async extractDates(ids) {
        const query = await client.query('select broken_links,EXTRACT(day from lastrun) as date FROM job_run where sourceid=($1)', [ids]);
        return query;
    }
     /**
     * 
     * @param {uuid} ids 
     */
    async extractMonths(ids) {
        const query = await client.query('select broken_links,EXTRACT(month from lastrun) as date FROM job_run where sourceid=($1)', [ids]);
        return query;
    }

     /**
     * 
     * @param {uuid} ids 
     */
    async extractYears(ids) {
        const query = await client.query('select broken_links,EXTRACT(year from lastrun) as date FROM job_run where sourceid=($1)', [ids]);
        return query;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} cdate 
     */
    async getbrokenLinks(ids, cdate) {
        const broken_link_table = await client.query("select url.link,count(*) from crawler_result inner join url on url.id=crawler_Result.id where crawler_result.source_id=($1)and crawler_result.startdate=($2) and link_status in ('broken anchor','404') group by url.link,url.id ORDER BY count desc limit 10", [ids, cdate])
        return broken_link_table;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} cdate 
     */
    async getbrokenLinks2(ids, cdate) {
        const broken_link_table_2 = await client.query("select link, count(*) from crawler_result where link_status in ('404','broken anchor')  and  source_id=($1) and startdate =($2) group by link ORDER BY count desc limit 10 ", [ids, cdate])
        return broken_link_table_2;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} cdate 
     */
    async getpageCrawled(ids, date) {
        const pages_crawled = await client.query("select count(*) from url where sourceid=($1) and startdate=($2)", [ids, date]);
        return pages_crawled;
    }

    /**
     * 
     * @param {uuid} ids 
     * @param {String} url 
     * @param {String} date 
     * @param {Integer} pages_crawled 
     * @param {Integer} total_links 
     * @param {Integer} active_links 
     * @param {Integer} broken_links 
     * @param {String} orgId 
     */
    async insertJobRun(ids, url, date, pages_crawled, total_links, active_links, broken_links, orgId) {
        client.query("BEGIN")
        await client.query('INSERT into job_run(sourceid,sourceurl,lastrun,pages_crawled,total_links,active_links,broken_links,org_id) values ($1,$2,$3,$4,$5,$6,$7,$8)', [ids, url, date, pages_crawled, total_links, active_links, broken_links, orgId]);
        client.query("COMMIT");
    }

    /**
     * 
     * @param {uuid} source_id 
     * @param {String} sourceurl 
     * @param {String} url_type 
     * @param {String} xpath_type 
     * @param {Boolean} broken_anchors 
     * @param {Boolean} group_links 
     * @param {Boolean} redirects 
     * @param {String} org 
     * @param {String} url 
     * @param {String} xpath 
     */
    async insertCrawlerSource(source_id, sourceurl, url_type, xpath_type, broken_anchors, group_links, redirects, org, url, xpath) {
        client.query("BEGIN");
        await client.query('INSERT into crawler_source(sourceid,sourcename,active,sourceurl,x_path,in_page_anchors,group_link_type,redirect_capturing,org_id,url_type,xpath_type) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [source_id, sourceurl, true, url_type, xpath_type, broken_anchors, group_links, redirects, org, url, xpath]);
        client.query("COMMIT");
    }

    /**
     * 
     * @param {uuid} source_id 
     * @param {String} sourceurl 
     * @param {String} cron 
     * @param {String} orgId 
     */
    async insertScheduledJobs(source_id, sourceurl, cron, orgId) {
        await client.query('INSERT into Scheduled_Jobs(sourceid,sourceurl,cron,org_id) values ($1,$2,$3,$4)', [source_id, sourceurl, cron, orgId]);
        client.query("COMMIT");
    }

    /**
     * 
     * @param {String} username 
     * @param {String} email 
     * @param {String} org 
     */
    async userInfo(username, email, org) {
        client.query("BEGIN")
        client.query('SELECT userid FROM users WHERE "email"=$1', [email], function(err, result) {
            if (result.rows[0]) {
                console.log("user already exits");

            } else {
                client.query('INSERT into users (username,email,org_id) values ($1,$2,$3)', [username, email, org],
                    function(err, result) {
                        if (err) { console.log(err) } else {
                            client.query("COMMIT")
                        }
                    });

            }
        })

    }
}

module.exports = queries;