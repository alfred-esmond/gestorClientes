document.addEventListener("DOMContentLoaded", init);
const URL_API = 'http://localhost:3000/api/'


var customers = []


function init() {
    search()
}

function agregar(){
    clean()
    abrirFormulario()

}

function abrirFormulario() {
    htmlModale = document.getElementById("modale");
    htmlModale.setAttribute("class", "modale opened");
}

function cerrarModale() {
    htmlModale = document.getElementById("modale");
    htmlModale.setAttribute("class", "modale");
}

async function search() {
    var url = URL_API + 'customers'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Conten-Type": 'application/json'
        }
    })

    customers = await response.json();


    var html = ''
    for (customer of customers) {

        var row = `
            <tr>
                <td>${customer.firstname}</td>
                <td>${customer.lastname}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <a href="#" onclick="remove(${customer.id})" class="myButton">Eliminar</a>
                    <a href="#" onclick="edit(${customer.id})" class="myButton">Editar</a>
                </td>
            </tr>
    `
        html = html + row;
    }
    document.querySelector('#customers > tbody').outerHTML = html

}


function edit(id){
    abrirFormulario()
    var customer = customers.find(x => x.id == id)
    document.getElementById('txtId').value = customer.id
    document.getElementById('txtAddress').value = customer.address
    document.getElementById('txtEmail').value = customer.email
    document.getElementById('txtFirstname').value = customer.firstname
    document.getElementById('txtLastname').value = customer.lastname
    document.getElementById('txtPhone').value = customer.phone
}


async function remove(id) {
    respuesta = confirm('Quieres eliminarlo?')
    if (respuesta) {

        var url = URL_API + 'customers/' + id
        await fetch(url, {
            "method": 'DELETE',
            "headers": {
                "Conten-Type": 'application/json'
            }
        })
        window.location.reload();
    }
}

function clean(){
    document.getElementById('txtId').value = ''
    document.getElementById('txtAddress').value = ''
    document.getElementById('txtEmail').value = ''
    document.getElementById('txtFirstname').value = ''
    document.getElementById('txtLastname').value = ''
    document.getElementById('txtPhone').value = ''
}

async function save() {
    var data = {
        "address": document.getElementById('txtAddress').value,
        "email": document.getElementById('txtEmail').value,
        "firstname": document.getElementById('txtFirstname').value,
        "lastname": document.getElementById('txtLastname').value,
        "phone": document.getElementById('txtPhone').value
    }
    var id = document.getElementById('txtId').value
    if (id != '') {
        data.id = id
    }

    var url = URL_API + 'customers'
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(data),
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    window.location.reload();

}

document.addEventListener("DOMContentLoaded", function () {
    // Agrega un listener para el evento de teclado
    document.addEventListener("keydown", function (event) {
        // Verifica si la tecla presionada es "Enter" (código 13)
        if (event.key === "Enter") {
            // Verifica si el modal está abierto (tiene la clase 'opened')
            var modal = document.getElementById("modale");
            if (modal.classList.contains("opened")) {
                // Evita el comportamiento por defecto del Enter en los formularios
                event.preventDefault();
                // Simula el clic en el botón de Guardar
                document.getElementById("btnGuardar").click();
            }
        }
    });
});
