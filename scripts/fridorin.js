const express = require('express');
const blockDirectAccess = require('./tools/instruments.js');

const fridorinApp = express();
fridorinApp.set('view engine', 'ejs');
fridorinApp.set('views', './sites/errors');
fridorinApp.use('/errors', express.static('./sites/errors'));
fridorinApp.use(blockDirectAccess);
fridorinApp.use('/', express.static('./sites/fridorin')).use('/', express.static('./sites/fridorin/pages'));
fridorinApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

module.exports = fridorinApp;