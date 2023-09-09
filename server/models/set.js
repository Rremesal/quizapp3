import connect from '../db/connect'

class Set {
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
    }

    insert = () => {
        const conn = connect();
        conn.query("INSERT INTO sets (name, user_id) VALUES (?,?)", [this.name, this.userId], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.insertId > 0) {
                return true
            }

            return false
        })

        conn.end();
    }

    withId = (userId) => {
        const conn = connect();
        conn.query("SELECT * FROM sets WHERE user_id = ?", [userId], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.length > 0) {
                return result;
            }

            return false;
        })

        conn.end();
    }

    all = () => {
        const conn = connect();
        conn.query("SELECT * FROM sets",[], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.length > 0) {
                return result;
            }

            return false;
        })

        conn.end();
    }
}