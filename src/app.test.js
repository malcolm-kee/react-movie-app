import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import App from './app';
import * as api from './api';

const mockMovieData = [
  {
    id: 1,
    name: 'Aquaman',
    releaseDate: '2018-12-07',
    description:
      'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.'
  },
  {
    id: 2,
    name: 'Bumblebee',
    releaseDate: '2018-12-15',
    description:
      'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken. When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.'
  },
  {
    id: 3,
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    releaseDate: '2018-11-14',
    description:
      'Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.'
  }
];

describe('<App />', () => {
  it('is defined', () => {
    expect(App).toBeDefined();
  });

  it('shows movie list when show button is clicked', () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Show Movies'));

    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('displays movies list when show button is clicked and data is loaded', async () => {
    jest
      .spyOn(api, 'loadMovies')
      .mockImplementation(() => Promise.resolve(mockMovieData));

    const { getByText, getAllByTestId } = render(<App />);

    await wait();

    fireEvent.click(getByText('Show Movies'));

    await wait(); // wait for Movie component to be lazy-loaded

    expect(getAllByTestId('movie').length).toBe(mockMovieData.length);
  });
});
