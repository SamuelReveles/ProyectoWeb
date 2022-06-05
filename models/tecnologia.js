class Tecnologia {

    constructor(nombre = '', dominio = 0) {
        this.nombre = nombre;
        this.dominio = dominio;
    }

    setNombre(nombre = '') {
        this.nombre = nombre;
    }

    setDominio(dominio = ''){
        this.dominio = dominio;
    }

}

module.exports = Tecnologia;