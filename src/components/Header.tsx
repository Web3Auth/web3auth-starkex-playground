import { useNavigate } from "react-router-dom";

import starkexLogo from "../assets/starkexLogo.png";
import web3authLogo from "../assets/web3authLogoBlue.svg";
import ConnectWeb3AuthButton from "./ConnectWeb3AuthButton";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  return (
    <header className="border-b">
      <div className=" sticky max-w-screen px-4 py-4 mx-auto sm:py-2 sm:px-6 md:px-8">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="flex flex-row justify-center" onClick={() => goToHome()}>
            <img src={web3authLogo} style={{ height: "1.75rem", paddingRight: "0.5rem", borderRightWidth: "2px" }} />
            <img src={starkexLogo} style={{ height: "1.75rem", paddingLeft: "0.5rem" }} />
          </div>
          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
            <ConnectWeb3AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
