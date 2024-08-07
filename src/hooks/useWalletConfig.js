import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { createThirdwebClient } from 'thirdweb';
const useWalletConfig = () => {
  const supportedWallets = [
    inAppWallet(),
    createWallet('io.metamask', {
      preferDeepLink: true,
    }),
    createWallet('com.coinbase.wallet'),
    createWallet('walletConnect'),
    createWallet('com.trustwallet.app'),
  ];

  const connectModal = { title: 'Connect', titleIcon: '/gallery.png' };

  const autoConnect = { timeout: 60000 };
  const supportedChains = ['sepolia'];
  const clientId = process.env.REACT_APP_THIRDWEB_ID;
  const client = createThirdwebClient({
    clientId,
  });

  const theme = 'light';
  return {
    client,
    supportedChains,
    supportedWallets,
    theme,
    showAllWallets: false,
    connectModal,
    autoConnect,
  };
};
export default useWalletConfig;
