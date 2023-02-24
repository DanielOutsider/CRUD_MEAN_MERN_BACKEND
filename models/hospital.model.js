const { Schema, model }= require('mongoose');

const HospitalSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    imagen:{
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }

}, { collection: 'hospitales' });

// ocultamos los valores que no quieren que se retornen
HospitalSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object
});

module.exports = model( 'Hospital', HospitalSchema );