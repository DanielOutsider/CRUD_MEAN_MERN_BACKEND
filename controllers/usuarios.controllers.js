const { response } = require('express');
const bcryptjs = require('bcryptjs');

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

        const { email, password } = req.body;
        
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ){
            status = 'error';
            alert = 'email duplicado';
        }else{
            const usuario = new Usuario(req.body);

            //encriptar contrase;a
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( password, salt);

            // guarda usuario
            await usuario.save();

            status = 'success';
            alert = 'usuario registrado';
            response = usuario;
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


const actualizarUsuario = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        // validar si el usuario es el de la sesion
        const uid = req.params.id;
        let existEmail = false;

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ){
            status = 'error';
            alert = 'usuario no existe';
        }else{

            // Actualiza
            const campos = req.body;

            if ( usuarioDB.email === campos.email ){
                delete campos.email;
            }else{
                const existEmailRow = await Usuario.findOne( {email: req.body.email } );

                if ( existEmailRow ){
                    existEmail = true;
                }
            }

            // elimina los campos que no queremos actualizar si el usuario lo envia
            delete campos.password;
            delete campos.google;

            if ( existEmail == true ){
                // guarda los cambios y retorna el registro actualizado
                status = 'validator';
                alert = 'Email en uso, usar otro email';
                     
            }else{
                // guarda los cambios y retorna el registro actualizado
                const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

                status = 'success';
                alert = 'usuario actualizado';
                response = usuarioActualizado;
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
    crearUsuario,
    actualizarUsuario
}