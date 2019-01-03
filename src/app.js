import React from 'react';
import { loadMovies } from './api';
import { BusyContainer } from './busy-container';
import Movie from './movie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false,
      isLoading: true,
      movies: []
    };
    this.toggleMovies = this.toggleMovies.bind(this);
  }

  componentDidMount() {
    loadMovies().then(movies => this.setState({ movies, isLoading: false }));
  }

  toggleMovies() {
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));
  }

  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.toggleMovies}>
          {this.state.showMovies ? 'Hide' : 'Show'} Movies
        </button>
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
