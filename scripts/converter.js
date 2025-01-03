import express from 'express';
import path from 'path';

const converterApp = express();

converterApp.set('view engine', 'ejs');
converterApp.set('views', path.resolve('sites/errors'));
converterApp.use('/errors', express.static(path.resolve('sites/errors')));

converterApp.use((req, res, next) => {
    const referer = req.get('Referer');
    if ((req.url.startsWith('/assets') || req.url.startsWith('/scripts') || req.url.startsWith('/styles')) && !referer?.includes(req.hostname)) {
        return res.status(403).render('errors', { errorCode: 403 });
    }
    next();
});

converterApp.use(express.static(path.resolve('sites/converter')));

converterApp.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

export default converterApp;