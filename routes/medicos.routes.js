/**
 *      /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// check es un middleware, uno puede crear uno personalizado


const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller');
const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/',[
                    validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('imagen','Registre un email valido').not().isEmpty(),
                    validarCampos

                ]
                , crearMedico);

router.put('/:id',[
                    validarJWT,
                    check('hospital','El hospital debe ser valido').isMongoId(),
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('imagen','Registre un email valido').not().isEmpty()
                ]
                , actualizarMedico);

router.delete('/:id',[
                    validarJWT,                    
                ]
                , borrarMedico);


module.exports = router;