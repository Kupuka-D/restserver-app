//Configuracion del server

//config import
const config = require('./config/config')

//Express
const express = require('express');
const app = express();

//Bodyparser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Peticion get
app.get('/usuario', function(req, res) {
    res.json('Hello World')
});


//Peticion post
app.post('/usuario', function(req, res) {

    //Para esto es necesario tener instalado el body-parser
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'Faltó completar el nombre'
        });
    } else {
        res.json({
            persona: body
        });
    }

});

//Peticion delete
app.delete('/usuario/:id', function(req, res) {
    res.json('peticion delete')
});

//Peticion put
app.put('/usuario/:id', function(req, res) {

    //Para obtener el parametro que nos llega dentro de la variable id en la url
    let id = req.params.id;
    res.json({
        id
    });
});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT}.`);
});