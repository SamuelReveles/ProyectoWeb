const { Schema, model } = require('mongoose');

const SocialSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la red social es obligatorio']
    },
    enlace: {
        type: String,
        required: [true, 'El enlace de la red social es obligatorio']
    }
});

module.exports = model('Social', SocialSchema);