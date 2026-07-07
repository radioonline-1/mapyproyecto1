function exito(titulo, texto = ""){

    Swal.fire({
        icon: "success",
        title: titulo,
        text: texto,
        timer: 2000,
        showConfirmButton: false
    });

}

function error(titulo, texto = ""){

    Swal.fire({
        icon: "error",
        title: titulo,
        text: texto
    });

}

function aviso(titulo, texto = ""){

    Swal.fire({
        icon: "warning",
        title: titulo,
        text: texto
    });

}

async function confirmar(titulo, texto){

    const r = await Swal.fire({

        title: titulo,

        text: texto,

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Sí",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#2563EB",

        cancelButtonColor: "#DC2626"

    });

    return r.isConfirmed;

}