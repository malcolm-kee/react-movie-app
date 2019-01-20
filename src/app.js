import React from 'react';
import Movie from './movie';

class App extends React.Component {
  state = {
    showMovies: false
  };

  showMovies = () =>
    this.setState({
      showMovies: true
    });

  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.showMovies}>Show Movies</button>
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
