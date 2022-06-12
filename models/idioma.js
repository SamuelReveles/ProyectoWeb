const { Schema, model } = require('mongoose');

const IdiomaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del idioma es obligatorio']
    }
});

module.exports = model('Idioma', IdiomaSchema);