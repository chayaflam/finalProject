export function getPasswordQuery() {
    return `SELECT id from finalProjectDb.userPassword where userId=? AND userPassword=?`;
}

export function addPasswordQuery() {
    return `INSERT INTO finalProjectDb.userPassword VALUES(NULL, ?, ?)`
}

export function updatePasswordQuery( ) {
    return `UPDATE finalProjectDb.userPassword SET password=?  WHERE userId = ?`;
}
