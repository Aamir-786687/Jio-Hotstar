import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Movies from "./pages/Movies" 
import Shows from "./pages/Shows"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path ='/shows' element={<Shows />}/> 
      </Routes>
    </Router>
  )
}

export default App
