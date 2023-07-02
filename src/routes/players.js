const Router = require('koa-router');
const { parameters } = require('./parameters');
const { Player } = require('../models');

const router = new Router();

// Crear un jugador
// Importante: userId y gameId
// un mismo usuario no puede tener mas de un jugador en el mismo game
router.post('player.create', '/create', async (ctx) => {
  console.log(ctx.request.body);
  const { gameId } = ctx.request.body;
  const { userId } = ctx.request.body;
  console.log(gameId);
  try {
    const currentPlayersCount = await ctx.orm.Player.count({
      where: { gameId },
    });

    // limite de jugadores
    if (currentPlayersCount >= 4) {
      ctx.status = 400;
      ctx.body = { error: 'Se alcanzó el límite máximo de jugadores para este juego.' };
    } else {
      const existingPlayer = await ctx.orm.Player.findOne({
        where: { userId, gameId },
      });
      if (existingPlayer) {
        ctx.status = 400;
        ctx.body = { error: 'El jugador ya está asociado a este juego.' };
      } else {
        const player = await ctx.orm.Player.create(ctx.request.body);
        ctx.body = player;
        ctx.status = 201;
      }
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// obtenemos los datos actuales del jugador con cierta id
router.get('player.getData', '/getData/:id', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.params.id } });
    if (player) {
      ctx.body = player;
      ctx.status = 201;
    } else {
      ctx.status = 400;
    }
  } catch (error) {
    ctx.body = error;
  }
});
// Se encarga de actualizar los valores de gold y actionPoint(UTILIZADO AL FINALIZAR TURNO)
// query del tipo: {
//    "gold": goldInit,
//    "actionPoint": actionPointInit
// }
router.patch('player.updateValue', '/turnFinished/:gameId/:playerId', async (ctx) => {
  const updatedData = {
    gold: process.env.GOLD_INIT,
    actionPoint: process.env.ACTION_POINT_INIT,
  };
  const { playerId } = ctx.params;
  const { gameId } = ctx.params;

  try {
    const [rowsUpdated] = await ctx.orm.Player.update(updatedData, {
      where: {
        id: playerId,
      },
    });
    const game = await ctx.orm.Game.findOne({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      ctx.status = 404;
      ctx.body = { error: 'Player no fue encontrado' };
      return;
    }
    game.turn += 1;

    await game.save();

    if (rowsUpdated === 1) {
      ctx.status = 200;
      ctx.body = { message: 'Player actualizado parcialmente exitosamente' };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Player no fue encontrado' };
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('player.getDefeatPlayers', 'getDefeatPlayers/:gameId', async (ctx) => {
  try {
    const players = await ctx.orm.Player.destroy({
      where: {
        health: {
          [Op.lte]: 0,
        },
      },
    });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('player.UpdateTroopsAndBuildings', 'getUpdateCounts/:gameId/:playerId', async (ctx) => {
  try {
    const { gameId, playerId } = ctx.params;
    const player = await ctx.orm.Player.findOne({
      where: {
        id: playerId,
      },
    });
    if (!player) {
      ctx.status = 404;
      ctx.body = { error: 'Player no fue encontrado' };
      return;
    }

    const archersQuantity = await ctx.orm.Troop.count({
      where: {
        gameId,
        playerId,
        troopType: 'Archer',
      },
    });

    const knightQuantity = await ctx.orm.Troop.count({
      where: {
        gameId,
        playerId,
        troopType: 'Knight',
      },
    });
    const soldierQuantity = await ctx.orm.Troop.count({
      where: {
        gameId,
        playerId,
        troopType: 'Soldier',
      },
    });

    const urbanCenterQuantity = await ctx.orm.Building.count({
      where: {
        gameId,
        playerId,
        buildingType: 'UrbanCenter',
      },
    });

    const barracksQuantity = await ctx.orm.Building.count({
      where: {
        gameId,
        playerId,
        buildingType: 'Barracks',
      },
    });
    const stableQuantity = await ctx.orm.Building.count({
      where: {
        gameId,
        playerId,
        buildingType: 'Stable',
      },
    });
    const archeryQuantity = await ctx.orm.Building.count({
      where: {
        gameId,
        playerId,
        buildingType: 'Archery',
      },
    });

    player.archersQuantity = archersQuantity;
    player.knightQuantity = knightQuantity;
    player.soldierQuantity = soldierQuantity;
    player.urbanCenterQuantity = urbanCenterQuantity;
    player.barracksQuantity = barracksQuantity;
    player.stableQuantity = stableQuantity;
    player.archeryQuantity = archeryQuantity;

    await player.save();
    ctx.status = 200;
    ctx.body = {
      message: 'El estado del jugador según el curso de la partida se ha \
        actualizado correctamente',
    };
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('players.showAll', '/showAll', async (ctx) => {
  try {
    const playersAll = await ctx.orm.Player.findAll();
    ctx.body = playersAll;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    console.log(error);
  }
});

module.exports = router;
