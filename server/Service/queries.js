
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

function getTodayMessagesQuery(){
 return `SELECT * FROM finalProjectDb.messages WHERE DATE(date) =curdate() and TIME(date)<=curtime() and( babyId=? || babyId  = (select distinct nurseryClassId from finalProjectDb.child where childId=?));`   
}

function getFeedingDataQuery(){
    return `SELECT DATE(date) AS day, SUM(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(message, 'food-', -1), 'cc', 1) AS UNSIGNED)) AS total_number FROM finalprojectdb.messages WHERE date between CURDATE() - INTERVAL 7 day and CURDATE()-interval 1 day and  babyId=? GROUP BY DATE(date) ORDER BY DATE(date) DESC;`
}

export {
    getQuery,getByParamQuery,postQuery,getChildrenByTeacherId,getTodayMessagesQuery,getFeedingDataQuery
}

