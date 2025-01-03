import express from 'express';
import vhost from 'vhost';
import dotenv from 'dotenv';

import fridorinApp from './scripts/fridorin.js';
import annfigmaApp from './scripts/annfigma.js';
import converterApp from './scripts/converter.js';

dotenv.config();

const isDebugMode = process.env.DEBUG_MODE === 'True';

const annfigmaDomain = isDebugMode ? process.env.DEV_DOMAIN_ANNFIGMA : process.env.DOMAIN_ANNFIGMA;
const converterDomain = isDebugMode ? process.env.DEV_DOMAIN_CONVERTER : process.env.DOMAIN_CONVERTER;
const fridorinDomain = isDebugMode ? process.env.DEV_DOMAIN_FRIDORIN : process.env.DOMAIN_FRIDORIN;

const app = express();

app.use(vhost(annfigmaDomain, annfigmaApp));
app.use(vhost(converterDomain, converterApp));
app.use(vhost(fridorinDomain, fridorinApp));

app.listen(80, () => {
  console.log('| Sites up');
});