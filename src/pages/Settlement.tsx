/* eslint-disable prettier/prettier */
import { Signature } from "ethers";
import { useState } from "react";

import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useWeb3Auth } from "../services/web3auth";

interface feeInfo {
  feeLimit: number;
  tokenId: string;
  sourceVaultId: number;
}

interface signature {
  r: string;
  s: string;
}

interface OrderL1 {
  nonce: number;
  ethAddress: string;
  amountSell: number;
  amountBuy: number;
  tokenSell: string;
  tokenBuy: string;
  vaultIdSell: number;
  vaultIdBuy: number;
  expirationTimestamp: number;
  feeInfo: feeInfo;
  orderType: number;
  type: string;
}

interface OrderL2 {
  nonce: number;
  publicKey: string;
  amountSell: number;
  amountBuy: number;
  tokenSell: string;
  tokenBuy: string;
  vaultIdSell: number;
  vaultIdBuy: number;
  expirationTimestamp: number;
  feeInfo: feeInfo;
  orderType: number;
  type: string;
  signature: signature;
}

const sampleOrderL1: OrderL1 = {
  nonce: 1,
  amountSell: 50,
  amountBuy: 140,
  ethAddress: "0xDABadaBadabADaBadabADabAdabadABadAbadAbA",
  tokenSell: "0x20",
  tokenBuy: "0x10",
  vaultIdSell: 1,
  vaultIdBuy: 2,
  expirationTimestamp: 623456,
  feeInfo: {
    feeLimit: 2000,
    tokenId: "0x20",
    sourceVaultId: 1,
  },
  orderType: 0,
  type: "OrderL1Request",
};

const sampleOrderL2: OrderL2 = {
  nonce: 0,
  amountSell: 150,
  amountBuy: 40,
  publicKey: "0x70",
  tokenSell: "0x10",
  tokenBuy: "0x20",
  vaultIdSell: 48,
  vaultIdBuy: 64,
  expirationTimestamp: 642956,
  feeInfo: {
    feeLimit: 1000,
    tokenId: "0x10",
    sourceVaultId: 48,
  },
  signature: {
    s: "0x0",
    r: "0x0",
  },
  orderType: 0,
  type: "OrderL2Request",
};

function Settlement() {
  const { provider, starkKey, onSettlementRequest } = useWeb3Auth();
  const [OrderL11, setOrderL11] = useState(sampleOrderL1 as OrderL1);
  const [OrderL12, setOrderL12] = useState(sampleOrderL2 as OrderL2);

  function OrderL1Request(order: OrderL1, setOrder: any): any[] {
    return [
      {
        label: "nonce",
        input: order.nonce as unknown as string,
        onChange: setOrder,
      },
      {
        label: "order_type",
        input: order.orderType as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "eth_address",
        input: order.ethAddress as string,
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
        label: "fee_info.feeLimit",
        input: order.feeInfo.feeLimit as unknown as string,
        onChange: setOrder,
      },
      {
        label: "fee_info.sourceVaultId",
        input: order.feeInfo.sourceVaultId as unknown as string,
        onChange: setOrder,
      },
      {
        label: "fee_info.tokenId",
        input: order.feeInfo.tokenId as unknown as string,
        onChange: setOrder,
      },
    ];
  }

  function OrderL2Request(order: OrderL2, setOrder: any): any[] {
    return [
      {
        label: "nonce",
        input: order.nonce as unknown as string,
        onChange: setOrder,
      },
      {
        label: "order_type",
        input: order.orderType as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "amount_sell",
        input: order.amountSell as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "amount_buy",
        input: order.amountBuy as unknown as string,
        onChange: setOrder,
      }, //
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
      }, //
      {
        label: "fee_info.feeLimit",
        input: order.feeInfo.feeLimit as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "fee_info.sourceVaultId",
        input: order.feeInfo.sourceVaultId as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "fee_info.tokenId",
        input: order.feeInfo.tokenId as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "signature.r",
        input: order.signature.r as unknown as string,
        onChange: setOrder,
      }, //
      {
        label: "signature.s",
        input: order.signature.s as unknown as string,
        onChange: setOrder,
      }, //
    ];
  }

  const formDetails1 = OrderL1Request(OrderL11, setOrderL11);
  const formDetails2 = OrderL2Request(OrderL12, setOrderL12);

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
                <Form heading="OrderL1Request" headingCenter formDetails={formDetails1}></Form>
              </div>
              <div className="w-full flex justify-center align-center">
                <Form heading="OrderL2Request" headingCenter formDetails={formDetails2}></Form>
              </div>
            </div>

            <button
              className="w-10/12 mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
              style={{ backgroundColor: "#0364ff" }}
              onClick={() => onSettlementRequest({}, OrderL12, OrderL11)}>
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
