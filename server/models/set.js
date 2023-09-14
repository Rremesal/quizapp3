import fs from 'fs';

class Set {
    constructor(name) {
        this.name = name;
    }

    insert = async (userId) => {
        let defaultObject = {
            id: 0,
            setName: this.name,
            questions: [
                {
                    question: "",
                    answers: [],
                    rightAnswer: "",
                }
            ],

        }
        if(!fs.existsSync('./sets')) {
           const path = fs.mkdirSync(`./sets/`, {recursive: true});
           fs.writeFileSync(`${path}/${userId}.json`, JSON.stringify([defaultObject], null, 4));
        } else {
            const content = fs.readFileSync(`sets/${userId}.json`);
            let jsonObj = JSON.parse(content);
            let lastInsertId = jsonObj[jsonObj.length - 1].id;
            lastInsertId += 1;
            defaultObject.id = lastInsertId;
            jsonObj.push(defaultObject);
            fs.writeFileSync(`sets/${userId}.json`, JSON.stringify(jsonObj, null, 4));
        }
    }

    static withId = async (id) => {
        
    }

    static withUserId = async (userId) => {
        
    }

    static deleteWithId = async (id) => {
    
    }

    all = () => {

    }
       
    
}

export default Set