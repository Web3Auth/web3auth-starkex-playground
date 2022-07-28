/* eslint-disable import/extensions */
import { useState } from "react";

import Header from "./Header";

function Deposit() {
  const [starkKey, setStarkKey] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState("");

  return (
    <>
      <Header />

      <br></br>

      <div className="h-56 grid grid-cols-3 gap-4 content-start">
        <h1 className="flex justify-center items-center font-medium text-3xl mt-0 mb-2 text-slate-600">Welcome to Web3Auth StarkEx Playground</h1>
        <div className="justify-center w-full">
          <div className="md:flex md:items-center block text-gray-500 font-bold md:text-right">Please connect to Web3Auth to get started</div>
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
                value={starkKey}
                onChange={(e) => setStarkKey(e.target.value)}
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
        <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }}>
          Send with StarkEx Gateway
        </button>

        <h1 className="flex justify-center md:items-center items-center font-medium leading-tight text-3xl mt-0 mb-2 text-slate-600">Response</h1>
        <div className="justify-center w-full">
          <div className="md:flex md:items-center mb-6">
            <textarea rows={5} className="w-full bg-gray-200" value={response} onChange={(e) => setResponse(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deposit;
