
function getQuery(table) {
    return `SELECT * FROM finalProjectDb.${table}`;
}

function getByUsernameQuery(table) {
    return `SELECT * FROM finalProjectDb.${table} WHERE username = ? `;
}

export {
    getQuery,getByUsernameQuery
}