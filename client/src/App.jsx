import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MySet from './pages/MySet'
import FillSet from './pages/FillSet'
import Home from './pages/Home'
import Play from './pages/Play'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/mysets' element={<MySet/>}/>
        <Route path='/sets/:id' element={<FillSet/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/play/:setId/:userId' element={<Play/>}/>
      </Routes>
    </Router>
  )
}

export default App