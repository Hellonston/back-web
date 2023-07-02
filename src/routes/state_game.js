// import Router from 'koa-router';

const Router = require('koa-router');

const router = Router();

// funciones utiles

async function getArchers(player, ctx) {
  const archers = await ctx.orm.Troop.findAll({

    where: {

      gameId: player.gameId,

      troopType: 'Archer',

    },

  });

  return archers;
}

async function getKnight(player, ctx) {
  const knight = await ctx.orm.Troop.findAll({

    where: {

      gameId: player.gameId,

      troopType: 'Knight',

    },

  });

  return knight;
}

async function getSoldier(player, ctx) {
  const soldier = await ctx.orm.Troop.findAll({

    where: {

      gameId: player.gameId,

      troopType: 'Soldier',

    },

  });

  return soldier;
}

async function getUrbanCenter(player, ctx) {
  const urbanCenter = await ctx.orm.Building.findAll({

    where: {

      gameId: player.gameId,

      buildingType: 'UrbanCenter',

    },

  });

  return urbanCenter;
}

async function getBarracks(player, ctx) {
  const barracks = await ctx.orm.Building.findAll({

    where: {

      gameId: player.gameId,

      buildingType: 'Barracks',

    },

  });

  return barracks;
}

async function getStable(player, ctx) {
  const stable = await ctx.orm.Building.findAll({

    where: {

      gameId: player.gameId,

      buildingType: 'Stable',

    },

  });

  return stable;
}

async function getArchery(player, ctx) {
  const archery = await ctx.orm.Building.findAll({

    where: {

      gameId: player.gameId,

      buildingType: 'Archery',

    },

  });

  return archery;
}

router.get('getStateGame', '/getStateGame/:gameId', async (ctx) => {
  try {
    const { gameId } = ctx.params;

    const jsonData = {};

    const game = await ctx.orm.Game.findOne({

      where: {

        id: gameId,

      },

    });

    const players = await ctx.orm.Player.findAll({

      where: {

        gameId,

      },

    });

    jsonData.gameIdentifier = gameId;

    jsonData.actualTurn = game.turn;

    for (const player of players) {
      const archers = await getArchers(player, ctx);

      const knight = await getKnight(player, ctx);

      const soldier = await getSoldier(player, ctx);

      const urbanCenter = await getUrbanCenter(player, ctx);

      const barracks = await getBarracks(player, ctx);

      const stable = await getStable(player, ctx);

      const archery = await getArchery(player, ctx);

      // Agregar los datos al objeto JSON

      jsonData[player.id] = {

        archers,

        knights: knight,

        soldiers: soldier,

        urbanCenter,

        barracks,

        stables: stable,

        archery,

      };

      const map = await ctx.orm.Tile.findAll({

        where: {

          gameId,

        },

      });

      jsonData.Map = map;

      ctx.body = jsonData;

      ctx.status = 200;
    }
  } catch (error) {
    ctx.body = error;

    ctx.status = 400;

    console.log(error);
  }
});
module.exports = router;
