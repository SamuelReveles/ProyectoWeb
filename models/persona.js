const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la persona es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos de la pesona son obligatorios']
    },
    celular: {
        type: String,
        required: [true, 'El celular de contacto es obligatorios']
    },
    correo: {
        type: String,
        required: [true, 'El correo de contacto es obligatorio']
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción personal es obligatoria']
    },
    tecnologias: [{
        type: Object
    }],
    idiomas: [{
        type: Object
    }]
});

module.exports = model('Persona', PersonaSchema);