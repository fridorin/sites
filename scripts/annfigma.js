const express = require('express');
const blockDirectAccess = require('./tools/instruments.js');

const annfigmaApp = express();
annfigmaApp.set('view engine', 'ejs');
annfigmaApp.set('views', './sites/errors');
annfigmaApp.use('/errors', express.static('./sites/errors'));
annfigmaApp.use(blockDirectAccess);
annfigmaApp.use('/', express.static('./sites/annfigma')).use('/', express.static('./sites/annfigma/pages'));
annfigmaApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

module.exports = annfigmaApp;