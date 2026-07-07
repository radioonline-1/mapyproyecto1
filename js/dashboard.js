const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    location.href = "index.html";
}

document.getElementById("usuario").textContent = usuario.nombre;

async function cargar(pagina, titulo, elemento){

    document.getElementById("titulo").textContent = titulo;

    // Quitar el color azul de todos
    document.querySelectorAll(".menu-item").forEach(item=>{
        item.classList.remove("active");
    });

    // Marcar el seleccionado
    if(elemento){
        elemento.classList.add("active");
    }

    const respuesta = await fetch("pages/" + pagina + ".html");

    document.getElementById("contenido").innerHTML = await respuesta.text();

    if(pagina === "pedidos"){

        if(!window.pedidosScript){

            const script=document.createElement("script");

            script.src="js/pedidos.js";

            script.onload=()=>{

                window.pedidosScript=true;

                cargarPedidos();

            }

            document.body.appendChild(script);

        }else{

            cargarPedidos();

        }

    }
if(pagina==="usuarios"){

    if(!window.usuariosScript){

        const script=document.createElement("script");

        script.src="js/usuarios.js";

        script.onload=()=>{

            window.usuariosScript=true;

            cargarUsuarios();

        }

        document.body.appendChild(script);

    }else{

        cargarUsuarios();

    }

}
}
function salir() {

    localStorage.removeItem("usuario");

    location.href = "index.html";

}

cargar("inicio", "Dashboard");