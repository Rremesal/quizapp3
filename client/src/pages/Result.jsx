import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../components/Table';
import axios from 'axios';

const Result = ({setNavbar}) => {
    const [rightAnswers, setRightAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [openAnswers, setOpenAnswers] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        setNavbar(true)
    });

    const getResults = async () => {
        try {
            const res = await axios.get('http://localhost:5000/result/latest', {params: {userId: userId}});
            console.log(res.data)
            setRightAnswers(res.data.right);
            setWrongAnswers(res.data.wrong);
            setOpenAnswers(res.data.open);
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        getResults();
    },[]);

    let headers = ["Questions", "Right answer", "Wrong answer"]

  return (
    <div className='resultContainer'>
        <div>
        {
            rightAnswers && <div>Answers that were right: {rightAnswers.length}</div>
        }
        {
            wrongAnswers && <div>Answers that were wrong:{wrongAnswers.length}</div>
        }
        {
            <div>Score: {(rightAnswers.length/ (rightAnswers.length + wrongAnswers.length) * 100).toFixed(0) + "%"}</div>
        }
        </div>
        <Table goodAnswers={rightAnswers} headers={headers} wrongAnswers={wrongAnswers}/>
        
    </div>
  )
}

export default Result