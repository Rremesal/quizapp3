import connect from '../db/connect'

class Question {
    constructor() {
        this.question;
        this.setId;
    }

    insert = (question, setId) => {
        const conn = connect();

        conn.query("INSERT INTO questions (question, set_id) VALUES (?, ?)", [question, setId], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.insertId > 0) {
                return true;
            } 

            return false;
        })

        conn.end();
    }

    static insert = (questions) => {
        const conn = connect();
        questions.map((obj) => {
            conn.query("INSERT INTO questions (question, set_id) VALUES (?, ?)", [obj.question, obj.setId], (err, result) => {
                if (err) { 
                    console.log(`SET_ID: ${obj.setId}`)
                    console.log(err);
                    return;
                }

                if (result.insertId > 0) {
                    return true;
                }

                return false;
            })
        })
    }
   

}