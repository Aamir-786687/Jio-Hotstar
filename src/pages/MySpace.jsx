"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Edit, Plus, Play } from "lucide-react";
import "../styles/myspace.css";

const MySpace = () => {
  const [movies, setMovies] = useState([]);
  const [activeProfile, setActiveProfile] = useState("User1");

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
    { name: "User1", avatar: "🛡️", isActive: true },
    { name: "User2", avatar: "😊", isActive: false },
    { name: "Aamir", avatar: "🕷️", isActive: false },
    { name: "User3", avatar: "😊", isActive: false },
    { name: "Kids", avatar: "👶", isActive: false },
    { name: "Add", avatar: "+", isActive: false, isAdd: true }
  ];

  const watchlistMovies = [
    {
      id: "1",
      title: "Laughter Chefs",
      thumbnail_url: "https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/5371/1740560295371-i",
      type: "Comedy"
    },
    {
      id: "2",
      title: "Peaky Blinder",
      thumbnail_url: "https://rukminim2.flixcart.com/image/850/1000/k0y6cnk0/poster/9/f/6/medium-peaky-blinders-tv-series-poster-for-room-office-13-inch-x-original-imafkm3uhgwyy3gn.jpeg?q=20&crop=false",
      type: "Marvel Studios",
      isDisney: true
    }
  ];

  const continueWatchingMovies = [
    {
      id: "3",
      title: "Interstellar",
      thumbnail_url: "https://images-cdn.ubuy.co.in/6352289f38bb253c44612d53-interstellar-movie-poster-24-x-36-inches.jpg",
      progress: 65,
      language: "English, हिन्दी +5 more"
    },
    {
      id: "4",
      title: "Django Unchained",
      thumbnail_url: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_.jpg",
      progress: 45,
      language: "English, हिन्दी +5 more"
    },
    {
      id: "5",
      title: "Taare Zameen Par",
      thumbnail_url: "https://m.media-amazon.com/images/I/611JgDfdb7L.jpg",
      progress: 30,
      language: "हिन्दी"
    },
    {
      id: "6",
      title: "Whiplash",
      thumbnail_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZQYke1hgTSW5mwGD7Ihggs20mD3Rg7rj7w&s",
      progress: 30,
      language: "English, हिन्दी +5 more"
    },
    {
      id: "7",
      title: "The Green Mile",
      thumbnail_url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p24429_p_v12_bf.jpg",
      progress: 30,
      language: "हिन्दी, English +5 more"
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
            <h2 className="section-title">Continue Watching for User1</h2>
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
