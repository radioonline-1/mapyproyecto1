const API = "https://script.google.com/macros/s/AKfycbxsoSIWG9_LSzt5ZObBfdoFDlhUwryDtCtyD6aZwP9dpwlvrDoItsTK0l8Xqg4noTfwPQ/exec";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    const url = new URL(API);

    url.searchParams.append("action", "login");
    url.searchParams.append("correo", correo);
    url.searchParams.append("password", password);

 mostrarLoader("Iniciando sesión...");

try{

    const respuesta = await fetch(url);

    const datos = await respuesta.json();

    ocultarLoader();

        if(datos.ok){

            localStorage.setItem("usuario", JSON.stringify(datos));

            window.location = "dashboard.html";

        }else{

            document.getElementById("mensaje").innerHTML = `
                <div class="error-login">
                    ${datos.mensaje}
                </div>
            `;

        }

    }catch(error){

    ocultarLoader();

    document.getElementById("mensaje").innerHTML=`
        <div class="error-login">
            Error al conectar con el servidor.
        </div>
    `;

    console.error(error);

}

});