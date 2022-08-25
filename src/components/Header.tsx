import { useNavigate } from "react-router-dom";

import starkexLogo from "../assets/starkexLogo.png";
import web3authLogo from "../assets/web3authLogoBlue.svg";
import ConnectWeb3AuthButton from "./ConnectWeb3AuthButton";

const Header = () => {
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
            <ConnectWeb3AuthButton />
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
