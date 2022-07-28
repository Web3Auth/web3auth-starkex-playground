import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { getWalletProvider, IWalletProvider } from "./walletProvider";

export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  user: unknown;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  getStarkAccount: () => Promise<any>;
  getStarkKey: () => Promise<any>;
  onMintRequest: () => Promise<void>;
  onDepositRequest: () => Promise<void>;
  onWithdrawalRequest: () => Promise<void>;
  onTransferRequest: () => Promise<void>;
  onSettlementRequest: () => Promise<void>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
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
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const setWalletProvider = useCallback((web3authProvider: SafeEventEmitterProvider) => {
    const walletProvider = getWalletProvider(web3authProvider, uiConsole);
    setProvider(walletProvider);
  }, []);

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        uiConsole("Yeah!, you are successfully logged in", data);
        setUser(data);
        setWalletProvider(web3auth.provider!);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        uiConsole("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        uiConsole("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        uiConsole("some error or user has cancelled login request", error);
      });
    };

    async function init() {
      try {
        setIsLoading(true);
        const clientId = "BKPxkCtfC9gZ5dj-eg-W6yb5Xfr3XkxHuGZl2o2Bn8gKQ7UYike9Dh6c-_LaXlUN77x0cBoPwcSx-IVm0llVsLA";
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
    setWalletProvider(localProvider!);
  };

  const logout = async () => {
    if (!web3Auth) {
      uiConsole("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
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
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.getStarkKey();
  };

  const onMintRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onMintRequest();
  };

  const onDepositRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onDepositRequest();
  };

  const onWithdrawalRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onWithdrawalRequest();
  };

  const onTransferRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    await provider.onTransferRequest();
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
