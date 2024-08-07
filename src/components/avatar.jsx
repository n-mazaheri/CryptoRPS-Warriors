import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';
import './avatar.css';

export default function Avatar(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  let { getAvatars } = useContext(AuthContext);
  const [avatars, setAvatars] = useState([]);
  useEffect(() => {
    const asyncFn = async () => {
      let res = await getAvatars();
      setAvatars(res);
    };
    asyncFn();
  }, []);

  return (
    <FormControl className="avatar-parent">
      <InputLabel id="demo-simple-select-label" className="avatar-text">
        Avatar
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.selectedAvatar}
        label="Avatar"
        onChange={(e) => {
          props.setSelectedAvatar(e.target.value);
        }}
        className="avatar-item"
      >
        {avatars.map((av) => (
          <MenuItem key={'av' + av} value={av} className="avatar-item">
            <img src={BASE_URL + '/avatars/' + av} className="avatar-image"></img>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
