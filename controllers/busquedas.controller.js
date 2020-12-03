// getTodo

const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const { generarJWT } = require('../helpers/jwt');

const getBusquedas = async(req, res) =>{

    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');
    /*
    const usuarios = await Usuario.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });
    */
    // promesa ejecutada al mismo tiempo
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

module.exports = {
    getBusquedas
}