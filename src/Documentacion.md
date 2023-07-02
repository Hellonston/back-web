# Funciones realizadas
### Get para obtener el estado de una partida/juego
Este endopoint corresponde al siguiente: 
/getStateGame/{:gameId}
donde gameId corresponde al juego que se quiere obtener toda la información.
###  Post para realizar jugadas
Este Post corresponde al siguiente:


Ahora se encuentran los enpoints asociados para el desarrollo de la lógica del juego, notar que entre paréntesis se encuentra el endpoint
## User
- (POST)Create user (/users), recibe como entrada un json del tipo:{username:STRING, password:STRING,
email:  STRING,
rol:  STRING }
- (GET) User show (/:{name})) Obtenemos el nombre del usuario mediante su nombre
## Game
- (GET) Create game (games/create): Creamos un game, el cual se inicializa con turn 0  y winner "None"
-  (GET) Games Show (games/showAll):
Se visualizan todas las partidas
- (DELETE) Delete Game (/delete/{:id}): 
Se elimina el Game asociado a la id

## Players
- (POST) Create Player (/create): recibe como post un json de la siguiente forma: 
 {
"name":  "Hellonston",
"userId":  3,
"gameId":  2,
"gold":  5,
"actionPoint":  7,
"archersQuantity":  0,
"knightQuantity":  0,
"soldierQuantity":  0,
"urbanCenter":  0,
"barracksQuantity":  0,
"stableQuantity":  0,
"archeryQuantity":  0
}
Y crea el jugador
- (GET) Get data player (getData/:{id}):
Obtenemos los datos actuales del jugador con cierta id
- (PATCH) Turn Finished (/turnFinished/:{gameId}/:{playerId}) Se encarga de manejar el termino de turno, devolviendo el oro y los puntos de acción al valor inicial del jugador con id (playerId) y además aumenta el game turn en 1
- (GET) Update counts in player (getUpdateCounts/:{gameId}/:{playerId}): 
Se encarga de actualizar los contadores de unidades que tiene un jugador en sus atributos de tabla.
## Troops
- (POST) Troop Move (/troops/move/:direction/:gameId/:troopId) Recibe los parametros a donde se debe dirigir el movimiento de la tropa, la partida en la que se encuentra la tropa, y que tropa se desea mover. 
- (POST) Troop Attack (/troops/attack/:direction/:gameId/:troopId) Recibe los parametros a donde se quiere atacar, en que partida se encuentra la tropa que ataca y que cual tropa está atacando. 
- (POST) Troop Create (/troops/create) Recibe como entrada un JSON de la forma : 
- { "id": INT "troopType": STR, "playerId": INT, "gameId": INT, "xCoordinate": INT, "yCoordinate": INT, "health": INT, "strength": INT, "value": INT } y crea la tropa en el tablero. También resta el valor al oro del jugador que crea la tropa. 
- (GET) Troop Show (/troops/showAll) Muestra todas las tropas en todas las partidas. 

## Buildings 
- (POST) Building Create (/building/create) Recibe como entrada un JSON de la forma: 
```json
{ "id": INT 
"buildingType": STR,
"playerId": INT,
"gameId": INT,
"xCoordinate": INT,
"yCoordinate": INT,
"health": INT,
"value": INT } 
```
También resta el valor de la estructura al oro del jugador que la crea. 
- (GET) Building Show (/buildings/showAll) Muestra todas las estructuras en todas las partidas

## Flujo de juego
En primer lugar se debe crear un usuario, luego un game.
Una vez realizado lo anterior se puede crear un player que se encuentra asociado a usuario y al game. Una vez asociado ya puede comenzar a construir dentro del mapa fijo, que presenta casillas. Una vez instanciado todo lo anterior, el jugador es capaz de crear unidades o de crear estructuras, en caso de crear estructuras, estas quedan posicionadas pero como todavía no hay conexión con frontend no tienen mucho sentido todavía (por ello creamos unidades instantáneamente).

Por otro lado al crear unidades, estas tienen la capacidad de desplazarse en el mapa y atacar a otras unidades o estructuras, aplicándole daños de impacto, si la vida baja a 0 se eliminan de la bdd. De momento el que gana es el que logra eliminar todas las unidades y estructuras en tal caso se utiliza el endpoint para destruir player.
Al terminar un turno se suma +1 al turn del Game, esto sirve ya que dependiendo de la cantidad de jugadores (máximo 4) se simula los turnos utilizando la operación resto con los jugadores que siguen vivos.
Finalmente, cada acción de creacion, eliminacion, actualizaría los valores de atributo player.