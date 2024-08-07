import React, { createContext, useState, useEffect, useContext } from 'react';
import { getData, postData } from '../utils/utils';
import { io } from 'socket.io-client';
import { AuthContext } from './authContext';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [userGames, setUserGames] = useState([]);
  const { user } = useContext(AuthContext);
  const insertGame = async (userId2, contractAddress) => {
    const res = await postData('/games/insert-game', { userId2, contractAddress });
  };

  const updateGame = async (contractAddress) => {
    const res = await postData('/games/update-game', { contractAddress });
  };
  useEffect(() => {
    async function f() {
      let res = await getUserGames();
      setUserGames(res);
    }
    f();
  }, [user]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:3002'); // Adjust the URL if needed
    setSocket(newSocket);
    if (user) {
      newSocket.emit('join', user?._id);
    }

    // Handle the game invitation event
    newSocket.on('newGame', ({}) => {
      alert('You have new game invitation!');
      getUserGames();
    });

    // Handle the game invitation event
    newSocket.on('updateGame', ({}) => {
      alert('Status of one game updated!');
      getUserGames();
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const getUserGames = async () => {
    const res = await getData('/games/list-user-games');
    if (res) {
      let reversed = res.reverse();
      setUserGames(reversed);
      return reversed;
    } else return [];
  };

  return (
    <GameContext.Provider value={{ insertGame, getUserGames, userGames, updateGame }}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameProvider };
