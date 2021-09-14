import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

const CurrentRoomContext = createContext();
export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContext.Provider value={data}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

export const useCurrenRoom = selector =>
  useContextSelector(CurrentRoomContext, selector);
