import bcrypt from 'bcrypt'

class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    insert = () => {

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(this.password, salt).then(hash => {
            })
        })

        conn.end();
    }

    login = (inputName, inputPassword) => {

    }
}