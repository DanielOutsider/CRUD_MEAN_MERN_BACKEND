/**
 *      /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator'); 
// check es un middleware, uno puede crear uno personalizado


const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controllers');
const router = Router();

router.get('/', getUsuarios);
router.post('/',[
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('password','El password es obligatorio').not().isEmpty(),
                    check('email','El email es obligatorio').isEmail(),
                ]
                , crearUsuario);


module.exports = router;