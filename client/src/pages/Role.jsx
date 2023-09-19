import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Role = ({setNavbar}) => {
  const [isStudent, setStudent] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNavbar(false)
  })

  const goToResults = () => {
    localStorage.setItem("user", "Teacher");
    navigate('/');
  }

  const handleLogin = () => {
    localStorage.setItem("user", name);
    navigate('/');
  }

  return (
    <div className='flex flex-center fixed flex-col'>
        { !isStudent && <button onClick={goToResults} style={{ width: "10rem" }}>Teacher </button>}
        { !isStudent && <button onClick={() => setStudent(true)} style={{ width: "10rem" }}>Student</button>}
        {
          isStudent && 
          <form>
            <input placeholder='Enter your full name here' onChange={(e) => {setName(e.target.value)}}type="text" />
            <button onClick={handleLogin}>Log in</button>
          </form>
        }
    </div>
  )
}

export default Role