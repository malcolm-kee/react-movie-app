import React from 'react';
import Movie from './movie';
import { loadMovies } from './api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false,
      movies: []
    };
    this.toggleMovies = this.toggleMovies.bind(this);
  }

  componentDidMount() {
    loadMovies().then(movies => this.setState({ movies }));
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
        {this.state.showMovies &&
          this.state.movies.map(movie => (
            <Movie
              name={movie.name}
              releaseDate={movie.releaseDate}
              key={movie.id}
            />
          ))}
      </div>
    );
  }
}

export default App;
