const express = require('express')

const blockDirectAccess = (req, res, next) => {
  const referer = req.get('Referer');
  if (
    (req.url.startsWith('/style') || req.url.startsWith('/js') || req.url.startsWith('/assets') || req.url.startsWith('/pages')) &&
    !referer?.includes(req.hostname)
  ) {
    return res.status(403).render('errors', { errorCode: 403 });
  }
  next();
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', './errors');
app.use('/errors', express.static('./errors'));
app.use(blockDirectAccess);
app.use('/', express.static('./www')).use('/', express.static('./www/pages'));
app.use((req, res) => {
    res.status(404).render('errors', { errorCode: 404 });
});

app.listen(80, () => {
  console.log("| Site up!")
})