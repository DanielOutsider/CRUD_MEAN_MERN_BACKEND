/**
 *      /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// check es un middleware, uno puede crear uno personalizado


const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/',[
                    validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('password','El password es obligatorio').not().isEmpty(),
                    check('email','Registre un email valido').isEmail(),
                    validarCampos
                ]
                , crearUsuario);

router.put('/:id',[
                    validarJWT,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('email','Registre un email valido').isEmail(),
                    validarCampos
                ]
                , actualizarUsuario);

router.delete('/:id',[
                    validarJWT,                    
                ]
                , borrarUsuario);


module.exports = router;