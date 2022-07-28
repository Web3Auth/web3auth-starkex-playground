/* eslint-disable import/extensions */

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Deposit from "./components/Deposit";
import HomePage from "./components/HomePage";
import Minting from "./components/Minting";
import Transfer from "./components/Transfer";
import Withdrawal from "./components/Withdrawal";

function App() {
  return (
    <div>
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
