import Games from '../../components/games';
import Header from '../../components/header';
import Users from '../../components/users';
import './game.css';

export default function Game() {
  return (
    <>
      <Header></Header>
      <div className="gamePage">
        <div className="usersParrent">
          <Users />
        </div>
        <div className="gameFrame">
          <Games />
        </div>
      </div>
    </>
  );
}
