import React from 'react';

export default React.createContext({
  userData: [],
  token: '',
  removeUser: () => {},
  updateToken: (newToken) => {},
  updateUserData: (newUserData) => {}
});