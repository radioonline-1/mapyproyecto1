const API = "https://script.google.com/macros/s/AKfycbw8fqaJyM8AIw3-ZkiHEeyg4w1PCWoet5WCXeU-0rkXdOXE4jIifp5rdtKyiLeUiMnN6w/exec";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    const url = new URL(API);

    url.searchParams.append("action", "login");
    url.searchParams.append("correo", correo);
    url.searchParams.append("password", password);

    try{

        const respuesta = await fetch(url);

        const datos = await respuesta.json();

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

        document.getElementById("mensaje").innerHTML = `
            <div class="error-login">
                Error al conectar con el servidor.
            </div>
        `;

        console.error(error);

    }

});