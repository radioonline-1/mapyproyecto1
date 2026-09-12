const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    location.href = "index.html";
}

document.getElementById("usuario").textContent = usuario.nombre;


async function cargar(pagina, titulo, elemento){

    document.getElementById("titulo").textContent = titulo;

    // Quitar activo de todos
    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
    });

    // Marcar seleccionado
    if(elemento){
        elemento.classList.add("active");
    }

    // Si estamos entrando a Inicio y no viene elemento
    if(pagina === "inicio" && !elemento){

        const inicio = document.querySelector(".menu-item");

        if(inicio){
            inicio.classList.add("active");
        }

    }

    try {

        const respuesta = await fetch(
            "pages/" + pagina + ".html"
        );

        if(!respuesta.ok){
            throw new Error("No se pudo cargar la página");
        }

        document.getElementById("contenido").innerHTML =
            await respuesta.text();


        // =========================
        // INICIO
        // =========================

        if(pagina === "inicio"){

            cargarInicio();

        }


        // =========================
        // PEDIDOS
        // =========================

        if(pagina === "pedidos"){

            if(!window.pedidosScript){

                const script = document.createElement("script");

                script.src = "js/pedidos.js?v=2";

                script.onload = () => {

                    window.pedidosScript = true;

                    cargarPedidos();

                };

                document.body.appendChild(script);

            }else{

                cargarPedidos();

            }

        }


        // =========================
        // USUARIOS
        // =========================

        if(pagina === "usuarios"){

            if(!window.usuariosScript){

                const script = document.createElement("script");

                script.src = "js/usuarios.js";

                script.onload = () => {

                    window.usuariosScript = true;

                    cargarUsuarios();

                };

                document.body.appendChild(script);

            }else{

                cargarUsuarios();

            }

        }

    }catch(error){

        console.error(error);

    }

}


// =====================================
// CARGAR INICIO
// =====================================

async function cargarInicio(){

    const tbody = document.getElementById("ultimosPedidos");

    if(!tbody){
        return;
    }

    mostrarLoader("Cargando inicio...");

    try {

        let pedidosInicio;


        // =========================
        // USAR CACHE
        // =========================

        if(window.cache && window.cache.pedidos){

            pedidosInicio = window.cache.pedidos;

        }else{

            // =========================
            // CONSULTAR API
            // =========================

            const datos = await apiGet({
                action: "listarPedidos"
            });


            pedidosInicio = datos.map(fila => ({

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


            // Guardar cache

            if(window.cache){

                window.cache.pedidos = pedidosInicio;

            }

        }


        // =========================
        // CONTADORES
        // =========================

        const total = pedidosInicio.length;

        const pendientes = pedidosInicio.filter(p =>
            String(p.estado).toLowerCase() === "pendiente"
        ).length;

        const enviados = pedidosInicio.filter(p =>
            String(p.estado).toLowerCase() === "enviado"
        ).length;

        const entregados = pedidosInicio.filter(p =>
            String(p.estado).toLowerCase() === "entregado"
        ).length;


        document.getElementById("totalPedidos").textContent = total;

        document.getElementById("pendientes").textContent = pendientes;

        document.getElementById("enviados").textContent = enviados;

        document.getElementById("entregados").textContent = entregados;


        // =========================
        // ÚLTIMOS PEDIDOS
        // =========================

        tbody.innerHTML = "";


        if(pedidosInicio.length === 0){

            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center">
                        Sin registros
                    </td>
                </tr>
            `;

        }else{

            // Tomar últimos 5
            const ultimos = [...pedidosInicio]
                .reverse()
                .slice(0, 5);


            ultimos.forEach(pedido => {

                tbody.innerHTML += `

                    <tr>

                        <td>
                            ${pedido.pedido || ""}
                        </td>

                        <td>
                            ${pedido.cliente || ""}
                        </td>

                        <td>
                            <span class="estado estado-${String(pedido.estado || "").toLowerCase()}">
                                ${pedido.estado || ""}
                            </span>
                        </td>

                        <td>
                            ${pedido.transportadora || ""}
                        </td>

                    </tr>

                `;

            });

        }

    }catch(error){

        console.error("Error cargando inicio:", error);

        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    Error al cargar los pedidos
                </td>
            </tr>
        `;

    }finally{

        ocultarLoader();

    }

}


// =====================================
// SALIR
// =====================================

function salir(){

    localStorage.removeItem("usuario");

    location.href = "index.html";

}


// =====================================
// CARGA INICIAL
// =====================================

cargar("inicio", "Inicio");
