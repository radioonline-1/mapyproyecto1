const API = "https://script.google.com/macros/s/AKfycbxsoSIWG9_LSzt5ZObBfdoFDlhUwryDtCtyD6aZwP9dpwlvrDoItsTK0l8Xqg4noTfwPQ/exec";

async function apiGet(params = {}) {

    const url = new URL(API);

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    const respuesta = await fetch(url);

    return await respuesta.json();

}

async function apiPost(data = {}) {

    const respuesta = await fetch(API, {

        method: "POST",

        body: JSON.stringify(data)

    });

    return await respuesta.json();

}async function apiGet(params = {}) {

    const url = new URL(API);

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    console.log(url.toString()); // ← agrega esto

    const respuesta = await fetch(url);

    return await respuesta.json();

}