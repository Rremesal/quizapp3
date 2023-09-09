import mysql from 'mysql2';

const connect = () => {
    let conn = null;
    try {
        conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "quiz"
        });

        return conn;
    } catch {
        console.log(`SOMETHING WENT WRONG WHILE CONNECTING TO DB`);
    } 
} 

export default connect;