import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const Play = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [results, setResults] = useState({wrong: [], right: []});
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getSets =  async () => {
            axios.get('http://localhost:5000/get/questions', {params: params}).then(res => {
                setQuestions(res.data);
            }).catch((err) => {
            console.log(err)
            })
        }
        getSets();
    }, []);

    useEffect(() => {
        setCurrentQuestion(questions[index]);
    });

    const handleClick = (e) => {
        let tempObj = currentQuestion;
        tempObj.myAnswer = parseInt(e.target.id);
        setCurrentQuestion(tempObj);
        console.log(currentQuestion)
        const correctAnswerIndex = parseInt(e.target.getAttribute("data"));
        if(parseInt(e.target.id) == correctAnswerIndex) {
            const newRightArray = [...results.right, currentQuestion];
            setResults({...results, right: newRightArray});
        } else {
            const newWrongArray = [...results.wrong, currentQuestion];
            setResults({...results, wrong: newWrongArray});
        }
        
        let i = index;
        i += 1;

        setIndex(i);
        setCurrentQuestion(questions[index]);
    }

    const handleResult = async () => {
        axios.post('http://localhost:5000/generate/results/', {results: results, userId: 1}).then(res => {
            	navigate(`/results/${1}`)
        }).catch(err => {
            console.log(err)
        });
    }

    let buttonStyle = {width: "40%", height: "5rem", margin: "5px"};


  return (
    <div>
        <div className='flex flex-center flex-col' style={{ position: "fixed", height: "100%", width: "100%" }}>
        {currentQuestion && <div><span style={{ display: 'block' }}>{`${index} / ${questions.length}`}</span></div>}
        {
            currentQuestion && (
            <>
                <p>{currentQuestion.question}</p>
                <div className='answerContainer'>
                { 
                    currentQuestion.answers && currentQuestion.answers.map((answer, i) => {
                        return (
                            <Button onClick={handleClick} data={currentQuestion.rightAnswer} id={i} key={i} style={ buttonStyle } className="btnAnswer">{answer}</Button>
                        )
                    })
                }
                </div>
            </>
            )
        }
        {
            (currentQuestion === undefined ? <Button onClick={handleResult}>Done. See results</Button> : null)
        }
            
        </div>

    </div>
  )
}

export default Play