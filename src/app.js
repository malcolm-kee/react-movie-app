import React from 'react';
import { BusyContainer } from './busy-container';

const Movie = React.lazy(() =>
  import(/* webpackChunkName: "Movie" */ './movie')
);

const loadCodeAndMovies = searchKey =>
  import(/* webpackChunkName: "api" */ './api').then(({ loadMovies }) =>
    loadMovies(searchKey)
  );

class App extends React.Component {
  state = {
    showMovies: false,
    isLoading: true,
    movies: [],
    searchTerm: ''
  };

  componentDidMount() {
    this.updateMovieList();
  }

  handleSearchTermChange = ev => {
    this.setState(
      {
        searchTerm: ev.target.value
      },
      () => {
        this.setState({ isLoading: true });
        this.updateMovieList(this.state.searchTerm);
      }
    );
  };

  updateMovieList = searchKey => {
    loadCodeAndMovies(searchKey).then(movies =>
      this.setState({
        movies,
        isLoading: false
      })
    );
  };

  toggleMovies = () => {
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));
  };

  render() {
    return (
      <div>
        <div className="title-bar">
          <h1>React Movie App</h1>
        </div>
        <div className="container">
          <div className="button-container">
            <button className="button" onClick={this.toggleMovies}>
              {this.state.showMovies ? 'Hide' : 'Show'} Movies
            </button>
          </div>
          {this.state.showMovies && (
            <React.Suspense fallback={<span>Loading Component...</span>}>
              <div className="field">
                <input
                  value={this.state.searchTerm}
                  onChange={this.handleSearchTermChange}
                  className="input"
                  placeholder="Search for movie..."
                />
              </div>
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
      </div>
    );
  }
}

export default App;
