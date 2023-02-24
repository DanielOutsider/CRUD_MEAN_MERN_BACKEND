const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Medico = require('../models/medico.model');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, res) =>{

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre email')
                                .populate('hospital', 'nombre imagen');
    res.json({
        ok: true,
        medicos: medicos
    })
}


const crearMedico = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        const uid = req.uid;
        const medico = new Medico({
            usuario: uid,
            ...req.body
        });

        // guarda medico
        const medicoDB = await medico.save();
        
        status = 'success';
        alert = 'medico registrado';
        response = medicoDB;
         
    } catch (error) {
        console.log(error);
        status = 'error';
        alert = error;
    }finally{
        res.json({
            status: status,
            alert: alert,
            response: response
        })
    }
    
}


const actualizarMedico = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {
        
        // validar si el medico es el de la sesion
        const uid = req.params.id;
        let existEmail = false;

        const medicoDB = await Medico.findById( uid );

        if ( !medicoDB ){
            status = 'error';
            alert = 'medico no existe';
        }else{

            // Actualiza
            const { nombre, imagen, ...campos } = req.body;

            // guarda los cambios y retorna el registro actualizado
            const medicoActualizado = await Medico.findByIdAndUpdate(uid, campos, { new: true });

            status = 'success';
            alert = 'medico actualizado';
            response = medicoActualizado;
                        
        }
        
    } catch (error) {
        console.log(error);
        status = 'error';
        alert = error;
    }finally{
        res.json({
            status: status,
            alert: alert,
            response: response
        })
    }
    
}

const borrarMedico = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        // validar si el medico es el de la sesion
        const uid = req.params.id;

        const medicoDB = await Medico.findById( uid );

        if ( !medicoDB ){

            status = 'error';
            alert = 'medico no existe';

        }else{

            await Medico.findOneAndDelete( uid );

            status = 'success';
            alert = 'medico eliminado';
            
        }
        
    } catch (error) {
        console.log(error);
        status = 'error';
        alert = error;
    }finally{
        res.json({
            status: status,
            alert: alert,
            response: response
        })
    }
    
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}