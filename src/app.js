import React from 'react';
import { BusyContainer } from './busy-container';

const Movie = React.lazy(() =>
  import(/* webpackChunkName: "Movie" */ './movie')
);

const loadCodeAndMoviesData = () =>
  import(/* webpackChunkName: "api" */ './api').then(({ loadMovies }) =>
    loadMovies()
  );

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
    loadCodeAndMoviesData().then(movies =>
      this.setState({ movies, isLoading: false })
    );
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
          <React.Suspense fallback={<span>Loading Component...</span>}>
            <BusyContainer isLoading={this.state.isLoading}>
              {this.state.movies.map(movie => (
                <Movie
                  name={movie.name}
                  releaseDate={movie.releaseDate}
                  key={movie.id}
                />
              ))}
            </BusyContainer>
          </React.Suspense>
        )}
      </div>
    );
  }
}

export default App;
