import React from 'react';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date, imdb_rating } = movie;

  // Extract year from release_date
  const releaseYear = release_date ? release_date.substring(0, 4) : '';

  // Format IMDb rating to display only one decimal
  const formattedRating = imdb_rating ? imdb_rating.toFixed(1) : '';

  // Add a star symbol after the IMDb rating value
  const ratingWithStar = formattedRating ? `${formattedRating} ★` : '';

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "https://via.placeholder.com/500x750";

  return (
    <div className="movie" key={id}>
      <div>
        <p>{releaseYear}</p> {/* Display release year */}
        <p>{ratingWithStar}</p> {/* Display IMDb rating with one decimal and a star symbol */}
      </div>

      <div>
        <img src={imageUrl} alt={title} onError={(e) => { e.target.src = "https://via.placeholder.com/500x750"; }} />
      </div>

      <div>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default MovieCard; 












