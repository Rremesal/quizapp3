import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table';

const AllResults = () => {
    const [results, setResults] = useState([]);
    const [students, setStudents] = useState([]);
    const [currentResult, setCurrentResult] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/results/all').then(res => {
            setResults(res.data);

            const students = results.map((result) => {
                return result.madeByUser;
            });
            setStudents([students[0]]);
        }).catch(err => {
            console.log(err);
        })
    })

    const handleChange = (e) => {
        let filteredArray = results.filter((result) => result.madeByUser === e.target.value);
        console.log(filteredArray[0].right)
        

        let simpleResults = [];
        filteredArray.map(result => {
            let simpleObject = {};
            simpleObject.goodAnswers = result.right.length;
            simpleObject.wrongAnswers = result.wrong.length;
            simpleObject.totalQuestions = result.right.length + result.wrong.length;
            simpleObject.score = ((result.right.length / simpleObject.totalQuestions) * 100).toFixed(0) + "%";
            simpleResults.push(simpleObject);
        });

        setCurrentResult(simpleResults)

    }

    let headers = ["Amount of right answers", "amount of wrong answers", "Amount of questions", "Score"]



    return (
        <div>
            <div>
                <select onChange={handleChange} name='student'>
                    {
                        <option value=""></option>
                    }
                    {
                        students.map((student, i) => {

                            return (
                                <option key={i} value={student}>{student}</option>
                            )
                        })
                    }
                </select>
            </div>
            {
                <Table id="allResultsTable" simpleResults={currentResult} headers={headers} />
            }
        </div>
    )
}

export default AllResults