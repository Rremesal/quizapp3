import express from 'express'
import cors from 'cors'
import Set from '../server/models/set.js'
import Result from '../server/models/result.js'
import multer from 'multer'
import fs from 'fs'
import Csv from './models/Csv.js'

const PORT = 5000;
const upload = multer({dest: 'uploads/'})

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get/sets', async (req, res) => {
    let files = [];
    if (fs.existsSync('sets')) {
        files.push(fs.readdirSync('sets'));
    }
    let sets = null;
    if (files.length >= 1) {
        files.map(file => {
            let fileContent = fs.readFileSync(`sets/${file}`);
            sets = JSON.parse(fileContent);
    
        });

        return res.json(sets);
        
    } else {

    }
})


app.post('/set/create',  async (req, res) => {
    const set = new Set(req.body.name);
    set.insert(req.body.userId);
    const content = fs.readFileSync(`./sets/${req.body.userId}.json`);
    const sets = JSON.parse(content);
    const latestSet = sets[sets.length - 1];
    return res.json(latestSet)
})

app.get('/get/mysets', async (req, res) => {
    const userId = req.query.userId;
    if(fs.existsSync(`./sets/${userId}.json`)) {
        const content = fs.readFileSync(`./sets/${userId}.json`);
        res.json(JSON.parse(content))
    }
});

app.delete("/delete/set", async (req, res) => {
    const content = fs.readFileSync(`sets/${req.query.userId}.json`);
    let sets = JSON.parse(content);
    let filteredSets = sets.filter(set => parseInt(req.query.id) !== set.id);
    fs.writeFileSync(`sets/${req.query.userId}.json`, JSON.stringify(filteredSets));

    return res.json(filteredSets)
});

app.post('/convert/csv', upload.single('file'), async (req, res) => {
    const csvOptions = {
        headers: ["id", "question", "A", "B", "C", "rightAnswer"],
        separator: ';',
    }

    const questions = Csv.parse(req,csvOptions, 'uploads/');;
    return res.json(questions)
});

app.get('/get/questions', async (req, res) => {
    const setId = req.query.setId;
    const userId = req.query.userId;
    let contents = fs.readFileSync(`sets/${userId}.json`);
    let sets = JSON.parse(contents);
    let currentSet = sets.filter(set => set.id == setId);
    console.log(sets)
    return res.json(currentSet[0].questions);
});

app.post('/generate/results', (req, res) => {
    const right = req.body.results.right;
    const wrong = req.body.results.wrong;
    const userId = req.body.userId;

    console.log(right)

    const result = new Result(wrong, right);
    result.insert(userId);
    res.json('works');
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})