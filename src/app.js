import React from 'react';
import { BusyContainer } from './busy-container';
import { debounce } from './lib';

const Movie = React.lazy(() =>
  import(/* webpackChunkName: "Movie" */ './movie')
);

const MovieForm = React.lazy(() =>
  import(/* webpackChunkName: "MovieForm" */ './movie-form')
);

const loadCodeAndMovies = searchKey =>
  import(/* webpackChunkName: "api" */ './api').then(({ loadMovies }) =>
    loadMovies(searchKey)
  );

class App extends React.Component {
  state = {
    showMovies: false,
    showForm: false,
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
        this.debouncedUpdateMovieList(this.state.searchTerm);
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

  debouncedUpdateMovieList = debounce(this.updateMovieList, 200);

  toggleMovies = () => {
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  handleFormCreated = () => {
    this.setState({
      showForm: false
    });
    this.updateMovieList();
  };

  render() {
    return (
      <div>
        <div className="title-bar">
          <h1>React Movie App</h1>
        </div>
        <div className="container">
          {this.state.showForm ? (
            <React.Suspense fallback={<span>Loading Form...</span>}>
              <MovieForm
                onCreated={this.handleFormCreated}
                onCancel={this.toggleForm}
              />
            </React.Suspense>
          ) : (
            <div className="button-container">
              <button className="button" onClick={this.toggleForm}>
                Create Movie
              </button>
            </div>
          )}
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
