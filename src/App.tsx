import "./App.css";

import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3Auth } from "@web3auth/web3auth";
import { useEffect, useState } from "react";

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
    <div>
      <nav className="flex header">
        <div className="flex items-center text-white w-1/5">
          <a className="headerLogoContainerBorder" href="https://web3auth.io">
            <img src="/web3AuthLogoBlue.svg" className="headerLogo" />
          </a>{" "}
          <a className="headerLogoContainer" href="https://starkware.co/starkex/">
            <img src="/starkexLogo.png" className="headerLogo" />
          </a>
        </div>
        <div className="flex items-center w-3/5"></div>
        <div className="flex items-end text-white w-1/5">
          <a href="#" className="flex items-center text-white headerButton">
            <div className="headerLogoContainer">
              <img src="/web3AuthLogoWhite.svg" className="headerLogo" />
            </div>
            <span className="headerButtonText">Connect to Web3Auth</span>
          </a>
        </div>
      </nav>
      <div className="flex container">
        <div className="flex-col w-1/5 items-center justify-center flex-none">
          <ul>
            <li>
              <span className="sidebarHeading">Menu</span>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Default Parameters
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Deposit
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Withdrawal
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Settlement
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Minting
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Transfer
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Feeder Gateway
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                Availability Gateway
              </button>
            </li>
            <li>
              <button className="sidebarButton" onClick={() => {}}>
                On-chain State
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-none w-4/5 items-center justify-center flex-none">
          <h1 className="title">
            <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
              Web3Auth
            </a>
            & ReactJS Example
          </h1>

          <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
