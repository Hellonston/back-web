const Router = require('koa-router');

const router = new Router();

router.get('tiles.showAll', '/showAll', async (ctx) => {
  try {
    const tilesAll = await ctx.orm.Tile.findAll();
    ctx.body = tilesAll;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
