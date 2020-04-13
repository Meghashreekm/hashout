var express = require('express');
const queries = require('../db/dbfunction')

class sourceName {

    async getSourcename(sourcename) {
        const User = new queries();
        const orgId = 'trew'
        const sourceInfo = await User.getsourceName(orgId, sourcename);
        let ids = sourceInfo.rows[0].sourceid
        let cdate = sourceInfo.rows[0].lastrun
        const broken_links_404 = await User.getInfo('404', ids, cdate);
        const broken_anchor = await User.getInfo(' broken anchor', ids, cdate);
        const total_links = await User.getTotalLinks(ids, cdate);
        const other_issue = await User.getOtherLinks(ids, cdate);
        const date = await User.extractDates(ids);
        const month = await User.extractMonths(ids);
        const year = await User.extractYears(ids);
        const broken_link_table = await User.getbrokenLinks(ids, cdate);
        const broken_link_table_2 = await User.getbrokenLinks2(ids, cdate);
        let obj = {
            broken_links_404: broken_links_404,
            broken_anchor: broken_anchor,
            total_links: total_links,
            other_issue: other_issue,
            date: date.rows,
            month: month.rows,
            year: year.rows,
            broken_link_table: broken_link_table.rows,
            broken_link_table_2: broken_link_table_2.rows,
        }

        return obj;


    }
}

module.exports = sourceName;