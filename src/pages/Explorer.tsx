// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import { useEffect, useState } from "react";

import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import Tabs from "../components/Tabs";
import { useWeb3Auth } from "../services/web3auth";

function Explorer() {
  const asset_type = starkwareCrypto.asset.getAssetType({
    type: "ETH",
    data: { quantum: "1" },
  });
  const asset_id = starkwareCrypto.asset.getAssetId({
    type: "ETH",
    data: { quantum: "1" },
  });
  const { provider, starkKey, onWithdrawalRequest, onL1WithdrawalRequest, getLastBatch } = useWeb3Auth();

  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState(asset_id);
  const [assetType, setAssetType] = useState(asset_type);
  const [amount, setAmount] = useState("6000000000");
  const [l1TransactionData, setL1TransactionData] = useState("");

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

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": "NGeSzLk0z99E2e4R1BK1AICtvAtCeprCQtc8DjOlAzK75x7qWSKUxhlfYijthyIy",
      },
    };

    fetch("https://deep-index.moralis.io/api/v2/0x5731aEa1809BE0454907423083fb879079FB69dF?chain=goerli", options)
      .then((response) => response.json())
      .then((response) => {
        setL1TransactionData(response.result);
        console.log(response);
        return response;
      })
      .catch((err) => console.error(err));
  };

  const getStarkExData = async () => {
    console.log("Explorer.tsx 70");
    getLastBatch();
  };

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
      tabName: "L1 Transactions",
      onClick: () => setTab("l1"),
      active: tab === "l1",
    },
    {
      tabName: "StarkEx Batches",
      onClick: () => setTab("batches"),
      active: tab === "batches",
    },
    {
      tabName: "StarkEx Transactions",
      onClick: () => setTab("starkex"),
      active: tab === "starkex",
    },
  ];

  const renderTabs = () => {
    if (tab === "l1") {
      return <Table l1TransactionData={l1TransactionData} columnNames={["hash", "block_number", "from_address", "to_address", "gas"]} />;
    } else if (tab === "batches") {
      return <Table l1TransactionData={l1TransactionData} columnNames={[]} />;
    }
    return (
      <div className="w-full flex flex-row px-4 sm:px-6 lg:px-8 items-center">
        <div className="w-8/12 flex flex-row px-4 sm:px-6 lg:px-8 items-center">
          <Table l1TransactionData={l1TransactionData} columnNames={[]} />
        </div>
        <div className="w-4/12 flex flex-row px-4 sm:px-6 lg:px-8 items-center">
          <Console />
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col h-screen z-0">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className=" w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">StarkEx Explorer</h1>
            <button onClick={getData}>Hello</button>
            <button onClick={getStarkExData}>Hello 2</button>
            <Tabs tabData={TabData} />
            {renderTabs()}
          </div>
        ) : (
          <div className=" w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll p-4">
            <h1 className="text-2xl font-bold text-center sm:text-3xl">Welcome to Web3Auth StarkEx Playground</h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Please connect to Web3Auth to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Explorer;
