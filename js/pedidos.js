let pedidos = [];

async function cargarPedidos() {

    const datos = await apiGet({
        action: "listarPedidos"
    });

    pedidos = datos;

    if ($.fn.DataTable.isDataTable('#tablaPedidos')) {
        $('#tablaPedidos').DataTable().destroy();
    }

    const tbody = document.querySelector("#tablaPedidos tbody");
    tbody.innerHTML = "";

    pedidos.forEach((fila, index) => {

        const monto = Number(fila[6] || 0).toLocaleString("es-PY");

        tbody.innerHTML += `
            <tr>

                <td>${fila[2]}</td>
                <td>${fila[3]}</td>
                <td>
    <span class="badge-plataforma ${obtenerClasePlataforma(fila[1])}">
        ${fila[1]}
    </span>
</td>
                <td>${fila[7]}</td>

                <td>
                    <span class="estado estado-${String(fila[10]).toLowerCase()}">
                        ${fila[10]}
                    </span>
                </td>

                <td>Gs. ${monto}</td>

                <td>${fila[12]}</td>

                <td>

                    <button class="btn-icon editar" onclick="editarPedido(${index})" title="Editar">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn-icon eliminar" onclick="eliminarPedido(${index})" title="Eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </td>

            </tr>
        `;
    });

    new DataTable("#tablaPedidos", {
        language: {
            url: "https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json"
        },
        pageLength: 10,
        responsive: true,
        order: [[0, "desc"]]
    });

}
function obtenerClasePlataforma(plataforma){

    switch(plataforma){

        case "E-COMMERCE(SITE)":
            return "site";

        case "VENTA ONLINE":
            return "online";

        case "Mercado Libre":
            return "ml";

        case "Shopee":
            return "shopee";

        case "WhatsApp":
            return "whatsapp";

        case "Tienda":
            return "tienda";

        default:
            return "default";

    }

}
function filtrarPedidos(){

    const texto=document.getElementById("buscarPedido").value.toLowerCase();

    const filas=document.querySelectorAll("#listaPedidos tr");

    filas.forEach(fila=>{

        fila.style.display=fila.innerText.toLowerCase().includes(texto)
        ? ""
        : "none";

    });

}

function nuevoPedido(){

document.getElementById("modalPedido").style.display="flex";

}
function cerrarModal(){

document.getElementById("modalPedido").style.display="none";

}
async function guardarPedido(){

    const datos = {

        action:"guardarPedido",

        plataforma:document.getElementById("plataforma").value,

        pedido:document.getElementById("pedido").value,

        cliente:document.getElementById("cliente").value,

        contacto:document.getElementById("contacto").value,

        fechaVenta:document.getElementById("fechaVenta")?.value || "",

        valor:document.getElementById("valor").value,

        transportadora:document.getElementById("transportadora").value,

        guia:document.getElementById("guia").value,

        fechaEnvio:document.getElementById("fechaEnvio")?.value || "",

        estado:document.getElementById("estado").value,

        motivo:document.getElementById("motivo")?.value || "",

        encargado:"Administrador"

    };

    const respuesta = await apiPost(datos);

    if(respuesta.ok){

        alert("Pedido guardado correctamente");

        cerrarModal();

        cargarPedidos();

    }else{

        alert("Error al guardar");

    }

}
function editarPedido(i){

    alert("Editar pedido "+pedidos[i].pedido);

}

function eliminarPedido(i){

    if(confirm("¿Eliminar pedido?")){

        pedidos.splice(i,1);

        cargarPedidos();

    }

}