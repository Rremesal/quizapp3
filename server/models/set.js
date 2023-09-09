import connect from '../db/connect.js'

class Set {
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
    }

    insertSingle = async () => {
        const conn = connect();
        return new Promise((resolve, reject) => {
            const result = conn.query("INSERT INTO sets (name, user_id) VALUES (?,?)", [this.name, this.userId], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
    
                if (result.insertId > 0) {
                    resolve(result.insertId)
                }
    
                reject(false)
            })
    
            conn.end();
            return result;
        }).catch(err => {
            console.log(err)
        })
    }

    static withId = async (id) => {
        const conn = connect();
        return new Promise((resolve, reject) => {
            const result = conn.query("SELECT * FROM sets WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
    
                if (result.length === 0) {
                    resolve(false);
                }
    
                resolve(result);
            })
            conn.end();
            return result;
        }).catch(err => {
            console.log(err)
        }) 
        
    }

    static withUserId = async (userId) => {
        const conn = connect();
        return new Promise((resolve, reject) => {
            const result = conn.query("SELECT * FROM sets WHERE user_id = ?", [userId], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
    
                if (result.length === 0) {
                    resolve(false);
                }
    
                resolve(result);
            })
            conn.end();
            return result;
        }).catch(err => {
            console.log(err)
        }) 
        
    }

    static deleteWithId = async (id) => {
        const conn = connect();
        return new Promise((resolve, reject) => {
            const result = conn.query("DELETE FROM sets WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                if (result.affectedRows === 0) {
                    return reject(false)
                }
                
                resolve(id)
            })
            conn.end();
            return result;
        }).catch(err => {
            console.log(err);
        })
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

export default Set