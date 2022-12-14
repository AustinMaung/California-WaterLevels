async function postRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data,
    })
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const result = await response.json()
    return result
}