import mysql from 'mysql2/promise';
import 'dotenv/config'


async function executeQuery(query, params) {
    console.log("❤🚗💕👍✌🙌")
    let results;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });
    try {
        connection.connect();
        [results] = await connection.execute(query, params);
    } catch (err) {
        console.log(err);
    }
    finally {
        connection.end();
    }
   
    return results;
}

export {
    executeQuery
}