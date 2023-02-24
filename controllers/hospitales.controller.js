const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Hospital = require('../models/hospital.model');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async(req, res) =>{

    const hospitales = await Hospital.find({})
                                    .populate('usuario', 'nombre email');
    res.json({
        ok: true,
        hospitales: hospitales
    })
}


const crearHospital = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        const uid = req.uid;
        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

        const hospitalDB = await hospital.save();

        status = 'success';
        alert = 'hospital registrado';
        response = hospitalDB;
         
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


const actualizarHospital = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {
        
        // validar si el hospital es el de la sesion
        const uid = req.params.id;
        let existEmail = false;

        const hospitalDB = await Hospital.findById( uid );

        if ( !hospitalDB ){
            status = 'error';
            alert = 'hospital no existe';
        }else{

            // Actualiza
            const { nombre, imagen, ...campos } = req.body;

            // guarda los cambios y retorna el registro actualizado
            const hospitalActualizado = await Hospital.findByIdAndUpdate(uid, campos, { new: true });

            status = 'success';
            alert = 'hospital actualizado';
            response = hospitalActualizado;
                        
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

const borrarHospital = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        // validar si el hospital es el de la sesion
        const uid = req.params.id;

        const hospitalDB = await Hospital.findById( uid );

        if ( !hospitalDB ){

            status = 'error';
            alert = 'hospital no existe';

        }else{

            await Hospital.findOneAndDelete( uid );

            status = 'success';
            alert = 'hospital eliminado';
            
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}