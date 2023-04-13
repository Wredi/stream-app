export const getStreams = async () => {
    const response = await fetch('http://localhost:8000/webapi/streams/active/')
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
    const response = await fetch('http://localhost:8000/webapi/post-session/', {
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
    const response = await fetch('http://localhost:8000/webapi/users/new/', {
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
    const response = await fetch('http://localhost:8000/webapi/users/me/post-stream/', {
        method: "PUT",
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

export async function loggedUserStreamData() {
    const response = await fetch('http://localhost:8000/webapi/users/me/stream/', {credentials: 'include'})
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


export async function loggedUserChannelData() {
    const response = await fetch('http://localhost:8000/webapi/users/me/channel/', {credentials: 'include'})
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

export const updateChannelData = async (streamData) => {
    const response = await fetch('http://localhost:8000/webapi/users/me/channel-update/', {
        method: "PUT",
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

export const getUserDataByUsername = async (username) => {
    const response = await fetch(`http://localhost:8000/webapi/users/${username}/full-info/`)
    .catch(error => { 
        throw new Error(error);
    });

    const data = await response.json();
    if(!response.ok) {
        throw new Response(data.error, { status: response.status });
    }
    
    return data;
}