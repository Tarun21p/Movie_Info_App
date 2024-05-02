import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "4e73896dc1477cb7716fc42a1fe0f6bd";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(`${API_URL}&query=${query}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const moviesWithImages = data.results.filter(movie => movie.poster_path);
        const movieDetails = await Promise.all(
          moviesWithImages.map(async movie => {
            const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=external_ids`);
            const detailsData = await detailsResponse.json();
            return {
              ...movie,
              imdb_id: detailsData.external_ids.imdb_id,
              imdb_rating: detailsData.vote_average
            };
          })
        );
        setMovies(movieDetails);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch (error) {
      setError("Failed to fetch movies. Please check your internet connection.");
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <button onClick={() => searchMovies(searchTerm)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="container">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;



