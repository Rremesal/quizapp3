import fs from 'fs';
import csv from 'csv-parser'

class Csv {
    constructor(file) {
        this.file = file;
    }

    static parse = async (req, csvOptions, saveToPath) => {
        const results = [];

        fs.createReadStream(saveToPath + req.file.filename)
            .pipe(csv(csvOptions))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                this.insert(req, results)
            });
    }

    static insert = (req, dataArray) => {

        const content = fs.readFileSync(`./sets/${req.body.userId}.json`);
        let sets = JSON.parse(content);
        let filteredSets = sets.filter(set => set.id == req.body.setId);
        let setToUpdate = filteredSets[0];
        setToUpdate.questions = [];
        
        dataArray.map((question) => {
            const rightAnswer = question.rightAnswer.toLowerCase();
            let answer = 0;
            switch(rightAnswer) {
                case 'a':
                    answer = 0;
                    break;
                case 'b':
                    answer = 1;
                    break;
                case 'c':
                    answer = 2
                    break;
                default: null;
            }
            setToUpdate.questions.push({
                question: question.question,
                answers: Array(question.A, question.B, question.C),
                rightAnswer: answer,
            });
            
        });

        setToUpdate.questions.shift();

        const updatedSets = sets.map(set => {
            if (set.id == req.body.setId) {
                setToUpdate.id = set.id;
                setToUpdate.setName = set.setName;
                set = setToUpdate;
            }
            return set
        });

        fs.writeFileSync(`./sets/${req.body.userId}.json`, JSON.stringify(updatedSets, null, 4))
    }
}

export default Csv