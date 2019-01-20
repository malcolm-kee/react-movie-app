import React from 'react';

export const BusyContainer = ({ isLoading, children }) => (
  <div>
    {isLoading && <span data-testid="loading-indicator">loading...</span>}
    {children}
  </div>
);
