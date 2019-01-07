import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BusyContainer } from './busy-container';

afterEach(cleanup);

describe('BusyContainer', () => {
  it('is defined', () => {
    expect(BusyContainer).toBeDefined();
  });

  it('renders loading indicator when props is loading', () => {
    const { getByTestId } = render(
      <BusyContainer isLoading={true}>
        <div id="children">Hello Test</div>
      </BusyContainer>
    );

    const loadingIndicator = getByTestId('loading-indicator');

    expect(loadingIndicator).toBeDefined();
  });

  it('not renders loading indicator when props loading = false', () => {
    const { queryByTestId } = render(
      <BusyContainer isLoading={false}>
        <div id="children">Hello Test</div>
      </BusyContainer>
    );

    const loadingIndicator = queryByTestId('loading-indicator');

    expect(loadingIndicator).toBe(null);
  });
});
