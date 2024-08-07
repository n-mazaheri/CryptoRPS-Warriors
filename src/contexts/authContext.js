import React, { createContext, useState, useEffect } from 'react';
import { getData, postData } from '../utils/utils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await getData('/users/check');
        setUser(res.user);
      } catch (err) {
        setUser(null);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (username, password) => {
    const res = await postData('/users/login', { username, password });
    setUser(res.user);
    return res;
  };
  const signup = async (username, password, avatar) => {
    let res = await postData('/users/signup', { username, password, avatar });
    res = await postData('/users/login', { username, password });
    setUser(res.user);
    return res;
  };

  const getAvatars = async () => {
    const res = await getData('/users/avatars');
    return res;
  };

  const getUsers = async () => {
    const res = await getData('/users/list');
    return res;
  };

  const getActiveUsers = async () => {
    const res = await getData('/users/list-active');
    return res;
  };

  const generateNonce = async (walletAddress) => {
    const res = await postData('/users/generate-nonce', { walletAddress });
    return res;
  };

  const verifySignature = async (nonce, signature, walletAddress) => {
    const res = await postData('/users/verify-signature', { nonce, signature, walletAddress });
    return res;
  };

  const logout = async () => {
    await getData('/users/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        getAvatars,
        getUsers,
        getActiveUsers,
        generateNonce,
        verifySignature,
        authorized,
        setAuthorized,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
