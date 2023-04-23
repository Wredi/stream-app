export const API_URL = 'http://localhost:8000/webapi';
export const STREAM_URL = 'http://127.0.0.1:8080/hls';

export async function queryApi(path){
    const response = await fetch(`${API_URL}${path}`, {credentials: 'include'})
        .catch(error => { 
            throw new Error(error);
        });

    const data = await response.json();
    if(response.ok) {
        return data;
    }

    return {error: data.error, status: response.status};
}

export async function sendApi(path, method, body){
    const response = await fetch(`${API_URL}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    })
    .catch(error => { 
        throw new Error(error);
    });

    if(response.ok) {
        return null;
    }

    const data = await response.json();
    return {error: data.error, status: response.status};
}


export const isUserLogged = async () =>{
    const response = await fetch('http://localhost:8000/webapi/session/', {credentials: "include"})
        .catch(error => { 
            throw new Error(error);
        });

    const data = await response.json();
    return data.isLogged;
}

export const logout = async () =>{
    await fetch('http://localhost:8000/webapi/delete-session/', {credentials: "include", method: "DELETE"})
        .catch(error => { 
            throw new Error(error);
        });
}