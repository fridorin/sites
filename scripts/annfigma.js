import express from 'express';
import path from 'path';
import fs from 'fs';

const annfigmaApp = express();

annfigmaApp.set('view engine', 'ejs');
annfigmaApp.set('views', path.resolve('sites/errors'));
annfigmaApp.use('/errors', express.static(path.resolve('sites/errors')));

annfigmaApp.use((req, res, next) => {
    const referer = req.get('Referer');
    if ((req.url.startsWith('/assets') || req.url.startsWith('/styles')) && !referer?.includes(req.hostname)) {
        return res.status(403).render('errors', { errorCode: 403 });
    }
    next();
});

annfigmaApp.use(express.static(path.resolve('sites/annfigma')));

annfigmaApp.use('/r/:id', (req, res) => {
    fs.readFile(path.resolve('sites/annfigma/redirect.json'), 'utf8', (err, data) => {
        let redirect = JSON.parse(data);
        if (redirect[req.params.id]) {
            res.redirect(redirect[req.params.id][1]);
        } else {
            res.status(404).render('errors', { errorCode: 404 });
        }
    });
})

annfigmaApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

export default annfigmaApp;