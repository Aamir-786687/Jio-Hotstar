"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Search as SearchIcon, Play, Plus } from "lucide-react";
import "../styles/search.css";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://jio-cinema-ea348-default-rtdb.firebaseio.com/movies.json"
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setMovies(data);
        } else {
          console.log("Data format not supported:", data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase()) ||
      movie.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      movie.cast?.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <div className="page-container">
      <Sidebar />

      <div className="main-content-area">
        {/* <Header movies={movies} /> */}

        
          <div className="search-bar-container">
            <div className="search-bar">
              <SearchIcon className="search-icon" size={24} />
              <input
                type="text"
                placeholder="Movies, shows and more"
                value={searchQuery}
                onChange={handleInputChange}
                className="search-input"
              />
            </div>
          </div>

          {searchQuery && (
            <div className="search-results-section">
              <div className="results-header">
                <h2 className="results-title">
                  {isSearching ? "Searching..." : `Search Results for "${searchQuery}"`}
                </h2>
                <span className="results-count">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((movie, index) => (
                    <div key={movie.id || index} className="search-result-item">
                      <div className="movie-poster">
                        <img
                          src={movie.thumbnail_url || "/placeholder.svg"}
                          alt={movie.title}
                          className="poster-image"
                        />
                        <div className="movie-overlay">
                          <div className="overlay-buttons">
                            <button className="play-btn">
                              <Play size={16} />
                            </button>
                            <button className="add-btn">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-meta">
                          <span className="movie-year">
                            {movie.release_date?.slice(0, 4) || "2024"}
                          </span>
                          <span className="movie-duration">
                            {movie.duration
                              ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`
                              : "1h 45m"}
                          </span>
                          <span className="movie-rating">
                            {movie.rating
                              ? `U/A ${Math.floor(movie.rating)}+`
                              : "U/A 13+"}
                          </span>
                        </div>
                        <p className="movie-genre">{movie.genre}</p>
                        {movie.tags && (
                          <div className="movie-tags">
                            {movie.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : !isSearching ? (
                <div className="no-results">
                  <div className="no-results-icon">
                    <SearchIcon size={48} />
                  </div>
                  <h3>No results found</h3>
                  <p>Try searching with different keywords or check your spelling</p>
                </div>
              ) : null}
            </div>
          )}

          {!searchQuery && (
            <div className="trending-section">
              <h2 className="section-title">Trending in India</h2>
              <div className="trending-grid">
                {movies.slice(0, 14).map((movie, index) => (
                  <div key={movie.id || index} className="trending-item">
                    <div className="movie-poster">
                      <img
                        src={movie.thumbnail_url || "/placeholder.svg"}
                        alt={movie.title}
                        className="poster-image"
                      />
                      <div className="movie-overlay">
                        <div className="overlay-buttons">
                          <button className="play-btn">
                            <Play size={16} />
                          </button>
                          <button className="add-btn">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-genre">{movie.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default Search;
