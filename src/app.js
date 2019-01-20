import React from 'react';
import { loadMovies } from './api';
import { BusyContainer } from './busy-container';
import Movie from './movie';

class App extends React.Component {
  state = {
    showMovies: false,
    movies: [],
    isLoading: true
  };

  componentDidMount() {
    loadMovies().then(movies => this.setState({ movies, isLoading: false }));
  }

  toggleMovies = () =>
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));

  render() {
    return (
      <div>
        <div className="title-bar">
          <h1>React Movie App</h1>
        </div>
        <div className="button-container">
          <button onClick={this.toggleMovies} className="button">
            {this.state.showMovies ? 'Hide' : 'Show'} Movies
          </button>
        </div>
        {this.state.showMovies && (
          <BusyContainer isLoading={this.state.isLoading}>
            {this.state.movies.map(movie => (
              <Movie
                name={movie.name}
                releaseDate={movie.releaseDate}
                key={movie.id}
              />
            ))}
          </BusyContainer>
        )}
      </div>
    );
  }
}

export default App;
