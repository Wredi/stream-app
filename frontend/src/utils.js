export const getStreams = async () => {
    const response = await fetch('http://localhost:8000/login/active-streams/', {method: 'POST'});

    if(response.status !== 201) {
        return response.json().then(errorData => {
            throw new Response(errorData.error, { status: response.status });
        });
    }

    if(!response.ok){
        throw new Error('Something went wrong');
    }

    const data = await response.json();
    return data;
};
