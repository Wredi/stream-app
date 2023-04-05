export const getStreams = async () => {
    const response = await fetch('http://localhost:8000/webapi/active-streams/')
        .catch(error => { 
            throw new Error(error);
        });


    const data = await response.json();
    if(!response.ok) {
        throw new Response(data.error, { status: response.status });
    }

    return data;
};

export const login = async (user) => {
    const response = await fetch('http://localhost:8000/webapi/login/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
    })
    .catch(error => { 
        throw new Error(error);
    });

    const data = await response.json();
    if(!response.ok) {
        return data.error;
    }

    return null;
}

export const register = async (user) => {
    const response = await fetch('http://localhost:8000/webapi/register/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
    })
    .catch(error => { 
        throw new Error(error);
    });

    const data = await response.json();
    if(!response.ok) {
        return data.error;
    }

    return null;
}

export const updateStreamData = async (streamData) => {
    const response = await fetch('http://localhost:8000/webapi/update-stream/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(streamData),
        credentials: "include",
    })
    .catch(error => { 
        throw new Error(error);
    });

    const data = await response.json();
    return data;
}

export const isUserLogged = async () =>{
    const response = await fetch('http://localhost:8000/webapi/check-logged/', {credentials: "include"})
        .catch(error => { 
            throw new Error(error);
        });

    const data = await response.json();
    return data.isLogged;
}

export const logout = async () =>{
    await fetch('http://localhost:8000/webapi/logout/', {credentials: "include"})
        .catch(error => { 
            throw new Error(error);
        });
}

export async function loggedUserStreamData() {
    const response = await fetch('http://localhost:8000/webapi/stream-data/', {credentials: 'include'})
        .catch(error => { 
            throw new Error(error);
        });

    const data = await response.json();

    if(response.status === 401){
        return null;
    }

    if(!response.ok) {
        throw new Response(data.error, { status: response.status });
    }

    return data;
}

