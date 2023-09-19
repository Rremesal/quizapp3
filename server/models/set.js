import fs from 'fs';

class Set {
    constructor(name) {
        this.name = name;
    }

    insert = () => {
        let defaultObject = {
            id: 0,
            setName: this.name,
            questions: [
                {
                    question: "",
                    answers: [],
                    rightAnswer: "",
                    myAnswer: "",
                },
            ],
        }

        if(!fs.existsSync('./sets')) {
           fs.mkdirSync(`./sets/`, {recursive: true});
           fs.writeFileSync(`sets/sets.json`, JSON.stringify([defaultObject], null, 4));
        } else {
            const content = fs.readFileSync(`sets/sets.json`);
            let jsonObj = JSON.parse(content);
            if(jsonObj.length > 0) {
                let lastInsertId = jsonObj[jsonObj.length - 1].id;
                lastInsertId += 1;
                defaultObject.id = lastInsertId;
            }
            jsonObj.push(defaultObject);
            fs.writeFileSync(`sets/sets.json`, JSON.stringify(jsonObj, null, 4));
        }
    }

    all = () => {

    }
       
    
}

export default Set