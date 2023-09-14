import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MySet from './pages/MySet'
import FillSet from './pages/FillSet'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/mysets' element={<MySet/>}/>
        <Route path='/sets/:id' element={<FillSet/>}/>
      </Routes>
    </Router>
  )
}

export default App