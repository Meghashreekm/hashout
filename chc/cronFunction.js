const queries = require('./db/dbfunction')
const cron = require("node-cron");
class kron {
    data(x, ids, url) {
        const orgId = 'trew';
        const User = new queries();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        date = date + ' ' + time;

        console.log(date);
        cron.schedule(x, async function() {
            // console.log('hello')
            var spawn = require("child_process").spawn;
            var childProcess = spawn('python3', [
                'main.py', ids, date
            ]);
            childProcess.stdout.pipe(process.stdout);
            childProcess.stderr.pipe(process.stderr);
            childProcess.stdin.pipe(process.stdin);
            childProcess.stdout.pipe(process.stdout);
            childProcess.on('exit', async function() {
                const broken_links_404 = await User.getInfo('404', ids, date);
                const broken_anchor = await User.getInfo(' broken anchor', ids, date);
                const total_links = await User.getTotalLinks(ids, date);
                const other_issue = await User.getOtherLinks(ids, date)
                   
                var broken_links = Number(broken_anchor.rows[0].sum) + Number(broken_links_404.rows[0].sum);
                
                const pages_crawled = await User.getpageCrawled(ids, date);
                var active_links = Number(total_links.rows[0].count) - broken_links - Number(other_issue.rows[0].count);
                await User.insertJobRun(ids, url, date, Number(pages_crawled.rows[0].count), Number(total_links.rows[0].count), active_links, broken_links, orgId)
                    
            })
        });
    }
}
module.exports = kron;