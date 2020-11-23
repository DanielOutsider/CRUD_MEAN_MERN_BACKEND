const { Schema, model }= require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    imagen:{
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }
});

// ocultamos los valores que no quieren que se retornen
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...Object } = this.toObject();
    Object.uid = _id;
    return Object
});

module.exports = model( 'Usuario', UsuarioSchema );