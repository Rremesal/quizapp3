import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MySet from './pages/MySet'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/mysets' element={<MySet/>}/>
      </Routes>
    </Router>
  )
}

export default App