import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isStudent, setStudent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setLoggedIn(true);
            if (user !== "Teacher") {
                setStudent(true);
            }
        }
    },[])

    let navStyling = {zIndex: 2, display: "flex", alignItems: "center", backgroundColor: "#668cff", height: "5rem", padding: "0 4px"};
    if(isStudent) {
        navStyling.justifyContent = "space-around";
    } else {
        navStyling.justifyContent = "space-around";
    }

    let linkStyling = {
        margin: "0",
        color: "white",
        textDecoration: "none",
    }

    let buttonStyling = {
        backgroundColor: "red",
        color: "white",
        width: "7rem"
    }

    const logOut = () => {
        localStorage.removeItem("user");
        setLoggedIn(false);
        navigate('auth/choose');
    }

  return (
    <nav style={navStyling}>
        <NavLink style={linkStyling} to="/">Home</NavLink>
        { !isStudent && <NavLink style={linkStyling} to="/mysets">My sets</NavLink>}
        { !isStudent && <NavLink style={linkStyling} to="/results/all">See results</NavLink>}
        {isLoggedIn && <span onClick={logOut} style={{ color: "white", fontWeight: "bold" }}>{"Logged in as: " + localStorage.getItem("user")}</span>}
        { isLoggedIn && <button style={buttonStyling} onClick={logOut}>Log out</button>}
    </nav>
  )
}

export default Navbar