export function getFeedingDataQuery() {
    return `SELECT DATE(date) AS day, SUM(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(message, 'food-', -1), 'cc', 1) AS UNSIGNED)) AS total_number FROM finalprojectdb.messages WHERE date between CURDATE() - INTERVAL 7 day and CURDATE()-interval 1 day and  childId=? GROUP BY DATE(date) ORDER BY DATE(date) DESC;`
}

export function getTodayMessagesQuery() {
    return `SELECT * FROM finalProjectDb.messages WHERE DATE(date) =curdate() and TIME(date)<=curtime() and( childId=? || childId  = (select distinct childrenClassId from finalProjectDb.child where childId=?));`
}

export function postQuery() {
    return `INSERT INTO finalprojectdb.messages (senderName, childId, message, date) VALUES (?,?,?,?) `;
}
