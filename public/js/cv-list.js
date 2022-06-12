const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
};

const requestOptions_Get = {
    method: 'GET',
    redirect: 'follow'
};

let resultado = [];
datos = document.getElementById('data');
container = document.getElementById('container');

fetch("http://localhost:8080/api/usuarios", requestOptions_Get)
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
                                        <button class="btn btn-danger" onclick="deleteCV('${element._id}');">Delete CV</button>
                                        <button class="btn btn-warning" onclick="editCV('${element._id}');">Edit CV</button>
                                    </div>
                                    <br>`;
        });
    })
    .catch(error => console.log('error', error));

function deleteCV(id) {
    console.log('Aquí es donde aparecerá el PDF de ' + id);
}