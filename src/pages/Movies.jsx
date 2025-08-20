import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import MoviesList from '../components/MoviesList/MoviesList.jsx';

const Movies = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content-area">
        <MoviesList />
      </div>
    </div>
  )
}

export default Movies