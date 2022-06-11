const { Schema, model } = require('mongoose');

const IdiomaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del idioma es obligatorio']
    },
    nivel: {
        type: String,
        required: [true, 'El nivel del idioma es obligatorio']
    }
});

module.exports = model('Idioma', IdiomaSchema);