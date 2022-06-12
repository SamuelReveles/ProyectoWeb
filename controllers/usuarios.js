const { request, response } = require('express');
const PDF = require('pdfkit');

//Models
const Persona = require('../models/persona');
const Idioma = require('../models/idioma');
const Tecnologia = require('../models/tecnologia');
const Social = require('../models/red_social');

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
        const lang = req.query.lang;

        const result = await Persona.findById(id);

        const tecno = await Tecnologia.findById(result.tecnologias);
        const idioma = await Idioma.findById(result.idiomas);
        const redes = await Social.findById(result.redes_sociales);

        const persona = {
            tecnologias: tecno.nombre,
            idiomas: idioma.nombre,
            redes_sociales: redes.nombre
        };

        persona.nombre = result.nombre;
        persona.apellidos = result.apellidos;
        persona.celular = result.celular;
        persona.correo = result.correo;
        persona.fecha_nacimiento = result.fecha_nacimiento;
        persona.descripcion = result.descripcion;

        //Crear el documento permitiendo que se pueda crear el archivo de salida
        const doc = new PDF({bufferPage: true});

        //Asignar nombre al archivo
        const filename = 'CV_' + persona.nombre + '.pdf';

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment; filename=' + filename
        });

        if(lang === 'es') {
            doc.fontSize(30);
            doc.text('Curriculum Vitae', {align: 'center'});
            doc.text('\n');
            doc.fontSize(20);
            doc.text(persona.nombre + ' ' + persona.apellidos, {align: 'center'});
            doc.text();
            doc.fontSize(16);
            doc.text(persona.descripcion, {align: 'center'});
            doc.text('\n');
            doc.fontSize(20);
            doc.text('Tecnologías: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.tecnologias, {align: 'left'});
            doc.text();
            doc.fontSize(20);
            doc.text('Idiomas: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.idiomas, {align: 'left'});
            doc.text();
            doc.fontSize(20);
            doc.text('Redes sociales: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.redes_sociales, {align: 'left'});
        }
        else {
            doc.fontSize(30);
            doc.text('Curriculum Vitae', {align: 'center'});
            doc.text('\n');
            doc.fontSize(20);
            doc.text(persona.nombre + ' ' + persona.apellidos, {align: 'center'});
            doc.text();
            doc.fontSize(16);
            doc.text(persona.descripcion, {align: 'center'});
            doc.text('\n');
            doc.fontSize(20);
            doc.text('Technologies: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.tecnologias, {align: 'left'});
            doc.text();
            doc.fontSize(20);
            doc.text('Languages: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.idiomas, {align: 'left'});
            doc.text();
            doc.fontSize(20);
            doc.text('Social media: ', {align: 'left'});
            doc.fontSize(16);
            doc.text(persona.redes_sociales, {align: 'left'});
        }

        doc.on('data', (data) => {
            stream.write(data);
        });

        doc.on('end', () => {
            stream.end();
        });

        doc.end();

    } catch (error) {
        console.log(error);
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
            //fecha_nacimiento,
            descripcion,
            tecnologias = ' ',
            idiomas = ' ',
            redes_sociales = ' '
        } = req.body;

        const tecnologia = new Tecnologia({
            nombre: tecnologias
        });

        await tecnologia.save();

        const idioma = new Idioma({
            nombre: idiomas
        });

        await idioma.save();

        const redes = new Social({
            nombre: redes_sociales
        });

        redes.save();

        const persona = new Persona({
            nombre,
            apellidos,
            celular,
            correo,
            fecha_nacimiento: new Date(),
            descripcion,
            tecnologias: tecnologia,
            idiomas: idioma,
            redes_sociales: redes
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
            //fecha_nacimiento,
            descripcion,
            tecnologias = '',
            idiomas = ''
        } = req.body;

        const persona = {
            nombre,
            apellido,
            celular,
            correo,
            fecha_nacimiento: new Date(),
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
            success: false,
            msg: 'Código equivocado'
        });
    }
}

const deletePersona = async(req = request, res = response) => {
    const id = req.body.id;

    await Persona.findOneAndDelete(id);

    res.status(201).json({
        success: true,
        msg: 'Se ha borrado a ' + id
    });
}

const verCV = async(req = request, res = response) => {
    const id = req.query.id;

        const { 
            nombre,
            apellidos,
            celular,
            correo,
            fecha_nacimiento,
            descripcion,
            tecnologias,
            idiomas,
            redes_sociales
        } = await Persona.findById(id);

        const tecno = await Tecnologia.findById(tecnologias);
        const idioma = await Idioma.findById(idiomas);
        const redes = await Social.findById(redes_sociales);

        const persona = {
            nombre,
            apellidos,
            celular,
            correo,
            fecha_nacimiento,
            descripcion,
            tecnologias: tecno.nombre,
            idiomas: idioma.nombre,
            redes_sociales: redes.nombre
        };



}

module.exports = {
    getPersonas, 
    getPersona,
    postPersona,
    putPersona,
    accessCode,
    deletePersona
}