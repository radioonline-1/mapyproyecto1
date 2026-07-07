const API = "https://script.google.com/macros/s/AKfycbw8fqaJyM8AIw3-ZkiHEeyg4w1PCWoet5WCXeU-0rkXdOXE4jIifp5rdtKyiLeUiMnN6w/exec";

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

}