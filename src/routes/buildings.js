const Router = require('koa-router');

const router = Router();

router.post('building.create', '/', async (ctx) => {
  try {
    const building = await ctx.orm.Building.create(ctx.request.body);

    const tile = await ctx.orm.Tile.findOne({
      where: {
        xCoordinate: building.xCoordinate,
        yCoordinate: building.yCoordinate,
        gameId: building.gameId,
      },
    });

    const player = await ctx.orm.Player.findOne({
      where: {
        id: building.playerId,
      },
    });

    if (player.gold >= building.value) {
      player.set({
        gold: player.gold - building.value,

      });

      tile.set({
        elementType: 'Building',
        elementId: building.id,
      });

      await player.save();
      await tile.save();

      ctx.body = building; // el cuerpo se cambia al contenido de user
      ctx.status = 201;
    } else {
      ctx.body = 'You don`t have enough gold to build this building.';
      ctx.status = 400;
      ctx.orm.Building.destroy({
        where: {
          id: building.id,
        },
      });
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('building.showAll', '/showAll', async (ctx) => {
  try {
    const buildingAll = await ctx.orm.Building.findAll();
    ctx.body = buildingAll;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
