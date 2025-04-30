"use client"

import { useState, useEffect } from "react"
import { Search, Mic, User } from "lucide-react"
import "./header.css"
import Fav_Show from "../Fav_show/Fav_show"

const Header = (props) => {
  const [searchTitle, setSearchTitle] = useState("")
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    const fetchFilteredMovies = () => {
      const filterMovies = (props.movies || []).filter((movie) =>
        movie.title.toUpperCase().includes(searchTitle.toUpperCase()),
      )
      setFilteredMovies(filterMovies)
    }

    fetchFilteredMovies()
  }, [searchTitle, props.movies])

  return (
    <>
      <header className="header">
        <div className="search">
          <div className="searchBox">
            <Search size={18} className="header-icon" />
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Movies, Shows and more"
            />
            <Mic size={22} className="header-icon" />
          </div>

          <button className="user">
            <User size={30} />
          </button>
        </div>
      </header>

      {searchTitle && (
        <div className="searchResults">
          <Fav_Show title="Search Results" movies={filteredMovies} />
        </div>
      )}
    </>
  )
}

export default Header

