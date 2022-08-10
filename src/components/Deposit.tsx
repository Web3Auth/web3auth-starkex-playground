/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import { useState } from "react";

import { useWeb3Auth } from "../services/web3auth";
import Console from "./Console";
import Header from "./Header";

function Deposit() {
  const asset_type = starkwareCrypto.asset.getAssetType({ type: "ETH", data: { quantum: "1" } });
  const asset_id = starkwareCrypto.asset.getAssetId({ type: "ETH", data: { quantum: "1" } });
  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState(asset_id);
  const [assetType, setAssetType] = useState(asset_type);
  const [amount, setAmount] = useState("6000000000");

  const { starkKey, onDepositRequest, onL1DepositRequest, onViewBalanceRequest, onViewDepositBalanceRequest } = useWeb3Auth();
  return (
    <>
      <Header />

      <br></br>

      <div className="h-56 grid grid-cols-3 gap-4 content-start">
        <h1 className="flex justify-center md:items-center items-center font-medium leading-tight text-3xl mt-0 mb-2 text-slate-600">
          Deposit (L1 → Starkex)
        </h1>
        <div className="justify-center w-full">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                vault_id
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="number"
                value={vaultId}
                onChange={(e) => setVaultId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                stark_key
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={starkKey as string}
                readOnly
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                assetType
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                amount
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="flex rounded-full px-6 py-3 text-white"
          style={{ backgroundColor: "#0364ff" }}
          onClick={() => onL1DepositRequest(amount, assetType, vaultId)}>
          Deposit ETH
        </button>
        <button
          className="flex rounded-full px-6 py-3 text-white"
          style={{ backgroundColor: "#0364ff" }}
          onClick={() => onViewBalanceRequest(assetType, vaultId)}>
          View Balance
        </button>
        <br></br>
        <h1 className="flex justify-center md:items-center items-center font-medium leading-tight text-3xl mt-0 mb-2 text-slate-600">Deposit</h1>
        <div className="justify-center w-full">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                vault_id
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="number"
                value={vaultId}
                onChange={(e) => setVaultId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                stark_key
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={starkKey as string}
                readOnly
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                token_id
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                amount
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="flex rounded-full px-6 py-3 text-white"
          style={{ backgroundColor: "#0364ff" }}
          onClick={() => onDepositRequest(amount, tokenId, vaultId)}>
          Send with StarkEx Gateway
        </button>
        <button
          className="flex rounded-full px-6 py-3 text-white"
          style={{ backgroundColor: "#0364ff" }}
          onClick={() => onViewDepositBalanceRequest(assetType, vaultId)}>
          View Deposit Balance
        </button>
        <Console />
      </div>
    </>
  );
}

export default Deposit;
