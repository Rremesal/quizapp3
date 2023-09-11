import React from 'react'

const Button = ({type, style, onClick, id, data, children}) => {
  return (
    <button type={type} style={style} value={data} onClick={onClick} id={id} data={data}>
        {
            children
        }
    </button>
  )
}

export default Button