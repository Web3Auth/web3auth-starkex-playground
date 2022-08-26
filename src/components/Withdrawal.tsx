// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import { SetStateAction, useState } from "react";

import { useWeb3Auth } from "../services/web3auth";
import Console from "./Console";
import Form from "./Form";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";

function Withdrawal() {
  const asset_type = starkwareCrypto.asset.getAssetType({ type: "ETH", data: { quantum: "1" } });
  const asset_id = starkwareCrypto.asset.getAssetId({ type: "ETH", data: { quantum: "1" } });
  const { provider, starkKey, onWithdrawalRequest, onL1WithdrawalRequest } = useWeb3Auth();

  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState(asset_id);
  const [assetType, setAssetType] = useState(asset_type);
  const [amount, setAmount] = useState("6000000000");

  const [tab, setTab] = useState("starkex");

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
  const TabData = [
    {
      tabName: "StarkEx Withdrawal",
      onClick: () => setTab("starkex"),
      active: tab === "starkex",
    },
    {
      tabName: "L1 Withdrawal",
      onClick: () => setTab("l1"),
      active: tab === "l1",
    },
  ];

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className="container w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 sm:px-6 lg:px-8 text-2xl font-bold text-center text-primary sm:text-3xl">Withdrawal</h1>
            <Tabs tabData={TabData} />
            {tab === "starkex" ? (
              <Form formDetails={formDetailsStarkEx}>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onWithdrawalRequest(amount, tokenId, vaultId)}
                >
                  Send with StarkEx Gateway
                </button>
              </Form>
            ) : (
              <Form formDetails={formDetailsL1}>
                <button
                  className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                  style={{ backgroundColor: "#0364ff" }}
                  onClick={() => onL1WithdrawalRequest(amount, vaultId, assetType)}
                >
                  Withdraw ETH
                </button>
              </Form>
            )}
            <Console />
          </div>
        ) : (
          <div className="container w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll">
            <h1 className="text-2xl font-bold text-center text-primary sm:text-3xl">Welcome to Web3Auth StarkEx Playground</h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Please connect to Web3Auth to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Withdrawal;
