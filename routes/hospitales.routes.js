/**
 *      /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// check es un middleware, uno puede crear uno personalizado


const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales.controller');
const router = Router();

router.get('/', validarJWT, getHospitales);
router.post('/',[
                    validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('imagen','Registre un email valido').not().isEmpty(),
                    validarCampos

                ]
                , crearHospital);

router.put('/:id',[
                    validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('imagen','Registre un email valido').not().isEmpty()
                ]
                , actualizarHospital);

router.delete('/:id',[
                    validarJWT,                    
                ]
                , borrarHospital);


module.exports = router;