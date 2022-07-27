/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";

import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3Auth } from "@web3auth/web3auth";
import { useEffect, useState } from "react";

import starkexLogo from "./assets/starkexLogo.png";
import web3authLogo from "./assets/web3authLogoBlue.svg";
import RPC from "./starkexRPC";

const clientId = "YOUR_CLIENT_ID"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId,
            network: "testnet",
            uxMode: "popup",
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        uiConsole(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const onGetStarkAccount = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const starkaccounts = await rpc.getStarkAccount();
    uiConsole(starkaccounts);
  };

  const getStarkKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const starkKey = await rpc.getStarkKey();
    uiConsole(starkKey);
  };

  const onMintRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const request = await rpc.onMintRequest();
    uiConsole(request);
  };

  const onDepositRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const request = await rpc.onDepositRequest();
    uiConsole(request);
  };

  const onWithdrawalRequest = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const request = await rpc.onWithdrawalRequest();
    uiConsole(request);
  };

  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={onGetStarkAccount} className="card">
        Get Stark Accounts
      </button>
      <button onClick={getStarkKey} className="card">
        Get Stark Key
      </button>
      <button onClick={onMintRequest} className="card">
        Mint Request
      </button>
      <button onClick={onDepositRequest} className="card">
        Deposit Request
      </button>
      <button onClick={onWithdrawalRequest} className="card">
        Withdraw Request
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header>
          <div className="flex justify-between items-center p-4 ">
            <div className="flex">
              <img src={web3authLogo} style={{ height: "4vh", marginRight: "0.5vw" }} />
              <img src={starkexLogo} style={{ height: "4vh", marginLeft: "0.5vw" }} />
            </div>
            <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }}>
              <img src="/web3AuthLogoWhite.svg" className="headerLogo" /> Connect to Web3Auth
            </button>
          </div>
          <div className="flex justify-around w-full p-4 border-2 border-slate-200">
            <button className="sidebarButton" onClick={() => {}}>
              Deposit
            </button>
            <button className="sidebarButton" onClick={() => {}}>
              Withdrawal
            </button>
            <button className="sidebarButton" onClick={() => {}}>
              Minting
            </button>
            <button className="sidebarButton" onClick={() => {}}>
              Transfer
            </button>
          </div>
        </header>
        <div className="flex h-full">
          <main className="flex flex-col w-full bg-slate-50 overflow-x-hidden overflow-y-auto ">
            <div className="flex w-full mx-auto px-6 py-8">
              <div className="flex flex-col w-full h-full text-gray-900 text-xl"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
