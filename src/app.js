const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

// use orm as context: we can access to orm in all folders of our project
app.context.orm = orm;

// use cors
app.use(cors());

// middlewares: koalogger -> koabody -> koarouter

app.use(KoaLogger());
app.use(koaBody());

// koa router
app.use(router.routes());

// Se escucha en index.js
// app.listen(3000, () => {
//   console.log('App iniciada y escuchando');
// });
module.exports = app;
