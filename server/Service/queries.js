
function getQuery(table) {
    return `SELECT * FROM finalProjectDb.${table}`;
}

function getByParamQuery(table,param) {
    return `SELECT * FROM finalProjectDb.${table} WHERE ${param} = ? `;
}

function postQuery(table) {
    return `INSERT INTO finalprojectdb.${table} (babyId, message, date) VALUES (?,?,?) `;
}

export {
    getQuery,getByParamQuery,postQuery
}