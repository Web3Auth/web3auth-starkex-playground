import web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";
import { useWeb3Auth } from "../services/web3auth";

const ConnectWeb3AuthButton = () => {
  const { provider, login, logout } = useWeb3Auth();

  if (provider) {
    return (
      <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }} onClick={logout}>
        <img src={web3AuthLogoWhite} className="headerLogo" />
        Disconnect from Web3Auth
      </button>
    );
  }
  return (
    <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }} onClick={login}>
      <img src={web3AuthLogoWhite} className="headerLogo" />
      Connect to Web3Auth
    </button>
  );
};

export default ConnectWeb3AuthButton;
