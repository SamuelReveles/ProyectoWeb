const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let resultado = [];
datos = document.getElementById('data');
container = document.getElementById('container');

fetch("http://localhost:8080/api/usuarios", requestOptions)
    .then(response => response.json())
    .then(result => {
        resultado = result;
        console.log('Resultados: ' + resultado);
        console.log('--------------------------------');

        console.log('Son: ', resultado[0]);
        resultado.forEach(element => {
            container.innerHTML += `<div class="Tarjeta">
                                        <h3>${element.nombre + ' ' +element.apellidos}</h3>
                                        <p>${element.descripcion}</p>
                                        <br>
                                        <button class="btn btn-warning" onclick="verCV('${element._id}');">Get CV</button>
                                    </div>
                                    <br>`;
        });
    })
    .catch(error => console.log('error', error));

function verCV(id) {
    window.location.replace(`http://localhost:8080/api/usuarios/persona?id=${id}&lang=en`);
}