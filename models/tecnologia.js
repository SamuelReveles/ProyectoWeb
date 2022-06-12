const { Schema, model } = require('mongoose');

const TecnologiaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del idioma es obligatorio']
    }
});

module.exports = model('Tecnologia', TecnologiaSchema);