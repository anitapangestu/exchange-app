import React, { createContext, useState } from 'react';
import buyHistory from "./static-data/buyHistory.json";
import sellHistory from "./static-data/sellHistory.json";

import type { ITransaction } from './static-data/types';

type TWallet = Record<'BTC' | 'USD', number>;

interface IUserData {
  wallet: TWallet;
  buyHistory: ITransaction[];
  sellHistory: ITransaction[];
}

interface IUserContextProps {
  wallet: TWallet;
  buyHistory: ITransaction[];
  sellHistory: ITransaction[];
  setWallet: React.Dispatch<React.SetStateAction<TWallet>>;
  setBuyHistory: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  setSellHistory: React.Dispatch<React.SetStateAction<ITransaction[]>>;
}

const initialUserData: IUserData = {
  wallet: {
    USD: 50000,
    BTC: 0.5,
  },
  buyHistory: buyHistory.history as ITransaction[],
  sellHistory: sellHistory.history as ITransaction[],
};

export const UserContext = createContext<IUserContextProps>({
  wallet: initialUserData.wallet,
  buyHistory: initialUserData.buyHistory,
  sellHistory: initialUserData.sellHistory,
  setWallet: () => {},
  setBuyHistory: () => {},
  setSellHistory: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<TWallet>(initialUserData.wallet);
  const [buyHistory, setBuyHistory] = useState<ITransaction[]>(initialUserData.buyHistory);
  const [sellHistory, setSellHistory] = useState<ITransaction[]>(initialUserData.sellHistory);

  return (
    <UserContext.Provider value={{
      wallet,
      buyHistory,
      sellHistory,
      setWallet,
      setBuyHistory,
      setSellHistory,
    }}>
      {children}
    </UserContext.Provider>
  );
};