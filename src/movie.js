import React from 'react';

const Movie = props =>
  React.createElement('div', {}, [
    React.createElement('h1', {}, props.name),
    React.createElement('h2', {}, props.releaseDate)
  ]);

export default Movie;
