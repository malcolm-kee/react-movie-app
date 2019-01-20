import React from 'react';
import Movie from './movie';

class App extends React.Component {
  state = {
    showMovies: false
  };

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
          <>
            <Movie name="Aquaman" releaseDate="2018-12-07" />
            <Movie name="Bumblebee" releaseDate="2018-12-15" />
            <Movie
              name="Fantastic Beasts: The Crimes of Grindelwald"
              releaseDate="2018-11-14"
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
