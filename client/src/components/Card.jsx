import React from 'react'
import Button from './Button';

const Card = ({id, title, buttons, data}) => {
  return (
    <div className='card' key={id}>
        <div className='content'>
            <h3>{title}</h3>
        </div>
        <div className='slider'>
            <div className='button-container'>
                {
                    buttons.map((button, i) => {
                        i++;
                        if (button.text.toLowerCase() === "delete") {
                            return (
                                <button key={i} title={title} data={data} style={{ backgroundColor: "red" }} id={id} onClick={button.onClick}>{button.text}</button>
                            )
                        }
                        return (
                            <Button key={i} id={id} onClick={button.onClick} title={title} data={data}>{button.text}</Button>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Card