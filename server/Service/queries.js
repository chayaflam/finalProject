
function getQuery(table) {
    return `SELECT * FROM finalProjectDb.${table}`;
}

function getByParamQuery(table,param) {
    return `SELECT * FROM finalProjectDb.${table} WHERE ${param} = ? `;
}

function postQuery(table) {
    return `INSERT INTO finalprojectdb.${table} (senderName, babyId, message, date) VALUES (?,?,?,?) `;
}

function getChildrenByTeacherId(data){
   return `select * from finalProjectDb.child where nurseryclassid= (SELECT idNurseryclass FROM finalProjectDb.nurseryclass WHERE teacherId = ${data} )`;
}

export {
    getQuery,getByParamQuery,postQuery,getChildrenByTeacherId
}