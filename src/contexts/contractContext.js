import React, { createContext, useState, useEffect } from 'react';
import { generateSalt, getData, postData, readJson } from '../utils/utils';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import { viemAdapter } from 'thirdweb/adapters/viem';
import { createThirdwebClient, getContract, sendTransaction, prepareContractCall } from 'thirdweb';
import { readContract } from 'thirdweb';
import { hasherContractAddress } from '../constants';
import { parseEther } from 'viem';
import { waitForReceipt } from 'thirdweb';

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const [RPS, setRPS] = useState(null);
  const [hasher, setHasher] = useState(null);

  useEffect(() => {
    readJson('contracts/RPS.json', setRPS);
    readJson('contracts/Hasher.json', setHasher);
  }, []);

  let chain = useActiveWalletChain();
  let account = useActiveAccount();
  const clientId = process.env.REACT_APP_THIRDWEB_ID;
  let client = createThirdwebClient({ clientId });

  const deployGameContract = async (oponentAddress, move, value) => {
    if (chain && account) {
      const hasherContract = getContract({
        client,
        chain,
        address: hasherContractAddress,
        abi: hasher.abi,
      });
      let salt = generateSalt();
      const hash = await readContract({
        contract: hasherContract,
        method: 'function hash(uint8 _c, uint256 _salt) returns(bytes32)',
        params: [move, '0x' + salt],
      });

      const viemClientWallet = viemAdapter.walletClient.toViem({
        client,
        chain,
        account,
      });

      let transactionHash = await viemClientWallet.deployContract({
        abi: RPS?.abi,
        account,
        bytecode: '0x' + RPS?.data?.bytecode?.object,
        args: [hash, oponentAddress],
        value: parseEther(value.toString()),
      });
      const receipt = await waitForReceipt({
        client,
        chain,
        transactionHash,
      });
      if (receipt?.contractAddress) {
        localStorage.setItem(receipt?.contractAddress, JSON.stringify({ salt: '0x' + salt, move }));
      }

      return receipt?.contractAddress;
    }
  };

  const waiting1 = async (contranctAddress) => {
    if (chain && account) {
      const myContract = getContract({
        client,
        chain,
        address: contranctAddress,
        abi: RPS?.abi,
      });
      const transaction = prepareContractCall({
        contract: myContract,
        method: 'j2Timeout',
        params: [],
      });

      const result = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(result);
      return receipt;
    }
  };
  const waiting2 = async (contranctAddress) => {
    if (chain && account) {
      const myContract = getContract({
        client,
        chain,
        address: contranctAddress,
        abi: RPS?.abi,
      });
      const transaction = prepareContractCall({
        contract: myContract,
        method: 'j1Timeout',
        params: [],
      });

      const result = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(result);
      return receipt;
    }
  };
  const selectMove = async (contranctAddress, move) => {
    if (chain && account) {
      const myContract = getContract({
        client,
        chain,
        address: contranctAddress,
        abi: RPS?.abi,
      });

      const stake = await readContract({
        contract: myContract,
        method: 'function stake() returns(uint256)',
        params: [],
      });

      const transaction = prepareContractCall({
        contract: myContract,
        method: 'play',
        params: [move],
        value: stake,
      });

      const result = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(result);
      return receipt;
    }
  };
  const confirm = async (contranctAddress, move, salt) => {
    if (chain && account) {
      const myContract = getContract({
        client,
        chain,
        address: contranctAddress,
        abi: RPS?.abi,
      });

      const transaction = prepareContractCall({
        contract: myContract,
        method: 'solve',
        params: [move, salt],
      });

      const result = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(result);
      return receipt;
    }
  };
  return (
    <ContractContext.Provider value={{ deployGameContract, waiting1, waiting2, selectMove, confirm }}>
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };
