import { Box, TextField, Button, CircularProgress } from '@mui/material';
import './login.css';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from '../../../components/header';
import { AuthContext } from '../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/avatar';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('a1.png');
  const [success1, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/game');
    }
  }, [user]);
  return (
    <>
      <Header></Header>
      <Box className="login-box">
        <div className="login-top">Welcome to the Rock, Paper, Scissors game ! 💖</div>

        <div className="login-text">
          <TextField
            label="User Name"
            variant="outlined"
            inputProps={{ style: { fontSize: '1.5rem' } }}
            InputLabelProps={{ style: { fontSize: '1.5rem' } }}
            style={{ width: '50%' }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-text">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            inputProps={{ style: { fontSize: '1.5rem' } }}
            InputLabelProps={{ style: { fontSize: '1.5rem' } }}
            style={{ width: '50%' }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        {props.type == 'signup' && (
          <div className="login-text">
            <Avatar selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />
          </div>
        )}
        <div className="login-connect">
          {!loading ? (
            <Button
              onClick={async () => {
                try {
                  let res = null;
                  setLoading(true);
                  if (props.type == 'signup') {
                    res = await signup(username, password, selectedAvatar);
                  } else {
                    res = await login(username, password);
                  }
                  setLoading(false);
                  if (!res.user) {
                    setSuccess(false);
                  } else {
                    setSuccess(true);
                    navigate('/game');
                  }
                } catch (e) {
                  setLoading(false);
                }
              }}
              variant="contained"
              style={{ fontSize: '1.5rem', width: '15rem' }}
              disabled={success1}
            >
              {props.type == 'signup' ? 'Signup' : 'Login'}
            </Button>
          ) : (
            <CircularProgress />
          )}
        </div>
        {success1 == true ? (
          <div className={classNames('success', 'message')}>Success</div>
        ) : success1 == false ? (
          <div className={classNames('error', 'message')}>Failed</div>
        ) : (
          <div className={classNames('message')}>&nbsp;</div>
        )}
      </Box>
    </>
  );
}
