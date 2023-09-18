import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const Play = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [results, setResults] = useState({wrong: [], right: [], open: []});
    const [index, setIndex] = useState(0);
    const [value, setValue] = useState("");
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

    const handleTextAreaClick = (e) => {
        let tempObj = currentQuestion;
        tempObj.myAnswer = value;
        setCurrentQuestion(tempObj);
        if (value === currentQuestion.answers[currentQuestion.rightAnswer]) {
            const newArray = [...results.right, currentQuestion];
            setResults({...results, right: newArray});
        } else {
            const newArray = [...results.wrong, currentQuestion];
            setResults({...results, wrong: newArray}); 
        }
        
        let i = index;
        i += 1;
        setIndex(questions[index]);
    }

    const handleTAChange = (e) => {
        setValue(e.target.value);
    }

    const handleResult = async () => {
        axios.post('http://localhost:5000/generate/results/', {results: results, username: localStorage.getItem("user")}).then(res => {
            	navigate(`/results/${localStorage.getItem("user")}`)
        }).catch(err => {
            console.log(err)
        });
    }

    let buttonStyle = {width: "40%", height: "5rem", margin: "5px"};
    let openQuestion;
    if (currentQuestion) {
        openQuestion = <><textarea id={currentQuestion.rightAnswer} value={value} onChange={handleTAChange} style={{ fontSize: "20px", minWidth: "20rem", margin: "0 auto" }}></textarea><Button onClick={handleTextAreaClick}>Next</Button></>;
    }



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
                    currentQuestion.answers && (currentQuestion.answers.length == 1 ? openQuestion : currentQuestion.answers.map((answer, i) => {
                            return (
                                <Button onClick={handleClick} data={currentQuestion.rightAnswer} id={i} key={i} style={ buttonStyle } className="btnAnswer">{answer}</Button>
                            )
                        }))
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