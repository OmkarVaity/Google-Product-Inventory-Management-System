//This is Authentication file

import React from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';
export const AuthContext = React.createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = (props) => {
  const [userData, setUserData] = useLocalStorageState('userData', null);

  let isLoggedIn = false;
  
  if(userData && userData.id) {
  // if (userData && (userData.id || userData.token) && (!userData.expires || new Date() < new Date(userData.expires))) {
    isLoggedIn = true;
  }
  return (<AuthContext.Provider value={{ userData, setUserData, isLoggedIn }} {...props} />)
}
