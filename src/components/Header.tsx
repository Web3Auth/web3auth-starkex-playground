import starkexLogo from "../assets/starkexLogo.png";
import web3authLogo from "../assets/web3authLogoBlue.svg";

const Header = () => {
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center p-4">
            <div className="flex p-4 sm:p-1">
              <a href="https://web3auth.io">
                <img src={web3authLogo} style={{ height: "1.75rem", paddingRight: "0.5rem", borderRightWidth: "2px" }} />
              </a>
              <a href="https://starkware.co/starkex/">
                <img src={starkexLogo} style={{ height: "1.75rem", paddingLeft: "0.5rem" }} />
              </a>
            </div>
            <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }}>
              <img src="/web3AuthLogoWhite.svg" className="headerLogo" /> Connect to Web3Auth
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-around w-full p-4 border-2 border-slate-200">
            <button className="sidebarButton p-4 sm:p-1" onClick={() => {}}>
              Deposit
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => {}}>
              Withdrawal
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => {}}>
              Minting
            </button>
            <button className="sidebarButton p-4 sm:p-1" onClick={() => {}}>
              Transfer
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
