import fs from 'fs';

class Result {
    constructor(wrong, right) {
        this.wrong = wrong;
        this.right = right;
    }

    insert = (username) => {

        let defaultObject = {
            id: 0,
            madeByUser: "",
            wrong: [],
            right: [],
        }

        if(!fs.existsSync('./results')) {
           fs.mkdirSync(`./results/`, {recursive: true});
           defaultObject.right = this.right;
           defaultObject.wrong = this.wrong;
           defaultObject.madeByUser = username;
           fs.writeFileSync(`results/results.json`, JSON.stringify([defaultObject], null, 4));
        } else {
            const content = fs.readFileSync(`results/results.json`);
            let jsonObj = JSON.parse(content);
            if(jsonObj.length > 0) {
                let lastInsertId = jsonObj[jsonObj.length - 1].id;
                lastInsertId += 1;
                defaultObject.id = lastInsertId;
            }
            defaultObject.right = this.right;
            defaultObject.wrong = this.wrong;
            defaultObject.madeByUser = username;
            jsonObj.push(defaultObject);
            fs.writeFileSync(`results/results.json`, JSON.stringify(jsonObj, null, 4));
        }
    }
}

export default Result