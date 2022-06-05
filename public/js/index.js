
//Parte de código de admin
const btnCode = document.getElementById('btn-code');

btnCode.onclick = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    
    const code = document.getElementById('text-code').value;

    fetch("http://localhost:8080/api/usuarios/code?code=" + code, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.success === true) {
                window.location.href = 'http://localhost:8080/html/admin.html';
            }
        })
        .catch(error => console.log('error', error));
}