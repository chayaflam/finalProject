export function getQuery(table) {
    return `SELECT * FROM finalProjectDb.${table}`;
}

export function getByParamQuery(table,param) {
    return `SELECT * FROM finalProjectDb.${table} WHERE ${param} = ? `;
}


