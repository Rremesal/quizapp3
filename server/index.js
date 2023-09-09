import express from 'express'
import cors from 'cors'
import Set from '../server/models/set.js'

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());


app.post('/set/create',  async (req, res) => {
    const set = new Set(req.body.name, 3) //user_id 1 is for testing purposes replace this with the currently logged in user(id)
    const insertId = await set.insertSingle();
    if (insertId > 0) {
        const result = await Set.withId(insertId);
        return res.json(result[0]);
    }
})

app.get('/get/sets', async (req, res) => {
    const sets = await Set.withUserId(3);
    console.log(sets);
    return res.json(sets)
})

app.delete("/delete/set", async (req, res) => {
    const id = req.query.id
    const selectResult = await Set.withId(id);
    if (selectResult) {
        const result = await Set.deleteWithId(id);
        if (result) {
            return res.json(selectResult[0])
        }
    }

    
    console.log(result)
    if (result && result > 0) {
        return res.json(result)
    }

})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})