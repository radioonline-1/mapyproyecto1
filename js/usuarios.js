let usuarios = [];

let editandoUsuario = false;

let idUsuario = null;

async function cargarUsuarios(){
mostrarLoader("Cargando usuarios...");
    usuarios = await apiGet({
        action:"listarUsuarios"
    });

    if($.fn.DataTable.isDataTable("#tablaUsuarios")){
        $("#tablaUsuarios").DataTable().destroy();
    }

    const tbody=document.querySelector("#tablaUsuarios tbody");

    tbody.innerHTML="";

    usuarios.forEach((u,index)=>{

        tbody.innerHTML+=`

        <tr>

            <td>${u[1]}</td>

            <td>${u[2]}</td>

            <td>${u[4]}</td>

            <td>

                <span class="estado estado-${u[5].toLowerCase()}">

                    ${u[5]}

                </span>

            </td>

            <td>

                <button class="btn-icon editar" onclick="editarUsuario(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="btn-icon eliminar" onclick="eliminarUsuario(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    new DataTable("#tablaUsuarios",{

        language:{
            url:"https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json"
        }

    });
ocultarLoader();
}

function nuevoUsuario(){

    editandoUsuario=false;

    idUsuario=null;

    document.getElementById("tituloUsuario").innerText="Nuevo Usuario";

    document.getElementById("nombreUsuario").value="";
    document.getElementById("correoUsuario").value="";
    document.getElementById("passwordUsuario").value="";
    document.getElementById("rolUsuario").value="Operador";
    document.getElementById("estadoUsuario").value="Activo";

    document.getElementById("modalUsuario").style.display="flex";

}

function cerrarModalUsuario(){

    document.getElementById("modalUsuario").style.display="none";

}

function editarUsuario(i){

    const u=usuarios[i];

    editandoUsuario=true;

    idUsuario=u[0];

    document.getElementById("tituloUsuario").innerText="Editar Usuario";

    document.getElementById("nombreUsuario").value=u[1];
    document.getElementById("correoUsuario").value=u[2];
    document.getElementById("passwordUsuario").value=u[3];
    document.getElementById("rolUsuario").value=u[4];
    document.getElementById("estadoUsuario").value=u[5];

    document.getElementById("modalUsuario").style.display="flex";

}

async function guardarUsuario(){

    const datos={

        action:editandoUsuario?"editarUsuario":"guardarUsuario",

        id:idUsuario,

        nombre:document.getElementById("nombreUsuario").value,

        correo:document.getElementById("correoUsuario").value,

        password:document.getElementById("passwordUsuario").value,

        rol:document.getElementById("rolUsuario").value,

        estado:document.getElementById("estadoUsuario").value

    };

    const r=await apiPost(datos);

    if(r.ok){

        cerrarModalUsuario();

        cargarUsuarios();

    }

}

async function eliminarUsuario(i){

    const ok = await confirmar(

        "Eliminar usuario",

        "¿Desea eliminar este usuario?"

    );

    if(!ok) return;

    exito("Usuario eliminado");

}