const requestOptions_Get = {
    method: 'GET',
    redirect: 'follow'
};

let resultado = [];
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
                                        <button class="btn btn-danger" id="botonsito" onclick="deleteCV('${element._id}');">Delete CV</button>
                                    </div>
                                    <br>`;
        });
    })
    .catch(error => console.log('error', error));

function deleteCV(id) {
    var requestOptions_Delete = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8080/api/usuarios/", requestOptions_Delete)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            location.reload();
        })
        .catch(error => console.log('error', error));
}