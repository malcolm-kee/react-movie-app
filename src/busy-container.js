import React from 'react';

export const BusyContainer = ({ isLoading, children }) => (
  <div>
    {isLoading && <span>loading...</span>}
    {children}
  </div>
);
