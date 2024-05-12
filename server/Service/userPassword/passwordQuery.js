function getPasswordQuery() {
    return `SELECT id from finalProjectDb.userPassword where userId=? AND userPassword=?`;
}

function addPasswordQuery() {
    return `INSERT INTO finalProjectDb.userPassword VALUES(NULL, ?, ?)`
}

function updatePasswordQuery( ) {
    return `UPDATE finalProjectDb.userPassword SET password=?  WHERE userId = ?`;
}

export {getPasswordQuery, addPasswordQuery, updatePasswordQuery };