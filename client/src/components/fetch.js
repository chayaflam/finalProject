
export default async function getFetchRequest(user, URL, tablename, params) {
    try {
        fetch(`${URL}/${tablename}/${params[0]}`, {
            method: 'GET',
            headers: { Authorization: user.token }
        }).then(response => response.json())
            .catch(fetchError => fetchError)
    } catch (userError) {
        return userError
    }
}

export default async function postFetchRequest(URL, tablename, params) {
    try {
        fetch(`${URL}/${tablename}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params[0])
        }).then((response) => {
            return response.json();
        }) .catch(fetchError => fetchError)
    } catch (userError) {
        return userError
    }
}