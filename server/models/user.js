//Configuracion del modelo-Schema

const mongoose = require('mongoose');
//Mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');

let mongooseHidden = require('mongoose-hidden')({ hidden: { _id: true, password: true } });


//Rols 
//Dentro del rol en schema tenemos la propiedad enum que tiene este objeto asignado
let rols = {
    values: ['USER_ROL', 'ADMIN_ROL'],
    message: '{VALUE} no es un rol valido'
}


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        hide: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROL',
        enum: rols
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// userSchema.methods.toJSON = function() {

//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

// password: {
//     type: String,
//     required: [true, 'La contraseña es obligatoria'],
//     hide: true
//    },
//    usuarioSchema.plugin(mongooseHidden);

//Para esconder el password cuando devolvemos el usuario
userSchema.plugin(mongooseHidden);

//Configuramos el plugin uniquevalidator, nos sirve para cambiar el mensaje de error que viene por defecto
userSchema.plugin(uniqueValidator, { message: '{PATH} already exist in the BD' });

//Exportamos el modelo y lo ponemos un nombre
module.exports = mongoose.model('User', userSchema);