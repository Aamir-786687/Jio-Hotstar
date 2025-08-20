"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Edit, Plus, Play } from "lucide-react";
import "../styles/myspace.css";

const MySpace = () => {
  const [movies, setMovies] = useState([]);
  const [activeProfile, setActiveProfile] = useState("Kheera");

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

  const profiles = [
    { name: "Kheera", avatar: "🛡️", isActive: true },
    { name: "Unknown", avatar: "😊", isActive: false },
    { name: "Aamir", avatar: "🕷️", isActive: false },
    { name: "hgdhdhg", avatar: "😊", isActive: false },
    { name: "Kids", avatar: "👶", isActive: false },
    { name: "Add", avatar: "+", isActive: false, isAdd: true }
  ];

  const watchlistMovies = [
    {
      id: "1",
      title: "Laughter Chefs",
      thumbnail_url: "https://via.placeholder.com/300x450/FFD700/000000?text=Laughter+Chefs",
      type: "Comedy"
    },
    {
      id: "2",
      title: "I Am Groot",
      thumbnail_url: "https://via.placeholder.com/300x450/228B22/FFFFFF?text=I+Am+Groot",
      type: "Marvel Studios",
      isDisney: true
    }
  ];

  const continueWatchingMovies = [
    {
      id: "3",
      title: "Kesari Chapter 2",
      thumbnail_url: "https://via.placeholder.com/200x300/FF6B35/FFFFFF?text=Kesari+Ch2",
      progress: 65
    },
    {
      id: "4",
      title: "Criminal Justice: A Family Matter",
      thumbnail_url: "https://via.placeholder.com/200x300/2C3E50/FFFFFF?text=Criminal+Justice",
      progress: 45
    },
    {
      id: "5",
      title: "Ironheart",
      thumbnail_url: "https://via.placeholder.com/200x300/95A5A6/FFFFFF?text=Ironheart",
      progress: 30,
      language: "हिन्दी"
    },
    {
      id: "6",
      title: "Ultimate Spider-Man",
      thumbnail_url: "https://via.placeholder.com/200x300/E74C3C/FFFFFF?text=Ultimate+Spider-Man",
      progress: 80
    },
    {
      id: "7",
      title: "Train to Busan",
      thumbnail_url: "https://via.placeholder.com/200x300/34495E/FFFFFF?text=Train+to+Busan",
      progress: 55
    }
  ];

  return (
    <div className="page-container">
      <Sidebar />

      <div className="main-content-area">
        <div className="myspace-content">
          {/* Profiles Section */}
          <div className="profiles-section">
            <div className="profiles-header">
              <h1 className="section-title">Profiles</h1>
              <button className="edit-button">
                <Edit size={16} />
                Edit
              </button>
            </div>
            
            <div className="profiles-grid">
              {profiles.map((profile, index) => (
                <div 
                  key={index} 
                  className={`profile-item ${profile.isActive ? 'active' : ''} ${profile.isAdd ? 'add-profile' : ''}`}
                  onClick={() => !profile.isAdd && setActiveProfile(profile.name)}
                >
                  <div className="profile-avatar">
                    {profile.isAdd ? (
                      <Plus size={24} />
                    ) : (
                      <span className="avatar-emoji">{profile.avatar}</span>
                    )}
                  </div>
                  <span className="profile-name">{profile.name}</span>
                  {profile.isActive && (
                    <div className="active-indicator">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist Section */}
          <div className="watchlist-section">
            <h2 className="section-title">Watchlist</h2>
            <div className="watchlist-grid">
              {watchlistMovies.map((movie) => (
                <div key={movie.id} className="watchlist-item">
                  <div className="movie-poster">
                    <img
                      src={movie.thumbnail_url}
                      alt={movie.title}
                      className="poster-image"
                    />
                    <div className="movie-overlay">
                      <button className="play-btn">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    {movie.isDisney && (
                      <div className="disney-badge">Disney+ Original</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Watching Section */}
          <div className="continue-watching-section">
            <h2 className="section-title">Continue Watching for {activeProfile}</h2>
            <div className="continue-watching-grid">
              {continueWatchingMovies.map((movie) => (
                <div key={movie.id} className="continue-item">
                  <div className="movie-poster">
                    <img
                      src={movie.thumbnail_url}
                      alt={movie.title}
                      className="poster-image"
                    />
                    <div className="movie-overlay">
                      <button className="play-btn">
                        <Play size={16} />
                      </button>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${movie.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    {movie.language && (
                      <span className="language-badge">{movie.language}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpace;
