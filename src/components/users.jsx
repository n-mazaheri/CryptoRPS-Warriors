import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import './users.css';

export default function Users() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { getUsers, selectedUser, setSelectedUser, getActiveUsers } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function f() {
      let usrs = await getUsers();
      usrs = usrs.filter((u) => u._id != user._id);
      let activeUsers = await getActiveUsers();
      let newUsers = usrs.map((user) => {
        if (activeUsers.find((u) => u == user._id)) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });
      setUsers([...newUsers]);
    }
    f();
  }, []);

  return (
    <div className="users">
      {users?.map((user) => (
        <div className="user" key={user._id}>
          <div className="user-image-parent">
            <img
              src={user.avatar ? BASE_URL + '/avatars/' + user.avatar : 'img/no-avatar.png'}
              className="users-img"
            ></img>
            {user.active && <div className="circle">&nbsp;</div>}
          </div>
          <div>{user.username}</div>
          {user.walletAddress ? (
            <input
              type="radio"
              onChange={() => {
                setSelectedUser(user);
              }}
              checked={user?._id == selectedUser?._id}
            />
          ) : (
            <span className="warning">No Wallet Address </span>
          )}
        </div>
      ))}
    </div>
  );
}
