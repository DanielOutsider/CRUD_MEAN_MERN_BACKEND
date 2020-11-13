const { response } = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario.model');

const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find({}, 'nombre email rol google');
    res.json({
        ok: true,
        usuarios: usuarios
    })
}


const crearUsuario = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        const { email, password, nombre } = req.body;
        const errores = validationResult( req ); // crea un arreglo de errores generados en la route
        
        //console.log(errores.mapped());
        if ( !errores.isEmpty() ){

            status = 'validator';
            alert = 'error de validacion';
            response = errores.mapped();

        }else{

            const existeEmail = await Usuario.findOne({ email });

            if ( existeEmail ){
                status = 'error';
                alert = 'email duplicado';
            }else{
                const usuario = new Usuario(req.body);
                await usuario.save();

                status = 'success';
                alert = 'usuario registrado';
                response = usuario;
            }
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
    getUsuarios,
    crearUsuario
}