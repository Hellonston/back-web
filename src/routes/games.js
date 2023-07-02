const Router = require('koa-router');
const { Game } = require('../models');
const authUtils = require('../lib/auth/jwt')

const router = new Router();

// Para la creacion de Games
router.post('games.create', '/', authUtils.isUser, async (ctx) => {
  try {
    // Se crea el game
    const newGame = Game.build({
      turn: 0,
      winner: 'None',
    });
    await newGame.save(); // se guarda el nuevo Game
    ctx.body = newGame; // el cuerpo se cambia al contenido de game
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Mostrar todos los games que existen
router.get('games.showAll', '/showAll', async (ctx) => {
  try {
    const gamesAll = await ctx.orm.Game.findAll();
    ctx.body = gamesAll;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// Para eliminar un Game (En caso de que alguien pierda, primero se guarda el puntaje
// luego se elimina el Game)
router.delete('games.deleteOneGame', '/delete/:id', async (ctx) => {
  try {
    const deletedGame = await ctx.orm.Game.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    if (deletedGame) {
      ctx.status = 200;
      ctx.body = { message: 'Game eliminado exitosamente' };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'El Game no fue encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
