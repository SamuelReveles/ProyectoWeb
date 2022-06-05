const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let resultado = [];
datos = document.getElementById('data');

fetch("http://localhost:8080/api/usuarios", requestOptions)
    .then(response => response.json())
    .then(result => {
        resultado = result;
        console.log('Resultados: ' + resultado);
        console.log('--------------------------------');

        console.log('Son: ', resultado[0]);
        resultado.forEach(element => {
            document.body.innerHTML += `<p>${element.nombre}</p>`;
        });
    })
    .catch(error => console.log('error', error));

//Arreglo con resultados guardado en resultado

/*  Ejemplo de cómo agregar los elementos con un for
    resultado.forEach(element => {
        document.body.innerHTML += `<p>${element.nombre}</p>`;
    });
*/