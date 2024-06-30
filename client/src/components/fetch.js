
async function getFetchRequest(URL, tablename, params) {
    let dataFromServer;
    try {
        await fetch(`${URL}/${tablename}/${params[0]}`, {
            method: 'GET',
          //  headers: { authorization: token },
            credentials: 'include',
            withCredentials: true, // should be there

        }).then(response => response.json()).then(data => {
            dataFromServer = data

        }).catch(fetchError => fetchError)
        return dataFromServer;
    } catch (userError) {
        return userError
    }
}

// async function postFetchRequest(URL, tablename, params) {
//     let dataFromServer;
//     let status;
//     try {
//         await fetch(`${URL}/${tablename}`, {
//             method: 'POST',
//             headers: { 'Content-type': 'application/json; charset=UTF-8' },
//             body: JSON.stringify(params[0])
//         }).then((response) => {
//             status = response.status;
//             return response.json();
//         }).then(data => {
//             if (status != 200) throw data.error;
//             dataFromServer = data;
//         }).catch(error => error)
//         return dataFromServer;
//     } catch (err) { err }
// }

async function postFetchRequest(URL, tablename, params, onReady, onError) {
    console.log(params)

    fetch(`${URL}/${tablename}`, {
        method: 'POST',
        body: JSON.stringify(params[0]),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(response => {
        if (!response.ok)
            throw response.statusText;
        return response.json();
    }).then(json => {
        onReady(json);
    }).catch(status => onError(status))

    // let dataFromServer;
    // let status;
    // try {
    //     const response = await fetch(`${URL}/${tablename}`, {
    //         method: 'POST',
    //         headers: { 'Content-type': 'application/json; charset=UTF-8' },
    //         body: JSON.stringify(params[0])
    //     })
    //     if (response.ok) {
    //         const data = await response.json();
    //        return data;
    //     }
    //     else {
    //         if (response.status == 500)
    //             alert("oops somthing went wrong... please try again!")
    //         else
    //             alert("You are not allowed to enter!")
    //     }
    // } catch (error) {
    //     console.error("Error:", error);
    // }
}
///-------------------------------------------
///-------------------------------------------



export { postFetchRequest, getFetchRequest }

