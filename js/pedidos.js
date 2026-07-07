let pedidos = [];

async function cargarPedidos() {

    if(window.cache.pedidos){

        pedidos = window.cache.pedidos;

        pintarTablaPedidos();

        return;

    }

    mostrarLoader("Cargando pedidos...");

    const datos = await apiGet({
        action: "listarPedidos"
    });

    pedidos = datos.map(fila => ({

        id: fila[0],
        plataforma: fila[1],
        pedido: fila[2],
        cliente: fila[3],
        contacto: fila[4],
        fechaVenta: fila[5],
        moneda: fila[6],
        monto: fila[7],
        transportadora: fila[8],
        guia: fila[9],
        fechaEnvio: fila[10],
        estado: fila[11],
        motivo: fila[12],
        encargado: fila[13]

    }));

    window.cache.pedidos = pedidos;

    pintarTablaPedidos();

}
function pintarTablaPedidos(){

    if ($.fn.DataTable.isDataTable('#tablaPedidos')) {
        $('#tablaPedidos').DataTable().destroy();
    }

    const tbody=document.querySelector("#tablaPedidos tbody");

    tbody.innerHTML="";

    pedidos.forEach((pedido,index)=>{

        tbody.innerHTML+=`

        <tr>

            <td>${formatearFecha(pedido.fechaVenta)}</td>

            <td>${pedido.cliente}</td>

            <td>
                <span class="badge-plataforma ${obtenerClasePlataforma(pedido.plataforma)}">
                    ${pedido.plataforma}
                </span>
            </td>

            <td>${pedido.transportadora}</td>

            <td>
                <span class="estado estado-${pedido.estado.toLowerCase()}">
                    ${pedido.estado}
                </span>
            </td>

            <td>${formatearMonto(pedido.moneda,pedido.monto)}</td>

            <td>${pedido.encargado}</td>

            <td>

                <button class="btn-icon editar" onclick="editarPedido(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="btn-icon eliminar" onclick="eliminarPedido(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>

        `;

    });

    new DataTable("#tablaPedidos",{

        language:{
            url:"https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json"
        },

        pageLength:10,

        responsive:true

    });

    ocultarLoader();

}
function formatearMonto(moneda, monto){

    monto = Number(monto);

    switch(moneda){

        case "GS":
            return "₲ " + monto.toLocaleString("es-PY",{
    maximumFractionDigits:0
});

        case "BRL":
            return "R$ " + monto.toLocaleString("pt-BR",{
                minimumFractionDigits:2
            });

        case "USD":
            return "US$ " + monto.toLocaleString("en-US",{
                minimumFractionDigits:2
            });

        default:
            return monto;
    }

}
function formatearFecha(fecha){

    if(!fecha) return "";

    const f = new Date(fecha);

    return f.toLocaleDateString("es-PY",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
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

    document.getElementById("plataforma").value = "";
    document.getElementById("pedido").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("contacto").value = "";
    document.getElementById("fechaVenta").value = "";
    document.getElementById("moneda").value = "GS";
    document.getElementById("valor").value = "";
    document.getElementById("transportadora").value = "";
    document.getElementById("guia").value = "";
    document.getElementById("fechaEnvio").value = "";
    document.getElementById("estado").value = "Pendiente";
    document.getElementById("motivo").value = "";

    document.getElementById("modalPedido").style.display = "flex";

}
function cerrarModal(){

document.getElementById("modalPedido").style.display="none";

}
async function guardarPedido(){
    mostrarLoader("Guardando pedido...");
    
const usuario = JSON.parse(localStorage.getItem("usuario"));
    const datos = {

        action:"guardarPedido",

        plataforma:document.getElementById("plataforma").value,

        pedido:document.getElementById("pedido").value,

        cliente:document.getElementById("cliente").value,

        contacto:document.getElementById("contacto").value,


        fechaVenta:document.getElementById("fechaVenta")?.value || "",
        moneda: document.getElementById("moneda").value,

        valor:document.getElementById("valor").value,

        transportadora:document.getElementById("transportadora").value,

        guia:document.getElementById("guia").value,

        fechaEnvio:document.getElementById("fechaEnvio")?.value || "",

        estado:document.getElementById("estado").value,

        motivo:document.getElementById("motivo")?.value || "",

        encargado: usuario.nombre

    };

    const respuesta = await apiPost(datos);
    

if(respuesta.ok){

    window.cache.pedidos = null;

    cerrarModal();

    await cargarPedidos();

    exito("Pedido guardado correctamente");

}else{

    ocultarLoader();

    error("No se pudo guardar el pedido");

}

ocultarLoader();
}
function editarPedido(i){

    const pedido = pedidos[i];

    console.log(pedido);

}

async function eliminarPedido(i){

    const ok = await confirmar(

        "Eliminar pedido",

        "¿Desea eliminar este pedido?"

    );

    if(!ok) return;

    exito("Pedido eliminado");

}