console.log("Entro al main.js");
const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_animales_zoo";
const tblUsuarios = document.getElementById("tblUsuarios");

function cargarUsuarios() {
    fetch(base_url_api + "/Main/alumnos",
        {
            method: "GET"
        }
    )
        .then(response => response.json()) // Aquí se convierte a json
        .then(result => {
            console.log(result);
            tblUsuarios.innerHTML = "";
            for (const usuario of result.data) {
                let tr = `<tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.cantidad}</td>
            </tr>`;
                tblUsuarios.innerHTML += tr;
            }
            if (result.data.length == 0) {
                tblUsuarios.innerHTML = `<tr><td colspan="5" class="text-center">No hay usuarios</td></tr>`;
            }
        }) // Aquí sale la data
        .catch(error => {
            console.log("Error detectado!");
        }) // Aquí se manejan los errores
}


function agregarUsuario() {
    console.log("Entro a agregarUsuario");
    let form_data = new FormData();
    form_data.append("id", document.getElementById("id").value);
    form_data.append("nombre", document.getElementById("nombre").value);
    form_data.append("cantidad", document.getElementById("cantidad").value);
    

    fetch(base_url_api + "/Main/alumnos",
        {
            method: "POST",
            body: form_data
        }
    )
        .then(response => response.json()) // Aquí se convierte a json
        .then(result => {
            console.log(result);
            limpiarFormulario();
            cargarUsuarios();
        }) // Aquí sale la data
        .catch(error => {
            console.log("Error detectado!");
        }) // Aquí se manejan los errores
}

function limpiarFormulario() {
    // Limpiar el formulario
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
   
}


cargarUsuarios();