import express from 'express';
import path from 'path';
import fs from 'fs';

const fridorinApp = express();

fridorinApp.set('view engine', 'ejs');
fridorinApp.set('views', path.resolve('sites/errors'));
fridorinApp.use('/errors', express.static(path.resolve('sites/errors')));

fridorinApp.use((req, res, next) => {
    const referer = req.get('Referer');
    if ((req.url.startsWith('/assets') || req.url.startsWith('/pages') || req.url.startsWith('/scripts') || req.url.startsWith('/styles')) && !referer?.includes(req.hostname)) {
        return res.status(403).render('errors', { errorCode: 403 });
    }
    next();
});

fridorinApp.use(express.static(path.resolve('sites/fridorin')));
fridorinApp.use(express.static(path.resolve('sites/fridorin/pages')));

fridorinApp.use('/r/:id', (req, res) => {
    fs.readFile(path.resolve('sites/fridorin/redirect.json'), 'utf8', (err, data) => {
        let redirect = JSON.parse(data);
        if (redirect[req.params.id]) {
            res.redirect(redirect[req.params.id][1]);
        } else {
            res.status(404).render('errors', { errorCode: 404 });
        }
    });
})

fridorinApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

export default fridorinApp;