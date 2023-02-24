const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) =>{

    const desde = Number(req.query.desde) || 0;

    //const usuarios = await Usuario.find({}, 'nombre email rol google');
    // promesas simultaneas
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email google')
            .skip( desde )
            .limit( 5 ),

        Usuario.count()

    ]);
    
    res.json({
        ok: true,
        usuarios: usuarios,
        total: total
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

            const token = await generarJWT( usuario.id);

            status = 'success';
            alert = 'usuario registrado';
            response = { 'usuario' : usuario, 'token': token };
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
            const { password, google, ...campos } = req.body;
            // la linea anterior hace lo mismo 
            // elimina los campos que no queremos actualizar si el usuario lo envia
            // delete campos.password;
            // delete campos.google;

            if ( usuarioDB.email === campos.email ){
                delete campos.email;
            }else{
                const existEmailRow = await Usuario.findOne( {email: req.body.email } );

                if ( existEmailRow ){
                    existEmail = true;
                }
            }

            

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

const borrarUsuario = async(req, res = response) =>{
    
    var status = '';
    var alert = '';
    var response = '';
  
    try {

        // validar si el usuario es el de la sesion
        const uid = req.params.id;

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ){

            status = 'error';
            alert = 'usuario no existe';

        }else{

            await Usuario.findOneAndDelete( uid );

            status = 'success';
            alert = 'usuario eliminado';
            
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
    actualizarUsuario,
    borrarUsuario
}