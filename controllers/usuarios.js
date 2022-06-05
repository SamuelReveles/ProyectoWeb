const { request, response } = require('express');

//Models
const Persona = require('../models/persona');
const Idioma = require('../models/idioma');
const Tecnologia = require('../models/tecnologia');

//Ver listado de personas
const getPersonas = async(req = request, res = response) => {
    try {
        const personas = await Persona.find();

        res.status(200).json(personas);
    } catch (error) {
        res.status(400).json({
            success: true,
            msg: 'Hubo un error :/'
        });
    }
};

//Ver una persona en específico
const getPersona = async(req = request, res = response) => {
    try {
        const id = req.query.id;

        const persona = await Persona.findById(id);

        res.status(200).json(persona);
    } catch (error) {
        res.status(400).json({
            success: true,
            msg: 'Hubo un error :/'
        });
    }
};

//Crear persona
const postPersona = async(req = request, res = response) => {
    try {
        const {
            nombre,
            apellidos,
            celular,
            correo,
            fecha_nacimiento,
            descripcion,
            // tecnologias,
            // idiomas
        } = req.body;

        const persona = new Persona({
            nombre,
            apellidos,
            celular,
            correo,
            fecha_nacimiento: new Date(),
            descripcion,
            tecnologias: [],
            idiomas: []
        });

        await persona.save();

        res.status(201).json(persona);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: true,
            msg: 'Hubo un error :/'
        });
    }
};

//Actualizar persona
const putPersona = async(req = request, res = response) => {
    try {
        const {
            id,
            nombre,
            apellido,
            celular,
            correo,
            fecha_nacimiento,
            descripcion,
            tecnologias,
            idiomas
        } = req.body;

        const persona = {
            nombre,
            apellido,
            celular,
            correo,
            fecha_nacimiento,
            descripcion,
            tecnologias,
            idiomas
        };

        await Persona.findByIdAndUpdate(id, persona);

        res.status(200).json({
            success: true,
            msg: 'Actualizado correctamente'
        });

    } catch (error) {
        res.status(400).json({
            success: true,
            msg: 'Hubo un error :/'
        });
    }
};

const accessCode = (req = request, res = response) => {
    const code = req.query.code;

    if(code == 'Código-Secreto') {
        res.status(200).json({
            success: true,
            msg: 'Puedes pasar'
        });
    }
    else {
        res.status(401).json({
            success: true,
            msg: 'Código equivocado'
        });
    }
}

module.exports = {
    getPersonas, 
    getPersona,
    postPersona,
    putPersona,
    accessCode
}