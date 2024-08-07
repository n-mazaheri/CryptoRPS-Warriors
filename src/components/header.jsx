import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import useWalletConfig from '../hooks/useWalletConfig';

export default function Header() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { generateNonce, verifySignature, logout, user, setAuthorized, authorized } = useContext(AuthContext);
  const { theme, supportedChains, supportedWallets, autoConnect, connectModal, client } = useWalletConfig();
  const navigate = useNavigate();
  const location = useLocation();
  let account = useActiveAccount();
  const [authorizing, setAuthorizing] = useState(false);
  async function f() {
    if (user && account?.address) {
      if (user?.walletAddress == account?.address) {
        setAuthorized(true);
      } else {
        try {
          setAuthorizing(true);
          let { nonce } = await generateNonce(account?.address);
          let signiture = await account?.signMessage({ message: nonce });
          let { isValid } = await verifySignature(nonce, signiture, account?.address);
          if (isValid) {
            setAuthorized(true);
          }
          setAuthorizing(false);
        } catch (e) {
          setAuthorizing(false);
        }
      }
    }
  }
  useEffect(() => {
    f();
  }, [account, user]);
  const isSignup = location.pathname === '/signup';
  const isLogin = location.pathname === '/login';

  return (
    <div className="game-header">
      <div className="flex">
        {' '}
        {isLogin ? (
          <button onClick={() => navigate('/signup')} className="game-button">
            Signup
          </button>
        ) : isSignup ? (
          <button onClick={() => navigate('/login')} className="game-button">
            Login
          </button>
        ) : (
          <>
            <div>{user?.username}</div>
            <img src={BASE_URL + '/avatars/' + user?.avatar} style={{ width: '5rem' }}></img>
            <button onClick={() => logout()} className="logout">
              Logout
            </button>
          </>
        )}
      </div>
      {(user && account?.address && authorized) || (user && !account?.address) ? (
        <ConnectButton
          theme={theme}
          chains={supportedChains}
          client={client}
          showAllWallets={false}
          connectModal={connectModal}
          wallets={supportedWallets}
          autoConnect={autoConnect}
          connectButton={{
            label: 'Connect',
          }}
          detailsButton={{}}
        />
      ) : user ? (
        <button
          onClick={async () => {
            f();
          }}
          disabled={authorizing}
        >
          {authorizing ? 'Authorizing' : 'Authorized'}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
