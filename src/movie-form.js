import React from 'react';
import { createMovie } from './api';

class MovieForm extends React.Component {
  state = {
    name: '',
    releaseDate: ''
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    createMovie(this.state).then(() => this.props.onCreated());
  };

  render() {
    return (
      <div className="movie-form">
        <form onSubmit={this.handleSubmit}>
          <legend>Create Movie</legend>
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              className="input"
              value={this.state.name}
              id="name"
              name="name"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="releaseDate" className="label">
              Release Date
            </label>
            <input
              className="input"
              value={this.state.releaseDate}
              id="releaseDate"
              name="releaseDate"
              type="date"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Create
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
