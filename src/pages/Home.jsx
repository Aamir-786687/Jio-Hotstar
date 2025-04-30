"use client";

import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Fav_show from "../Components/Fav_show/Fav_show";
import { Play, Plus } from "lucide-react";
import "../styles/home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [bingeWatch, setBingeWatch] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://jio-cinema-ea348-default-rtdb.firebaseio.com/movies.json"
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setMovies(data);

          // Set a featured movie (using one of the favorites)
          const featured = data.find((movie) => movie.fav === true);
          setFeaturedMovie(featured || data[0]);

          setFavMovies(data.filter((movie) => movie.fav === true));
          setDramaMovies(
            data.filter((movie) => movie.genre === "Drama").slice(0, 6)
          );
          setCrimeMovies(data.filter((movie) => movie.genre === "Crime"));
          setBingeWatch(
            data.filter((movie) => movie.Binge === true).slice(0, 6)
          );
        } else {
          console.log("Data format not supported:", data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      <Sidebar />

      <div className="main-content-area">
        <Header movies={movies} />

        {featuredMovie && (
          <div
            className="hero-banner"
            style={{ backgroundImage: `url(${featuredMovie.thumbnail_url})` }}
          >
            <div className="hero-content">
              <div className="movie-title-container">
                <h1 className="movie-title">{featuredMovie.title}</h1>
                <div className="newly-added">Newly Added</div>
                <div className="movie-meta">
                  <span>
                    {featuredMovie.release_date?.slice(0, 4) || "2024"}
                  </span>
                  <span className="dot">•</span>
                  <span className="rating">
                    {featuredMovie.rating
                      ? `U/A ${Math.floor(featuredMovie.rating)}+`
                      : "U/A 13+"}
                  </span>
                  <span className="dot">•</span>
                  <span>
                    {featuredMovie.duration
                      ? `${Math.floor(featuredMovie.duration / 60)}h ${
                          featuredMovie.duration % 60
                        }m`
                      : "1h 45m"}
                  </span>
                  <span className="dot">•</span>
                  <span>4 Languages</span>
                </div>
                <p className="movie-description">
                  {featuredMovie.description ||
                    "Follow the epic tale of an unlikely hero's journey. When destiny calls, they must overcome obstacles and discover their true strength to fulfill their legacy."}
                </p>
                <div className="genre-tags">
                  <span>{featuredMovie.genre}</span>
                  {featuredMovie.tags &&
                    featuredMovie.tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        <span className="dot">|</span>
                        <span>
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </span>
                      </React.Fragment>
                    ))}
                </div>
                <div className="action-buttons">
                  <button className="watch-now-btn">
                    <Play size={20} />
                    Watch Now
                  </button>
                  <button className="add-btn">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="content-section">
          <h2 className="section-title">Continue Watching for You</h2>
          <div className="continue-watching">
            {favMovies.slice(0, 5).map((movie, index) => (
              <div key={index} className="continue-item">
                <img
                  src={movie.continue_Watch || "/placeholder.svg"}
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
                <div className="progress-bar">
                  <div 
                    className="progress"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <div className="continue-overlay">
                  <button className="overlay-btn">View More Details</button>
                  <button className="overlay-btn">Continue Watching</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fav-section">
          <h2 className="section-title">Your Favorite Movies</h2>
          <div className="fav-movies">
            {favMovies.map((movie, index) => (
              <div key={index} className="fav-item">
                <img
                  src={movie.thumbnail_url || "/placeholder.svg"}
                  alt={movie.title}
                  className="fav-img"
                />
                {/* <div className="progress-bar">
          <div className="progress" style={{ width: `${movie.watchProgress || 0}%` }}></div>
        </div> */}
                <p className="fav-title">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <Fav_show title="Drama Movies" movies={dramaMovies} />
        </div>

        <div className="content-section">
          <Fav_show title="Crime Thrillers" movies={crimeMovies} />
        </div>

        <div className="content-section">
          <Fav_show title="Binge-Worthy Originals" movies={bingeWatch} />
        </div>
      </div>
    </div>
  );
};

export default Home;
