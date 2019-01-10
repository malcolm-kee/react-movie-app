import React from 'react';

const Movie = props => (
  <div className="movie-container" data-testid="movie">
    <h1>{props.name}</h1>
    <p>{props.releaseDate}</p>
  </div>
);

export default Movie;
