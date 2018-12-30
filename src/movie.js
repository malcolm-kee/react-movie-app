import React from 'react';

const Movie = props => (
  <div>
    <h1>{props.name}</h1>
    <h2>{props.releaseDate}</h2>
  </div>
);

export default Movie;
