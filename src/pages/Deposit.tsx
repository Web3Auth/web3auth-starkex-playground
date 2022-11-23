// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import { useState } from "react";

import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import { useWeb3Auth } from "../services/web3auth";

function Deposit() {
  const asset_type = starkwareCrypto.asset.getAssetType({
    type: "ETH",
    data: { quantum: "1" },
  });
  const asset_id = starkwareCrypto.asset.getAssetId({
    type: "ETH",
    data: { quantum: "1" },
  });
  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState(asset_id);
  const [assetType, setAssetType] = useState(asset_type);
  const [amount, setAmount] = useState("6000000000");

  const { provider, starkKey, onDepositRequest, onL1DepositRequest, onViewBalanceRequest, onViewDepositBalanceRequest } = useWeb3Auth();

  const [tab, setTab] = useState("l1");

  const formDetailsStarkEx = [
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
      label: "asset_type",
      input: assetType as string,
      onChange: setAssetType,
    },
    {
      label: "amount",
      input: amount as string,
      onChange: setAmount,
    },
  ];

  const formDetailsL1 = [
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
  const TabData = [
    {
      tabName: "L1 → StarkEx Deposit",
      onClick: () => setTab("l1"),
      active: tab === "l1",
    },
    {
      tabName: "StarkEx → StarkEx Deposit",
      onClick: () => setTab("starkex"),
      active: tab === "starkex",
    },
  ];

  return (
    <main className="flex flex-col h-screen z-0">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className="w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">Deposit</h1>
            <Tabs tabData={TabData} />
            {tab === "l1" ? (
              <Form formDetails={formDetailsStarkEx}>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onL1DepositRequest(amount, assetType, vaultId)}
                >
                  Deposit ETH
                </button>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onViewBalanceRequest(assetType, vaultId)}
                >
                  View Balance
                </button>
              </Form>
            ) : (
              <Form formDetails={formDetailsL1}>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onDepositRequest(amount, tokenId, vaultId)}
                >
                  Send with StarkEx Gateway
                </button>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onViewDepositBalanceRequest(assetType, vaultId)}
                >
                  View Deposit Balance
                </button>
              </Form>
            )}
            <Console />
          </div>
        ) : (
          <div className="w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll p-4">
            <h1 className="text-2xl font-bold text-center sm:text-3xl">Welcome to Web3Auth StarkEx Playground</h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Please connect to Web3Auth to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Deposit;
