/**
 *      /api/todo/:busqueda
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// check es un middleware, uno puede crear uno personalizado


const { getBusquedas } = require('../controllers/busquedas.controller');
const router = Router();

router.get('/:busqueda', validarJWT, getBusquedas);



module.exports = router;