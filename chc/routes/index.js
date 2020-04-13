const express = require('express');
const mainRoute = require('./auth0');
const sourceRoutes = require('./source');
const crawlerRoutes = require('./crawlerHistory');
const dashboardRoutes = require('./dashboard');
const sourcenameRoutes = require('./sourcename');
const cron = require('../cronFunction')
const app = express();
app.use('/', mainRoute);
app.use(sourceRoutes);
app.use(crawlerRoutes);
app.use(dashboardRoutes);
app.use(sourcenameRoutes);
app.use(cron);
module.exports = app;