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

module.exports = blockDirectAccess;