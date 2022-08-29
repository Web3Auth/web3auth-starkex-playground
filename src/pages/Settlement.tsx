import { useState } from "react";

import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useWeb3Auth } from "../services/web3auth";

interface LimitOrder {
  nonce: number;
  amountSell: number;
  amountBuy: number;
  tokenSell: number;
  tokenBuy: number;
  vaultIdSell: number;
  vaultIdBuy: number;
  expirationTimestamp: number;
  feeInfo: number;
  signature: number;
}

const sampleLimitOrder: LimitOrder = {
  nonce: 0,
  amountSell: 1,
  amountBuy: 2,
  tokenSell: 3,
  tokenBuy: 4,
  vaultIdSell: 5,
  vaultIdBuy: 6,
  expirationTimestamp: 7,
  feeInfo: 8,
  signature: 9,
};

function Settlement() {
  const { provider, starkKey, onSettlementRequest } = useWeb3Auth();
  const [limitOrder1, setLimitOrder1] = useState(sampleLimitOrder as LimitOrder);
  const [limitOrder2, setLimitOrder2] = useState(sampleLimitOrder as LimitOrder);

  function formDetails(order: LimitOrder, setOrder: any): any[] {
    return [
      {
        label: "nonce",
        input: order.nonce as unknown as string,
        onChange: setOrder,
      },
      {
        label: "amount_sell",
        input: order.amountSell as unknown as string,
        onChange: setOrder,
      },
      {
        label: "amount_buy",
        input: order.amountBuy as unknown as string,
        onChange: setOrder,
      },
      {
        label: "token_sell",
        input: order.tokenSell as unknown as string,
        onChange: setOrder,
      },
      {
        label: "token_buy",
        input: order.tokenBuy as unknown as string,
        onChange: setOrder,
      },
      {
        label: "vault_id_sell",
        input: order.vaultIdSell as unknown as string,
        onChange: setOrder,
      },
      {
        label: "vault_id_buy",
        input: order.vaultIdBuy as unknown as string,
        onChange: setOrder,
      },
      {
        label: "expiration_timestamp",
        input: order.expirationTimestamp as unknown as string,
        onChange: setOrder,
      },
      {
        label: "fee_info",
        input: order.feeInfo as unknown as string,
        onChange: setOrder,
      },
      {
        label: "signature",
        input: order.signature,
        onChange: setOrder,
      },
    ];
  }

  const formDetails1 = formDetails(limitOrder1, setLimitOrder1);
  const formDetails2 = formDetails(limitOrder2, setLimitOrder2);

  return (
    <main className="flex flex-col h-screen z-0">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className=" w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">Settlement</h1>
            <div className="md:w-11/12 w-full md:flex justify-center align-center">
              <div className="w-full flex justify-center align-center">
                <Form heading="Limit Order 1" headingCenter formDetails={formDetails1}></Form>
              </div>
              <div className="w-full flex justify-center align-center">
                <Form heading="Limit Order 2" headingCenter formDetails={formDetails2}></Form>
              </div>
            </div>

            <button
              className="w-10/12 mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
              style={{ backgroundColor: "#0364ff" }}
              onClick={() => onSettlementRequest()}
            >
              Send with StarkEx Gateway
            </button>
            <Console />
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

export default Settlement;
