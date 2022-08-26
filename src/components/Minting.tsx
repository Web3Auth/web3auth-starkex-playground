// @ts-ignore
import { useState } from "react";

import { useWeb3Auth } from "../services/web3auth";
import Console from "./Console";
import Form from "./Form";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Minting() {
  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState("0x23a77118133287637ebdcd9e87a1613e443df789558867f5ba91faf7a024204");
  const [amount, setAmount] = useState("100");

  const { provider, starkKey, onMintRequest } = useWeb3Auth();

  const formDetails = [
    {
      label: "vault_id",
      input: vaultId as string,
      onChange: setVaultId,
    },
    {
      label: "stark_key",
      input: starkKey as string,
      readOnly: true,
    },
    {
      label: "token_id",
      input: tokenId as string,
      onChange: setTokenId,
    },
    {
      label: "amount",
      input: amount as string,
      onChange: setAmount,
    },
  ];

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className="container w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">Minting</h1>
            <Form heading="StarkEx Minting" formDetails={formDetails}>
              <button
                className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                style={{ backgroundColor: "#0364ff" }}
                onClick={() => onMintRequest(amount, tokenId, vaultId)}
              >
                Send with StarkEx Gateway
              </button>
            </Form>
            <Console />
          </div>
        ) : (
          <div className="container w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll">
            <h1 className="text-2xl font-bold text-center sm:text-3xl">Welcome to Web3Auth StarkEx Playground</h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Please connect to Web3Auth to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Minting;
