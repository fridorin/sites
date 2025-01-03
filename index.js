const express = require('express');
const vhost = require('vhost');
const dotenv = require('dotenv');

const annfigmaApp = require('./scripts/annfigma');
const converterApp = require('./scripts/converter');
const fridorinApp = require('./scripts/fridorin');

dotenv.config();

const isDevMode = process.env.DEBUG_MODE === 'True';

const annfigmaDomain = isDevMode ? process.env.DEV_DOMAIN_ANNNFIGMA : process.env.DOMAIN_ANNNFIGMA;
const converterDomain = isDevMode ? process.env.DEV_DOMAIN_CONVERTER : process.env.DOMAIN_CONVERTER;
const fridorinDomain = isDevMode ? process.env.DEV_DOMAIN_FRIDORIN : process.env.DOMAIN_FRIDORIN;

const app = express();

app.use(vhost(annfigmaDomain, annfigmaApp));
app.use(vhost(converterDomain, converterApp));
app.use(vhost(fridorinDomain, fridorinApp));

app.listen(80, () => {
  console.log('| Sites up');
});