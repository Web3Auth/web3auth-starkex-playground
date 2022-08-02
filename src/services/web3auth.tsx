/* eslint-disable camelcase */
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { getWalletProvider, IWalletProvider } from "./walletProvider";

export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  user: unknown;
  starkKey: unknown;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  getStarkAccount: () => Promise<any>;
  getStarkKey: (provider: any) => Promise<any>;
  onMintRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onDepositRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onWithdrawalRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onTransferRequest: (
    amount: string,
    nonce: string,
    sender_public_key: string,
    sender_vault_id: string,
    token: string,
    receiver_public_key: string,
    receiver_vault_id: string,
    expirationTimestamp: string,
    signaturer: string,
    signatures: string
  ) => Promise<void>;
  onSettlementRequest: () => Promise<void>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
  starkKey: null,
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  getStarkAccount: async () => {},
  getStarkKey: async () => {},
  onMintRequest: async () => {},
  onDepositRequest: async () => {},
  onWithdrawalRequest: async () => {},
  onTransferRequest: async () => {},
  onSettlementRequest: async () => {},
});

export function useWeb3Auth(): IWeb3AuthContext {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthProps {
  children?: ReactNode;
}

export const Web3AuthProvider = ({ children }: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);
  const [starkKey, setStarkKey] = useState<IWalletProvider | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const setWalletProvider = useCallback(async (web3authProvider: SafeEventEmitterProvider | null) => {
    const walletProvider = getWalletProvider(web3authProvider, uiConsole);
    console.log("68", provider);
    setProvider(walletProvider);
    setStarkKey(await walletProvider?.getStarkKey());
  }, []);

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        uiConsole("Yeah!, you are successfully logged in", data);
        setUser(data);
        setWalletProvider(web3auth.provider!);
        // getStarkKey();
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        uiConsole("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        uiConsole("disconnected");
        setUser(null);
        setStarkKey(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        uiConsole("some error or user has cancelled login request", error);
      });
    };

    async function init() {
      try {
        setIsLoading(true);
        const clientId = "BOBJnF2hVRa4lNWVDSZuFBs3mKeA8_P2gRHvIqsgyGAjg8tnVgTmJOVFF_AtvZNYNVD0OydlF01286JouQs8DIA";
        const web3AuthInstance = new Web3Auth({
          chainConfig: {
            displayName: "StarkEx",
            chainNamespace: CHAIN_NAMESPACES.OTHER,
            tickerName: "StarkEx",
          },
          // get your client id from https://dashboard.web3auth.io
          clientId,
        });
        subscribeAuthEvents(web3AuthInstance);
        setWeb3Auth(web3AuthInstance);
        await web3AuthInstance.initModal();
      } catch (error) {
        uiConsole(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [setWalletProvider]);

  const login = async () => {
    if (!web3Auth) {
      uiConsole("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    console.log("web3auth connecting");
    const localProvider = await web3Auth.connect();
    console.log("web3auth connected");
    setWalletProvider(localProvider);
  };

  const logout = async () => {
    uiConsole("Logging out");
    if (!web3Auth) {
      uiConsole("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
    setStarkKey(null);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      uiConsole("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    uiConsole(user);
  };

  const getStarkAccount = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.getStarkAccount();
  };

  const getStarkKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet 163");
      return;
    }
    setStarkKey(await provider.getStarkKey());
  };

  const onMintRequest = async (amount: string, tokenId: string, vaultId: string) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onMintRequest(amount, tokenId, vaultId);
  };

  const onDepositRequest = async (amount: string, tokenId: string, vaultId: string) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onDepositRequest(amount, tokenId, vaultId);
  };

  const onWithdrawalRequest = async (amount: string, tokenId: string, vaultId: string) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onWithdrawalRequest(amount, tokenId, vaultId);
  };

  const onTransferRequest = async (
    amount: string,
    nonce: string,
    sender_public_key: string,
    sender_vault_id: string,
    token: string,
    receiver_public_key: string,
    receiver_vault_id: string,
    expirationTimestamp: string,
    signaturer: string,
    signatures: string
  ) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onTransferRequest(
      amount,
      nonce,
      sender_public_key,
      sender_vault_id,
      token,
      receiver_public_key,
      receiver_vault_id,
      expirationTimestamp,
      signaturer,
      signatures
    );
  };

  const onSettlementRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onSettlementRequest();
  };

  const contextProvider = {
    web3Auth,
    provider,
    user,
    isLoading,
    starkKey,
    login,
    logout,
    getUserInfo,
    getStarkAccount,
    getStarkKey,
    onMintRequest,
    onDepositRequest,
    onWithdrawalRequest,
    onTransferRequest,
    onSettlementRequest,
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
