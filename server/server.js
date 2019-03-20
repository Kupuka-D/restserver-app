//Configuracion del server

//config import
const config = require('./config/config')

//Express
const express = require('express');
const app = express();

//Mongoose
const mongoose = require('mongoose');

//Bodyparser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Para poder usar las rutas que estan en user-routes.js
app.use(require('./routes/user-routes.js'));

//Para usar los scripts
//app.use(require('./scripts/crear-usuarios.js'));


//C:\Program Files\MongoDB\Server\4.0\bin
//Conectamos mongoose con nuestra BD
//Si la BD no existe la crea
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log("Conexion con la BD establecida");
    });



app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT}.`);
});