import connect from '../db/connect.js'
import bcrypt from 'bcrypt'

class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    insert = () => {
        const conn = connect();

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(this.password, salt).then(hash => {
                conn.query("INSERT INTO users (name, password) VALUES (?,?)", [this.name, hash], (err, result) => {
                    if (err) {
                        console.log(err);
                        return "Error: insert";
                    }

                    if (result.insertId > 0) {
                        return true;
                    }

                    return false;
                })
            })
        })

        conn.end();
    }

    login = (inputName, inputPassword) => {
        const conn = connect();

        conn.query("SELECT * FROM users WHERE name = ?", [inputName], (err, result) => {
            if (err) {
                console.log("Error: login");
                return;
            }

            if (result.length > 0) {
               return bcrypt.compareSync(inputPassword, result[0].password);
            }

            return "Error: failed login";


        })
    }
}