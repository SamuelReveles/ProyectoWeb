const { Schema, model } = require('mongoose');

const TecnologiaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del idioma es obligatorio']
    },
    dominio: {
        type: String,
        required: [true, 'El dominio de la tecnología es obligatorio']
    }
});

module.exports = model('Tecnologia', TecnologiaSchema);