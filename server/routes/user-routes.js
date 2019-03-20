//File of user routes

//Express
const express = require('express');
const app = express();

//Importamos el modelo
const User = require('../models/user');

//Bcrypt -> para encriptar la contraseña
const bcrypt = require('bcrypt');

//underscore
const _ = require('underscore');

const createUsers = require('../scripts/crear-usuarios');

//Peticion post
app.post('/usuarios', function(req, res) {
    let n = req.body.n;
    let users = [];

    createUsers.createUsers(n);

    res.json({
        ok: true,
        users: users
    });
});


//Peticion get
app.get('/usuario', function(req, res) {

    //Para paramentros opcionales, vienen por url query(params obligatorios)
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limit = req.query.limit || 5;
    limit = Number(limit);


    //Funciones de mongoose find para traernos a todos los usuarios,
    //skip para paginar de a 4 y limit para traerme solo cuatro registros
    User.find({ state: true }, "name email state rol img google") //Campos que quiero que aparezcan
        .skip(desde)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //Funcion para devolver la cantidad de registros, puedo pasarle una condicion
            User.count({ state: true }, (err, elem) => {
                res.json({
                    ok: true,
                    users,
                    elem
                });
            })
        })
});


//Peticion post
app.post('/usuario', function(req, res) {

    //Para esto es necesario tener instalado el body-parser
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    //save, palabra reservada de mongoose
    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //Devuelvo el objeto
        res.json({
            ok: true,
            user: userDB
        });
    });


});

//Peticion delete
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;


    //Hacemos la baja lógica del usuario, cambiando la propiedad state a false
    User.findOneAndUpdate({ _id: id }, { state: false }, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }

        //es como res.send pero envía un JSON
        res.json({
            ok: true,
            user: userDB
        });

    });


    // //Esta es una eliminacion fisica del registro de la BD
    // User.findOneAndDelete({ _id: id }, (err, userDeleted) => {
    //     if (err) {
    //         return res.json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     //Si no encontró un usuario con ese id
    //     if (!userDeleted) {
    //         return res.json({
    //             ok: false,
    //             err: { message: 'Usuario no encontrado' }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     });
    // });

});

//Peticion put
app.put('/usuario/:id', function(req, res) {

    //Para obtener el parametro que nos llega dentro de la variable id en la url
    let id = req.params.id;
    //Usamos la libreria underscore para quedarnos con los parametros que se pueden modificar
    let body = _.pick(req.body, ['name', 'email', 'rol', 'img', 'state']);


    //Enviamos el id, el objeto a actualizar y un callback
    User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //es como res.send pero envía un JSON
        res.json({
            ok: true,
            user: userDB
        });

    });




});


//Exportamos el objeto app con las rutas ya cargadas
module.exports = app;