import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Home, Search, Film, Heart, Clapperboard , Settings } from "lucide-react"
import JClogo from "../../assets/jio-logo.png" 
import pic from '../../assets/Avatarr.png'
import "./showsList.css"

const ShowsList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          "https://jio-cinema-ea348-default-rtdb.firebaseio.com/Shows.json"
        )

        if (response.data) {
          const moviesArray = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }))
          setMovies(moviesArray)
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.")
        setLoading(false)
        console.error("Error fetching movies:", err)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="movies-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src={JClogo} alt="Jio Cinema Logo" />
        </div>
        <nav className="nav-menu">
          <ul>
                <li><a href="/" className="active" data-tooltip="Home"><Home /></a></li>
                <li><a href="#" data-tooltip="Search"><Search /></a></li>
                <li><a href="/movies" data-tooltip="Movies"><Film /></a></li>
                <li><a href="/Shows" data-tooltip="TV Shows"><Clapperboard  /></a></li>
                <li><a href="#" data-tooltip="Favorites"><Heart /></a></li>
                <li><a href="/" data-tooltip="Home" ><img src={pic} alt="Avatar" /></a></li>
            </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title">TV Shows</h1>

        <div className="movies-grid">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img
                  src={movie.thumbnail_url || "https://via.placeholder.com/300x450?text=No+Image"}
                  alt={movie.title || "Untitled"}
                />
                <div className="movie-overlay">
                  <span className="movie-rating">{movie.rating || "N/A"}</span>
                  {/* <span className="movie-duration">{movie.duration || "0"} min</span> */}
                </div>
              </div>
              <h3 className="movie-title">{movie.title || "Untitled"}</h3>
              <div className="movie-year">
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ShowsList
