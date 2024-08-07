import './App.css';
import Game from './pages/game/game';
import LandingPage from './pages/landing/landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Login from './pages/game/login/login';
import ProtectedRoute from './utils/protectedRoute';
import { ThirdwebProvider } from 'thirdweb/react';
import { ContractProvider } from './contexts/contractContext';
import { GameProvider } from './contexts/gameContext';

function App() {
  return (
    <ThirdwebProvider activeChain="binance-testnet" autoSwitch={true} clientId="ccd77719917b46d2ceb86aa408e8f6af">
      <AuthProvider>
        <ContractProvider>
          <GameProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login type={'login'} />} />
                <Route path="/signup" element={<Login type={'signup'} />} />
                <Route path="/game" element={<ProtectedRoute />}>
                  <Route path="" element={<Game />} />
                </Route>
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </ContractProvider>
      </AuthProvider>
    </ThirdwebProvider>
  );
}

export default App;
