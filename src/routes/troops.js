const Router = require('koa-router');

const router = Router();

// Funcion sacada de https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// JSON format: {
//  'method': ('move'/'attack'),
//  'direction': ('up'/'down'/'left'/'right'),
//  'gameID': gameID,
//  'troopID': troopID,
// }

router.patch('/', async (ctx) => {
  try {
    const troopInfo = ctx.request.body;
    if (troopInfo.method === 'move') {
      const troop = await ctx.orm.Troop.findByPk(troopInfo.troopId);
      const player = await ctx.orm.Player.findByPk(troop.playerId);
      // Definimos el juego y las coordenadas actuales de la tropa
      if (player.actionPoint > 1) {
        const tile = await ctx.orm.Tile.findOne({
          where: {
            xCoordinate: troop.xCoordinate,
            yCoordinate: troop.yCoordinate,
            gameId: troopInfo.gameId,
          },
        });

        // Manejamos el movimiento hacia arriba
        if (troopInfo.direction === 'up' && troop.yCoordinate + 1 <= 9) {
          const upperTile = await ctx.orm.Tile.findOne({
            where: {
              xCoordinate: troop.xCoordinate,
              yCoordinate: troop.yCoordinate + 1,
              gameId: troopInfo.gameId,
            },
          });

          // Vemos que la casilla de arriba este vacía
          if (upperTile.elementType === null) {
            upperTile.set({
              elementType: 'Troop',
              elementId: troopInfo.troopId,
            });

            await upperTile.save();

            tile.set({
              elementType: null,
              elementId: null,
            });

            await tile.save();

            troop.set({
              yCoordinate: upperTile.yCoordinate,
            });

            await troop.save();

            ctx.body = `Succesfully transported troop to tile (${troop.xCoordinate}, ${troop.yCoordinate})`;
            ctx.status = 200;
          } else {
            ctx.body = 'This tile is already occupied';
            ctx.status = 400;
          }

        // Manejamos el movimiento hacia abajo
        } else if (troopInfo.direction === 'down' && troop.yCoordinate - 1 >= 0) {
          const lowerTile = await ctx.orm.Tile.findOne({
            where: {
              xCoordinate: troop.xCoordinate,
              yCoordinate: troop.yCoordinate - 1,
              gameId: troopInfo.gameId,
            },
          });

          // Vemos que la casilla de abajo esté vacía
          if (lowerTile.elementType === null) {
            lowerTile.set({
              elementType: 'Troop',
              elementId: troopInfo.troopId,
            });

            await lowerTile.save();

            tile.set({
              elementType: null,
              elementId: null,
            });

            await tile.save();

            troop.set({
              yCoordinate: troop.yCoordinate - 1,
            });

            await troop.save();

            ctx.body = `Succesfully transported troop to tile (${troop.xCoordinate}, ${troop.yCoordinate})`;
            ctx.status = 200;
          } else {
            ctx.body = 'This tile is already occupied';
            ctx.status = 400;
          }
        // Manejamos el movimiento hacia la izquierda
        } else if (troopInfo.direction === 'left' && troop.xCoordinate - 1 >= 0) {
          const leftTile = await ctx.orm.Tile.findOne({
            where: {
              xCoordinate: troop.xCoordinate - 1,
              yCoordinate: troop.yCoordinate,
              gameId: troopInfo.gameId,
            },
          });

          if (leftTile.elementType === null) {
            leftTile.set({
              elementType: 'Troop',
              elementId: troopInfo.troopId,
            });

            await leftTile.save();

            tile.set({
              elementType: null,
              elementId: null,
            });

            await tile.save();

            troop.set({
              xCoordinate: troop.xCoordinate - 1,
            });

            await troop.save();

            ctx.body = `Succesfully transported troop to tile (${troop.xCoordinate}, ${troop.yCoordinate})`;
            ctx.status = 200;
          } else {
            ctx.body = 'This tile is already occupied';
            ctx.status = 400;
          }
        // Manejamos el movimiento hacia la derecho
        } else if (troopInfo.direction === 'right' && troop.xCoordinate + 1 <= 9) {
          const rightTile = await ctx.orm.Tile.findOne({
            where: {
              xCoordinate: troop.xCoordinate + 1,
              yCoordinate: troop.yCoordinate,
              gameId: troopInfo.gameId,
            },
          });

          // Vemos que la casilla a la derecha esté vacía
          if (rightTile.elementType === null) {
            rightTile.set({
              elementType: 'Troop',
              elementId: troopInfo.troopId,
            });

            await rightTile.save();

            tile.set({
              elementType: null,
              elementId: null,
            });

            await tile.save();

            troop.set({
              xCoordinate: troop.xCoordinate + 1,
            });

            await troop.save();

            ctx.body = `Succesfully transported troop to tile (${troop.xCoordinate}, ${troop.yCoordinate})`;
            ctx.status = 200;
          } else {
            ctx.body = 'This tile is already occupied';
            ctx.status = 400;
          }
        } else {
          ctx.body = 'Out of bounds';
          ctx.status = 400;
        }

        player.set({
          actionPoint: player.actionPoint - 1,
        });

        await player.save();
      } else {
        ctx.body = "You don't have enough action points for this action";
        ctx.status = 400;
      }
    } else if (troopInfo.method === 'attack') {
      // Buscamos la tropa en la db
      const troop = await ctx.orm.Troop.findByPk(troopInfo.troopId);

      // Si la clase es arquero, tiene 2 casillas de rango
      let range = 1;
      if (troop.troopType === 'Archer') {
        range = 2;
      }

      // Manejamos atacar hacia arriba
      if (troopInfo.direction === 'up' && troop.yCoordinate + range <= 9) {
        const upperTile = await ctx.orm.Tile.findOne({
          where: {
            xCoordinate: troop.xCoordinate,
            yCoordinate: troop.yCoordinate + range,
            gameId: troopInfo.gameId,
          },
        });

        // Revisamos el tipo de elemento a atacar
        if (upperTile.elementType === 'Troop') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedTroop = await ctx.orm.Troop.findOne({ where: { id: upperTile.elementId } });

          // Solo daño
          if (damagedTroop.health - damage > 0) {
            damagedTroop.set({
              health: damagedTroop.health - damage,
            });

            await damagedTroop.save();
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": upperTile.elementId
            }
            //ctx.body = `Succesfully attacked troop, dealt ${damage} damage.`;
            ctx.status = 200;
            // Matar tropa
          } else {
            ctx.orm.Troop.destroy({
              where: {
                id: upperTile.elementId,
              },
            });

            upperTile.set({
              elementType: null,
              elementId: null,
            });

            await upperTile.save();

            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": upperTile.elementId
            }
            //ctx.body = `Succesfully attacked troop, dealt ${damage} and killed it.`;
            ctx.status = 200;
          }
        // Si se ataca una estructura
        } else if (upperTile.elementType === 'Building') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedBuilding = await ctx.orm.Building.findOne({
            where: { id: upperTile.elementId },
          });

          if (damagedBuilding.health - damage > 0) {
            damagedBuilding.set({
              health: damagedBuilding.health - damage,
            });

            await damagedBuilding.save();
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": upperTile.elementId
            }
            //ctx.body = `Succesfully attacked building, dealt ${damage} damage.`;
            ctx.status = 200;
          } else {
            ctx.orm.Building.destroy({
              where: {
                id: upperTile.elementId,
              },
            });

            upperTile.set({
              elementType: null,
              elementId: null,
            });

            await upperTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": upperTile.elementId
            }

            //ctx.body = `Succesfully attacked building, dealt ${damage} and destroyed it.`;
            ctx.status = 200;
          }
        }
        // Manejar el ataque hacia abajo
      } else if (troopInfo.direction === 'down' && troop.yCoordinate - range >= 0) {
        const lowerTile = await ctx.orm.Tile.findOne({
          where: {
            xCoordinate: troop.xCoordinate,
            yCoordinate: troop.yCoordinate - range,
            gameId: troopInfo.gameId,
          },
        });

        if (lowerTile.elementType === 'Troop') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedTroop = await ctx.orm.Troop.findOne({ where: { id: lowerTile.elementId } });

          if (damagedTroop.health - damage > 0) {
            damagedTroop.set({
              health: damagedTroop.health - damage,
            });

            await damagedTroop.save();
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": lowerTile.elementId
            }
            // ctx.body = `Succesfully attacked troop, dealt ${damage} damage.`;
            ctx.status = 200;
          } else {
            ctx.orm.Troop.destroy({
              where: {
                id: lowerTile.elementId,
              },
            });

            lowerTile.set({
              elementType: null,
              elementId: null,
            });

            await lowerTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": lowerTile.elementId
            }
            //ctx.body = `Succesfully attacked troop, dealt ${damage} and killed it.`;
            ctx.status = 200;
          }
        } else if (lowerTile.elementType === 'Building') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedBuilding = await ctx.orm.Building.findOne({
            where: { id: lowerTile.elementId },
          });

          if (damagedBuilding.health - damage > 0) {
            damagedBuilding.set({
              health: damagedBuilding.health - damage,
            });

            await damagedBuilding.save();
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": lowerTile.elementId
            }
            //ctx.body = `Succesfully attacked building, dealt ${damage} damage.`;
            ctx.status = 200;
          } else {
            ctx.orm.Building.destroy({
              where: {
                id: lowerTile.elementId,
              },
            });

            lowerTile.set({
              elementType: null,
              elementId: null,
            });

            await lowerTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": lowerTile.elementId
            }
            //ctx.body = `Succesfully attacked building, dealt ${damage} and destroyed it.`;
            ctx.status = 200;
          }
        }
        // Manejar ataque a la izquierda
      } else if (troopInfo.direction === 'left' && troop.xCoordinate - range >= 0) {
        const leftTile = await ctx.orm.Tile.findOne({
          where: {
            xCoordinate: troop.xCoordinate - range,
            yCoordinate: troop.yCoordinate,
            gameId: troopInfo.gameId,
          },
        });

        if (leftTile.elementType === 'Troop') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedTroop = await ctx.orm.Troop.findOne({ where: { id: leftTile.elementId } });

          if (damagedTroop.health - damage > 0) {
            damagedTroop.set({
              health: damagedTroop.health - damage,
            });

            await damagedTroop.save();
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": leftTile.elementId
            }
            // ctx.body = `Succesfully attacked troop, dealt ${damage} damage.`;
            ctx.status = 200;
          } else {
            ctx.orm.Troop.destroy({
              where: {
                id: leftTile.elementId,
              },
            });

            leftTile.set({
              elementType: null,
              elementId: null,
            });

            await leftTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": leftTile.elementId
            }
            //ctx.body = `Succesfully attacked troop, dealt ${damage} and killed it.`;
            ctx.status = 200;
          }
        } else if (leftTile.elementType === 'Building') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedBuilding = await ctx.orm.Building.findOne({
            where: { id: leftTile.elementId },
          });

          if (damagedBuilding.health - damage > 0) {
            damagedBuilding.set({
              health: damagedBuilding.health - damage,
            });

            await damagedBuilding.save();

            //ctx.body = `Succesfully attacked building, dealt ${damage} damage.`;
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": leftTile.elementId
            }
            ctx.status = 200;
          } else {
            ctx.orm.Building.destroy({
              where: {
                id: leftTile.elementId,
              },
            });

            leftTile.set({
              elementType: null,
              elementId: null,
            });

            await leftTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": leftTile.elementId
            }
            //ctx.body = `Succesfully attacked building, dealt ${damage} and destroyed it.`;
            ctx.status = 200;
          }
        }
        // Manejar el ataque hacia la derecha
      } else if (troopInfo.direction === 'right' && troop.xCoordinate + range <= 9) {
        const rightTile = await ctx.orm.Tile.findOne({
          where: {
            xCoordinate: troop.xCoordinate + range,
            yCoordinate: troop.yCoordinate,
            gameId: troopInfo.gameId,
          },
        });

        if (rightTile.elementType === 'Troop') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedTroop = await ctx.orm.Troop.findOne({
            where: { id: rightTile.elementId },
          });

          if (damagedTroop.health - damage > 0) {
            damagedTroop.set({
              health: damagedTroop.health - damage,
            });

            await damagedTroop.save();

            //ctx.body = `Succesfully attacked troop, dealt ${damage} damage.`;
            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": rightTile.elementId
            }
            ctx.status = 200;
          } else {
            ctx.orm.Troop.destroy({
              where: {
                id: rightTile.elementId,
              },
            });

            rightTile.set({
              elementType: null,
              elementId: null,
            });

            await rightTile.save();

            //ctx.body = `Succesfully attacked troop, dealt ${damage} and killed it.`;
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": rightTile.elementId
            }
            ctx.status = 200;
          }
        } else if (rightTile.elementType === 'Building') {
          const damage = Math.floor(getRandomArbitrary(troop.strength - 2, troop.strength + 2));
          const damagedBuilding = await ctx.orm.Building.findOne({
            where: { id: rightTile.elementId },
          });

          if (damagedBuilding.health - damage > 0) {
            damagedBuilding.set({
              health: damagedBuilding.health - damage,
            });

            await damagedBuilding.save();

            ctx.body = {
              "damage": damage,
              "alive": true,
              "id": rightTile.elementId
            }

            //ctx.body = `Succesfully attacked building, dealt ${damage} damage.`;
            ctx.status = 200;
          } else {
            ctx.orm.Building.destroy({
              where: {
                id: rightTile.elementId,
              },
            });

            rightTile.set({
              elementType: null,
              elementId: null,
            });

            await rightTile.save();
            ctx.body = {
              "damage": damage,
              "alive": false,
              "id": rightTile.elementId
            }

            //ctx.body = `Succesfully attacked building, dealt ${damage} and destroyed it.`;
            ctx.status = 200;
          }
        } else {
          ctx.body = 'Nothing to attack on this tile';
          ctx.status = 400;
        }
      }
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('troop.create', '/', async (ctx) => {
  try {
    const troop = await ctx.orm.Troop.create(ctx.request.body);

    const tile = await ctx.orm.Tile.findOne({
      where: {
        xCoordinate: troop.xCoordinate,
        yCoordinate: troop.yCoordinate,
        gameId: troop.gameId,
      },
    });

    const player = await ctx.orm.Player.findOne({
      where: {
        id: troop.playerId,
      },
    });

    if (player.gold >= troop.value) {
      player.set({
        gold: player.gold - troop.value,

      });

      tile.set({
        elementType: 'Troop',
        elementId: troop.id,
      });

      await player.save();
      await tile.save();

      ctx.body = troop; // el cuerpo se cambia al contenido de user
      ctx.status = 201;
    } else {
      ctx.body = 'You don`t have enough gold to hire this troop.';
      ctx.status = 400;

      ctx.orm.Troop.destroy({
        where: {
          id: troop.id,
        },
      });
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('troop.showAll', '/showAll', async (ctx) => {
  try {
    const troopsAll = await ctx.orm.Troop.findAll();
    ctx.body = troopsAll;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
