import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Movies from "./pages/Movies" 
import Shows from "./pages/Shows"
import Search from "./pages/Search"
import MySpace from "./pages/MySpace"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path ='/shows' element={<Shows />}/> 
        <Route path="/myspace" element={<MySpace />} />
      </Routes>
    </Router>
  )
}

export default App
