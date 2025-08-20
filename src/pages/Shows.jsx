import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import ShowsList from '../components/ShowsList/ShowsList.jsx'

const Shows = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content-area">
        <ShowsList />
      </div>
    </div>
  )
}

export default Shows