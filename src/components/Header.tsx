/* eslint-disable @typescript-eslint/no-unused-vars */
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3Auth } from "@web3auth/web3auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import starkexLogo from "../assets/starkexLogo.png";
import web3authLogo from "../assets/web3authLogoBlue.svg";
import RPC from "../starkexRPC";

const clientId = "YOUR_CLIENT_ID"; // get from https://dashboard.web3auth.io

const Header = () => {
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

  const navigate = useNavigate();

  function goToWithdrawal() {
    navigate("/withdrawal");
  }
  function goToDeposit() {
    navigate("/deposit");
  }
  function goToHome() {
    navigate("/");
  }
  function goToMinting() {
    navigate("/minting");
  }
  function goToTransfer() {
    navigate("/transfer");
  }

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center p-4">
            <div className="flex p-4 sm:p-1" onClick={() => goToHome()}>
              <img src={web3authLogo} style={{ height: "1.75rem", paddingRight: "0.5rem", borderRightWidth: "2px" }} />
              <img src={starkexLogo} style={{ height: "1.75rem", paddingLeft: "0.5rem" }} />
            </div>
            {!provider ? (
              <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }} onClick={login}>
                <img src="/web3AuthLogoWhite.svg" className="headerLogo" />
                Connect to Web3Auth
              </button>
            ) : (
              <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }} onClick={logout}>
                <img src="/web3AuthLogoWhite.svg" className="headerLogo" />
                Disconnect from Web3Auth
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-around w-full p-4 border-2 border-slate-200">
            <button className="sidebarButton p-4 sm:p-1" onClick={() => goToDeposit()}>
              Deposit
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => goToWithdrawal()}>
              Withdrawal
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => goToMinting()}>
              Minting
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => goToTransfer()}>
              Transfer
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
