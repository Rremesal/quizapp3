import React from 'react'

const Table = ({id, goodAnswers, wrongAnswers, simpleResults ,headers}) => {

    const convertIntToChoice = (number) => {
        let convertedAnswer = "";
        switch(number) {
            case 0:
                convertedAnswer = "A";
                break;
            case 1: 
            convertedAnswer = "B";
                break;
            case 2:
                convertedAnswer = "C";
                break;
            default: convertedAnswer = number;
        }
        return convertedAnswer;
    }
  return (
    <table id={id}>
        <thead>
            {
                headers && headers.map((header, i) => {
                    return (
                        <th key={i}>{header}</th>
                    )
                })
            }
        </thead>
        <tbody>
        {
            goodAnswers && goodAnswers.map((obj, i) => {
                let rightAnswer = convertIntToChoice(obj.rightAnswer);
                let myAnswer = convertIntToChoice(obj.myAnswer);
                return (
                    <tr className='bg-green' key={i}>
                        <td>{obj.question}</td>
                        <td><span>{myAnswer}</span></td>
                        <td>{(obj.answers.length === 1 ? obj.answers[0] : rightAnswer + ": " + obj.answers[obj.rightAnswer])}</td>
                    </tr>
                )
            })
        }
        {
            wrongAnswers && wrongAnswers.map((obj, i) => {
                let rightAnswer = convertIntToChoice(obj.rightAnswer);
                let myAnswer = convertIntToChoice(obj.myAnswer);
                return (
                    <tr className='bg-red' key={i}>
                        <td>{obj.question}</td>
                        <td>{myAnswer}</td>
                        <td>{(obj.answers.length === 1 ? obj.answers[0] : rightAnswer + ": " + obj.answers[obj.rightAnswer])}</td>
                    </tr>
                )
            })
        }

        {
            simpleResults && simpleResults.map((obj, i) => {
                return (
                    <tr key={i}>
                        <td>{obj.goodAnswers}</td>
                        <td>{obj.wrongAnswers}</td>
                        <td>{obj.totalQuestions}</td>
                        <td>{obj.score}</td>
                    </tr>
                )
            })
        }
        </tbody>
    </table>
  )
}

export default Table