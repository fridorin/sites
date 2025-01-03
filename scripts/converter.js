const express = require('express');
const blockDirectAccess = require('./tools/instruments.js');

const converterApp = express();
converterApp.set('view engine', 'ejs');
converterApp.set('views', './sites/errors');
converterApp.use('/errors', express.static('./sites/errors'));
converterApp.use(blockDirectAccess);
converterApp.use('/', express.static('./sites/converter')).use('/', express.static('./sites/converter/pages'));
converterApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

module.exports = converterApp;