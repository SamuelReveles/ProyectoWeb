const { Router } = require('express');

//Funciones
const {
    getPersonas, 
    getPersona,
    postPersona,
    putPersona,
    accessCode,
    deletePersona
} = require('../controllers/usuarios');

const router = new Router();

//Ver listado de personas
router.get('/', getPersonas);

//Ver una persona
router.get('/persona', getPersona);

//Crear una persona
router.post('/', postPersona);

//Actualizar una persona
router.put('/', putPersona);

//Acceder a admin
router.get('/code', accessCode);

router.delete('/', deletePersona)

module.exports = router;