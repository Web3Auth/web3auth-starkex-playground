import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Deposit from "./components/Deposit";
import HomePage from "./components/HomePage";
import Minting from "./components/Minting";
import Transfer from "./components/Transfer";
import Withdrawal from "./components/Withdrawal";
import { Web3AuthProvider } from "./services/web3auth";

function App() {
  return (
    <div>
      <Web3AuthProvider />

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="minting" element={<Minting />} />
            <Route path="transfer" element={<Transfer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
