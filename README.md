# grupo-Haliax-backend
# Proyecto E2: Haliax

En esta entrega se desarrollará el backend del proyecto, para ello se dividió cada funcionalidad/implementación en bandas y asimismo en cada banda se hará una documentación o explicación detallada de lo que se logró desarrollar.
```python 
npm install code
```

# Inicializar Proyecto
Vamos a trabajar el backend con el comando: 
```python
npm
```

### Comandos utiles
Antes de comenzar, instala todos los paquetes:
```python
npm install
```
Una vez creada la carpeta **node_modules** comienza el desarrollo.


### Creacion de la base de datos con sus respectivas credenciales 📁📁

1. Primero inicializamos los servicios de postgres:
```python
sudo service postgresql start
```

2. Luego creamos un superuser con el fin de acceder a postgress con username y password
```python
sudo -u postgres createuser --superuser web_user
```

3. Le colocaremos contraseña al usuario

```python
sudo -i -u postgres
psql
ALTER USER web_user WITH PASSWORD 'haliax'
```

4. Ahora creamos una base de datos para el desarrollo de nuestro proyecto, se mantendrán los nombres del .env

```python
sudo -u postgres createdb web_db_development
```

5. Se linkea el web_user con la base de datos y el hostname (si no se hace arroja error de auntentificación)

```python
sudo -i -u postgres
psql -U web_user -d web_db_development -h 127.0.0.1
```
6. Listo! Ahora se puede ejecutar el proyecto y seguir desarrollando


### Creación de tablas en base de datos y poblarlas 🛒🛒
Para este apartado se correrán las migraciones creadas y luego se procederá a ejecutar las seeders.
1. En primer lugar realizamos la migracion a la base de datos(creación de las tablas en la bdd), para ello utilizamos el siguiente comando:

```python
npx sequelize-cli db:migrate
```

2. Luego creamos los datos de las tablas con los seeders que creamos, para esto corremos el siguiente código:

```python
npx sequelize-cli db:seed:all
```

3. Listo! Se encuentran creadas y pobladas nuestras tablas.




### Ejecución del backend
1. En primer lugar para correr el servidor y que comience a escuchar eventos. Está configurado con nodemon por lo tanto se actualiza inmediatamente 😄
```python
npm start
```
2. Una vez que comiences a desarrollar y agregar features al proyecto procura mantener un código ordenado que siga airbnb , para ello descarga la **extension de vscode** que se llama eslint, el linter te avisa a tiempo real cualquier falla. La otra opción y la que encuentro más potente, ya que puede arreglar todo el codigo con un simple comando, es lo siguiente:
#### Te muestra todas las lineas que no se adhieren a airbnb en el proyecto
Para filtrar por archivos, reemplaza el . por el nombre del archivo
```python
npx eslint .
```
#### Para fixear todo el proyecto (arregla muchos errores pero los que queden hay que revisarlos manualmente)
```python
npx eslint . --fix
```




# Bandas



### Banda D 
Implementacion del modelo en la base de datos, incluyendo todas las entidades y sus relaciones. ´ Se recomienda documentar el modelo en el README.
### Banda C
Implementacion de lógica de juego, que puede contener algunos errores. Debe tener al menos un ´ GET funcional para obtener el estado de una partida/juego y un POST funcional para enviar una de las jugadas de la partida.
### Banda B
Implementacion de la lógica de juego sin errores. Algunos de los ´ POST que el juego requiera para probar las jugadas que se implementaron pueden tener errores. Debe entregar documentación o un archivo ´ JSON de prueba. Esta parte será evaluada con postman, por lo que no deben tener aún la conexión back y  front
### Banda A
Uso de **ESLint y Gitflow** durante el desarrollo del proyecto. Ademas, no hay errores en los endpoints implementados
### Banda A+ (Ójala)
Solo para esta entrega se asignara una nota de 7,5 en caso de que haya un avance en la vista del tablero de juego