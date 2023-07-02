// import Router from 'koa-router';
// import state_game from './routes/state_game.js';

const Router = require('koa-router');
const dotenv = require('dotenv');
const state_game = require('./routes/state_game');
const users = require('./routes/users');
const games = require('./routes/games');
const players = require('./routes/players');
const troops = require('./routes/troops');
const tiles = require('./routes/tiles');
const buildings = require('./routes/buildings');
const authRoutes = require('./routes/authentication')
const scopeProtectedRoutes = require('./routes/scopeExample.js')

const jwtMiddleware = require('koa-jwt');


dotenv.config();
const router = new Router();

router.use('/state_game', state_game.routes());


router.use('/games', games.routes());
router.use('/players', players.routes());
router.use('/troops', troops.routes());
router.use('/tiles', tiles.routes());
router.use('/buildings', buildings.routes());
router.use('/authentication', authRoutes.routes());

//A partir de acá se aplica jwt, con vista protegida
router.use(jwtMiddleware({secret: process.env.JWT_SECRET}))

router.use('/users', users.routes());
router.use('/scope-example', scopeProtectedRoutes.routes())




module.exports = router;
