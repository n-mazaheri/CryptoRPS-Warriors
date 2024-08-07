import { useContext, useState, useEffect } from 'react';
import GameFrame from './gameFrame';
import { GameContext } from '../contexts/gameContext';
import './games.css';

export default function Games() {
  const { userGames } = useContext(GameContext);
  let mockGames = [
    {
      user1: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ae82f90a41622c48d30a58',
      userId2: '66ab1e07b99ee41896a4624f',
      state: 1,
      winner: -1,
      amount: 0.01,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ab1e07b99ee41896a4624f',
      userId2: '66ae82f90a41622c48d30a58',
      state: 1,
      winner: -1,
      amount: 0.02,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ae82f90a41622c48d30a58',
      userId2: '66ab1e07b99ee41896a4624f',
      state: 2,
      winner: -1,
      amount: 0.03,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ab1e07b99ee41896a4624f',
      userId2: '66ae82f90a41622c48d30a58',
      state: 2,
      winner: -1,
      amount: 0.01,
      date: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ae82f90a41622c48d30a58',
      userId2: '66ab1e07b99ee41896a4624f',
      state: 3,
      winner: 1,
      amount: 0.02,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ae82f90a41622c48d30a58',
      userId2: '66ab1e07b99ee41896a4624f',
      state: 3,
      winner: 2,
      amount: 0.03,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      user1: {
        _id: '66ae82f90a41622c48d30a58',
        username: 'Bahar',
        passwordHash: '$2b$10$bEBZoSW0XQQDXB19DCb0OOoE1L/wP/VG8dc5HAit1p09APVsUg6TW',
        salt: '$2b$10$bEBZoSW0XQQDXB19DCb0OO',
        avatar: 'a11.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      user2: {
        _id: '66ab1e07b99ee41896a4624f',
        username: 'newday',
        passwordHash: '$2b$10$0qeZbXrzKoUGQSoDIuPhwOLAe1WbU7M9kYzE9vlbOEwp22XrWovOW',
        salt: '$2b$10$0qeZbXrzKoUGQSoDIuPhwO',
        avatar: 'a16.png',
        walletAddress: '0x256837824c9895F54791205484285b1c39DD72c7',
      },
      userId1: '66ae82f90a41622c48d30a58',
      userId2: '66ab1e07b99ee41896a4624f',
      state: 3,
      winner: -1,
      amount: 0.01,
      date: new Date(Date.now() - 2 * 60 * 1000),
    },
  ];

  return (
    <div>
      <GameFrame key="NewGame" />
      {userGames?.map((game, index) => (
        <div className="gameFrame-parent">
          <GameFrame game={game} key={'game' + game.contractAddress} />
        </div>
      ))}
    </div>
  );
}
