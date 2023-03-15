export const getStreams = async () => {
    const data = await fetch('http://localhost:8000/login/active-streams/')
    .then(response => {
        if (response.status !== 201) {
            throw new Response(response.error, { status: response.status });
        }
        return response.json();
    })
    .catch(error => {
        throw new Response("Unexpected error happenned", { status: 404 });
    });

    return data;
};