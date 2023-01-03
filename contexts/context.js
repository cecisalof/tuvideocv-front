import React from 'react';

export default React.createContext({
  userData: [],
  token: '',
  removeUser: () => {},
  updateToken: (newToken, saveToMemory) => {},
  updateUserData: (newUserData) => {},
  readFromMemory: (callback) => {},
  saveToMemory: () => {},
});