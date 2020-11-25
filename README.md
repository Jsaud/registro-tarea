## Pasos para instalar en entorno local

- Clonar proyecto [Github](https://github.com/Jsaud/registro-tarea) con el comando 

```
git clone https://github.com/Jsaud/registro-tarea.git
```

- Ir a la ruta del proyecto descargado y ejecutar los siguientes comandos en su debido orden:
```
npm install -g json-server

npx json-server --watch db.json --port 4000
```

- Despues de levantar su API local, ejecutar el siguiente comando para levantar el proyecto React Redux

```
npm start
```

