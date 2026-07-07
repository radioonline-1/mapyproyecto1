function mostrarLoader(texto="Cargando..."){

    document.getElementById("loaderTexto").innerText=texto;

    document.getElementById("loader").style.display="flex";

}

function ocultarLoader(){

    document.getElementById("loader").style.display="none";

}