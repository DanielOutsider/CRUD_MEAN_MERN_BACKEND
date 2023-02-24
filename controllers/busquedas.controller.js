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

const getDocumentosColeccion = async( req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');
    let data = [];
    
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre email')
                                .populate('hospital', 'nombre imagen');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre email');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "la tabla tiene que ser usuarios, medicos u hospitales"
            });
            break;
    }
    

    res.json({
        ok: true,
        data
    })

}

module.exports = {
    getBusquedas,
    getDocumentosColeccion
}