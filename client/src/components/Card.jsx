import React from 'react'

const Card = ({id, title, buttons}) => {
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
                                <button key={i} style={{ backgroundColor: "red" }} id={id} onClick={button.onClick}>{button.text}</button>
                            )
                        }
                        return (
                            <button key={i} id={id} onClick={button.onClick}>{button.text}</button>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Card