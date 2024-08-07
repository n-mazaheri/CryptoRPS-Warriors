import { Button } from '@mui/material';
import './gameFrame.css';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../contexts/authContext';
import { ContractContext } from '../contexts/contractContext';
import { GameContext } from '../contexts/gameContext';
import { formatEther } from 'viem';
import { delay } from '../utils/utils';
const movesObject = {
  rock: 1,
  paper: 2,
  scissors: 3,
  lizard: 5,
  spock: 4,
};
export default function GameFrame(props) {
  const { selectedUser, user } = useContext(AuthContext);
  const { insertGame, getUserGames, updateGame } = useContext(GameContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedMove, setSelectedMove] = useState(null);
  const [value, setValue] = useState(0);
  const { deployGameContract, confirm, selectMove, waiting1, waiting2 } = useContext(ContractContext);
  const [type, setType] = useState('New');
  const [oponent, setOponent] = useState(null);
  const [error, setError] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const timeLeftRef = useRef();
  timeLeftRef.current = timeLeft;

  const buttonClick = async () => {
    setError(null);
    if (type == 'New') {
      if (selectedMove !== null && selectedUser !== null) {
        try {
          setLoading(true);
          let contractAddress = await deployGameContract(selectedUser.walletAddress, selectedMove, value);
          await delay(2000);
          await insertGame(selectedUser._id, contractAddress);
          await delay(2000);
          await getUserGames();
          setLoading(false);
        } catch (exception) {
          setLoading(false);
          setError(exception.message);
        }
      } else {
        setError('Please select Your oponent and movement!');
      }
    } else if (type == 'Waiting1' && timeLeft == 0) {
      try {
        setLoading(true);
        await waiting1(props?.game?.contractAddress);
        await delay(4000);
        await updateGame(props?.game?.contractAddress);
        await getUserGames();
        setLoading(false);
      } catch (exception) {
        setError(exception.message);
        setLoading(false);
      }
    } else if (type == 'Waiting2' && timeLeft == 0) {
      try {
        setLoading(true);
        await waiting2(props?.game?.contractAddress);
        await delay(4000);
        await updateGame(props?.game?.contractAddress);
        await getUserGames();
        setLoading(false);
      } catch (exception) {
        setError(exception.message);
        setLoading(false);
      }
    } else if (type == 'SelectMove') {
      if (selectedMove !== null) {
        try {
          setLoading(true);
          await selectMove(props?.game?.contractAddress, selectedMove);
          await delay(4000);
          await updateGame(props?.game?.contractAddress);
          await getUserGames();
          setLoading(false);
        } catch (exception) {
          setError(exception.message);
          setLoading(false);
        }
      } else {
        setError('Please select your movement first!');
      }
    } else if (type == 'Confirm') {
      try {
        setLoading(true);
        const info = JSON.parse(localStorage.getItem(props?.game?.contractAddress));
        await confirm(props?.game?.contractAddress, selectedMove, info?.salt ?? '0x1234');
        await delay(4000);
        await updateGame(props?.game?.contractAddress);
        await getUserGames();
        setLoading(false);
      } catch (exception) {
        setError(exception.message);
        setLoading(false);
      }
    }
  };

  let buttonText =
    type == 'New'
      ? 'Start New Game'
      : type == 'Waiting1' || type == 'Waiting2'
      ? 'Cancle The Game'
      : type == 'SelectMove'
      ? 'Select The Movement'
      : type == 'Confirm'
      ? 'Confirm The Movement'
      : null;
  useEffect(() => {
    if (type == 'Waiting1' || type == 'Waiting2' || type == 'Confirm') {
      let seconds = Math.floor((Date.now() - new Date(props?.game?.date).getTime()) / 1000);
      console.log(props?.game?.date);
      console.log({ seconds });
      if (seconds < 6 * 60) {
        setTimeLeft(6 * 60 - seconds);
        let timer = setInterval(() => {
          if (timeLeftRef.current > 0) {
            setTimeLeft(timeLeftRef.current - 1);
          }
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [type]);

  useEffect(() => {
    let game = props.game;
    if (game?.userId1 == user._id) {
      setOponent(game?.user2);
    } else if (game?.userId2 == user._id) {
      setOponent(game?.user1);
    } else {
      setOponent(selectedUser);
    }
  }, [props, selectedUser]);

  useEffect(() => {
    let game = props.game;
    if (game?.state == 3) {
      if ((game?.userId1 == user._id && game?.winner == 1) || (game?.userId2 == user._id && game?.winner == 2)) {
        setType('Won');
      } else {
        if (game?.winner == 3) {
          setType('NoWinner');
        } else {
          setType('Lost');
        }
      }
    }
    if (game?.state == 1 && game?.userId1 == user._id) {
      setType('Waiting1');
    }
    if (game?.state == 1 && game?.userId2 == user._id) {
      setType('SelectMove');
    }
    if (game?.state == 2 && game?.userId1 == user._id) {
      const info = JSON.parse(localStorage.getItem(props?.game?.contractAddress));
      setType('Confirm');
      if (info) {
        setSelectedMove(info.move);
      }
    }
    if (game?.state == 2 && game?.userId2 == user._id) {
      setType('Waiting2');
    }
  }, [props]);

  const header =
    type == 'New'
      ? 'Create New Game: Please select your oponent, value and movement'
      : type == 'Waiting1'
      ? 'Waiting for oponent Movement'
      : type == 'SelectMove'
      ? 'Please select your movement'
      : type == 'Confirm'
      ? 'Please confirm your first movement'
      : type == 'Waiting2'
      ? 'Waiting for oponent to confirm his first movement'
      : type == 'Won'
      ? 'Congragulation! You Won!!!!'
      : type == 'NoWinner'
      ? 'This Game had no winner!'
      : 'You lost!';

  return (
    <div className="gameFrame-box">
      <div className="gameFrame-state">{header}</div>
      <div className="top-parent">
        <div className="oponent-parent">
          Opponent:{' '}
          {oponent ? (
            <>
              <span>{oponent?.username}</span>
              <img
                src={oponent.avatar ? BASE_URL + '/avatars/' + oponent.avatar : 'img/no-avatar.png'}
                className="gameFrame-oponent"
              ></img>
            </>
          ) : (
            <span className="warning">Please select one</span>
          )}{' '}
        </div>
        <div>
          Bet Value (ETH):{' '}
          {props.game ? (
            <span>{formatEther(props?.game?.amount)}</span>
          ) : (
            <input
              type="number"
              onChange={(e) => {
                setValue(e.target?.value);
              }}
              value={value}
              className="value-input"
            />
          )}
        </div>
      </div>
      {(type == 'New' || type == 'Confirm' || type == 'SelectMove') && (
        <div className="gameFrame-content">
          {Object.keys(movesObject).map((move) => (
            <Move type={move} selectedMove={selectedMove} setSelectedMove={setSelectedMove} key={move} />
          ))}
        </div>
      )}

      {(type == 'Waiting1' || type == 'Waiting2' || type == 'Confirm') && (
        <div className="timer-parent">
          {type == 'Waiting1' || type == 'Waiting2' ? 'ِYou' : 'Your Oponent'} can cancle the game in: {timeLeft}{' '}
          seconds <img src="img/timer.gif" className="timer"></img>
        </div>
      )}

      {type == 'Won' && (
        <div className="gameFrame-content">
          <img src="img/win.gif" className="win"></img>
        </div>
      )}
      {type == 'Lost' && (
        <div className="gameFrame-content">
          <img src="img/lose.jpeg" className="lose"></img>
        </div>
      )}

      {type == 'NoWinner' && (
        <div className="gameFrame-content">
          <img src="img/no-winner.jpg" className="win"></img>
        </div>
      )}

      {buttonText && (
        <div className="gameFrame-button-parent">
          {loading ? (
            <img src="img/loading.gif" className="loading"></img>
          ) : (
            <Button variant="contained" className="gameFrame-button" onClick={buttonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      )}
      {props?.game?.contractAddress && (
        <div className="contract-parent">
          <img src="img/smart-contracts.png" className="contract"></img>
          <a href={'https://sepolia.etherscan.io/address/' + props?.game?.contractAddress}>View on Chain Scan</a>
        </div>
      )}
      {error && <div className="error">{error.substring(0, 100)}</div>}
    </div>
  );
}

function Move(props) {
  return (
    <div>
      <img src={`movement/${props.type}.png`} className="button-image"></img>
      <div className="move">
        <input
          type="radio"
          onChange={() => {
            props.setSelectedMove(movesObject[props.type]);
          }}
          checked={props.selectedMove == movesObject[props.type]}
        />
      </div>
    </div>
  );
}
