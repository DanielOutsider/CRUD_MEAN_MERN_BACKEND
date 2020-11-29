const { Schema, model }= require('mongoose');

const MedicoSchema = Schema({

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
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }

}, { collection: 'medicos' });

// ocultamos los valores que no quieren que se retornen
MedicoSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object
});

module.exports = model( 'Medico', MedicoSchema );