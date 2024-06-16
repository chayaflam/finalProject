
async function getFetchRequest(user, URL, tablename, params) {
    let dataFromServer;
    try {
        await fetch(`${URL}/${tablename}/${params[0]}`, {
            method: 'GET',
            headers: { Authorization: user.token }
        }).then(response => response.json()).then(data => {
            dataFromServer = data
            
        }).catch(fetchError => fetchError)
        return dataFromServer;
    } catch (userError) {
        return userError
    }
}

async function postFetchRequest(URL, tablename, params) {
    let dataFromServer;
    let status;
    try {
        await fetch(`${URL}/${tablename}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params[0])
        }).then((response) => {
            status = response.status;
            return response.json();
        }).then(data => {
            if (status != 200) throw data.error;
            dataFromServer = data;
        }).catch(error => error)
        return dataFromServer;
    } catch (err) { err }
}
export { postFetchRequest, getFetchRequest }