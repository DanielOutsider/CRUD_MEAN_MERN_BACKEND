const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        const { email, password } = req.body;
        
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ){
            status = 'error';
            alert = 'email no encontrado';
        }else{
            // valida contrasenia
            const validaContrasenia = bcryptjs.compareSync( password, usuarioDB.password );

            if ( !validaContrasenia ){
                status = 'error';
                alert = 'password no valido';
            }else{
                // generar token - JWT
                const token = await generarJWT( usuarioDB.id);
                status = 'success';
                alert = 'Login satisfactorio';
                response = token;
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
    login
}