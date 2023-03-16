export const getStreams = async () => {
    const response = await fetch('http://localhost:8000/login/active-streams/')
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
    const response = await fetch('http://localhost:8000/login/login/', {
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

