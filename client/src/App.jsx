import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MySet from './pages/MySet'
import FillSet from './pages/FillSet'
import Home from './pages/Home'
import Play from './pages/Play'
import Result from './pages/Result'
import Role from './pages/Role'
import AllResults from './pages/AllResults'
import Navbar from './components/Navbar'

const App = () => {
  const [navbar, setNavbar] = useState(true);
  return (
    <Router>
      {navbar && <Navbar/>}
      <Routes>
        <Route path='/mysets' element={<MySet setNavbar={setNavbar}/>}/>
        <Route path='/sets/:id' element={<FillSet setNavbar={setNavbar}/>}/>
        <Route path='/' element={<Home setNavbar={setNavbar}/>}/>
        <Route path='/home' element={<Home setNavbar={setNavbar}/>}/>
        <Route path='/play/:setId/:userId' element={<Play setNavbar={setNavbar}/>}/>
        <Route path='/results/:username' element={<Result setNavbar={setNavbar}/>}/>
        <Route path='/results/all' element={<AllResults setNavbar={setNavbar}/>}/>
        <Route path='/auth/choose' element={<Role setNavbar={setNavbar}/>}/>
      </Routes>
    </Router>
  )
}

export default App