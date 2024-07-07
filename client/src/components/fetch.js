async function getFetchRequest(URL, tablename, params) {
    try {
        const result = await fetch(`${URL}/${tablename}/${params[0]}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Origin': 'http://localhost:8080'
            }
        })
        const response = await result.json();
        return response;
    } catch (err) {
        return err
    }
}

async function postFetchRequest(URL, tablename, params, onReady, onError) {
    try {
        const result = await fetch(`${URL}/${tablename}`, {
            method: 'POST',
            body: JSON.stringify(params[0]),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Origin': 'http://localhost:8080'
            }
        })
        const response = await result.json();
        onReady(response);
    }
    catch (err) {
        onError(err)
    }
}

export { postFetchRequest, getFetchRequest }

