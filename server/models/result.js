import fs from 'fs';

class Result {
    constructor(wrong, right) {
        this.wrong = wrong;
        this.right = right;
    }

    insert = (userId) => {

        let defaultObject = {
            id: 0,
            wrong: [],
            right: [],
        }

        if(!fs.existsSync('./results')) {
           const path = fs.mkdirSync(`./results/`, {recursive: true});
           defaultObject.right = this.right;
           defaultObject.wrong.push = this.wrong;
           fs.writeFileSync(`${path}/${userId}.json`, JSON.stringify([defaultObject], null, 4));
        } else {
            const content = fs.readFileSync(`results/${userId}.json`);
            let jsonObj = JSON.parse(content);
            if(jsonObj.length > 0) {
                let lastInsertId = jsonObj[jsonObj.length - 1].id;
                lastInsertId += 1;
                defaultObject.id = lastInsertId;
            }
            defaultObject.right = this.right;
            defaultObject.wrong = this.wrong;
            jsonObj.push(defaultObject);
            fs.writeFileSync(`results/${userId}.json`, JSON.stringify(jsonObj, null, 4));
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

export default Result