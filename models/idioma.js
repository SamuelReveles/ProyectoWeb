class Idioma {

    constructor(nombre = '', nivel = '') {
        this.nombre = nombre;
        this.nivel = nivel;
    }

    setNombre(nombre = ''){
        this.nombre = nombre;
    }

    setNivel(nivel = ''){
        this.nivel = nivel;
    }

}

module.exports = Idioma;