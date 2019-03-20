//Express
const express = require('express');
const app = express();


const bcrypt = require('bcrypt');
const User = require('../models/user');


let createUsers = async(cantidad) => {
    let creados = [];
    console.log(`Creando ${cantidad} usuarios...`);
    for (let i = 1; i <= cantidad; i++) {
        await createUser(i)
            .then(resp => {
                //console.log(resp);
                creados.push({ indice: i, name: resp.name });
            })
            .catch(e => console.log('Error:', e));
    }
    console.log(creados);
    return creados;
}


let createUser = async(i) => {
    let user = new User({
        name: `name${i}`,
        email: `test${i}@gmail.com`,
        password: bcrypt.hashSync('123456', 10),
        rol: 'USER_ROL'
    });
    user.save((err, usuarioDB) => {
        if (err) {
            throw new Error(`El usuario ${user} no ha podido insertarse en BD`);
        }
        return usuarioDB;
    });
}

module.exports = {
    createUsers
}