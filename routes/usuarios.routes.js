/**
 *      /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
// check es un middleware, uno puede crear uno personalizado


const { getUsuarios, crearUsuario, actualizarUsuario } = require('../controllers/usuarios.controllers');
const router = Router();

router.get('/', getUsuarios);
router.post('/',[
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('password','El password es obligatorio').not().isEmpty(),
                    check('email','Registre un email valido').isEmail(),
                    validarCampos
                ]
                , crearUsuario);

router.put('/:id',[
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('email','Registre un email valido').isEmail(),
                ]
                , actualizarUsuario);


module.exports = router;