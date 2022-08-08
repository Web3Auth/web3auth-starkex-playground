/* eslint-disable camelcase */
// @ts-ignore
import StarkExAPI from "@starkware-industries/starkex-js/dist/browser";
// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { privateToAddress } from "ethereumjs-util";
import { Contract, providers, Wallet } from "ethers";

import ABI from "../config/ABI.json";
import { IWalletProvider } from "./walletProvider";

const starkexProvider = (provider: SafeEventEmitterProvider | null, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const starkExAPI = new StarkExAPI({
    endpoint: "https://gw.playground-v2.starkex.co",
  });

  const getETHAddress = async (): Promise<any> => {
    try {
      const privateKey = await provider?.request({ method: "private_key" });
      const address = privateToAddress(Buffer.from(privateKey as string, "hex")).toString("hex");
      return address;
    } catch (error) {
      uiConsole(error);
      return error;
    }
  };

  const getStarkAccount = async (): Promise<any> => {
    try {
      const privateKey = await provider?.request({ method: "private_key" });
      const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, "hex");
      const account = starkwareCrypto.ec.keyFromPublic(keyPair.getPublic(true, "hex"), "hex");
      uiConsole(account);
      return account;
    } catch (error) {
      uiConsole(error);
      return error;
    }
  };

  // const getSignature = async (transfer: any): Promise<any> => {
  //   try {
  //     const privateKey = await provider?.request({ method: "private_key" });
  //     const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, "hex");
  //     const msgHash = starkwareCrypto.getTransferMsgHash(
  //       transfer.amount, // - amount (uint63 decimal str)
  //       transfer.nonce, // - nonce (uint31)
  //       transfer.sender_vault_id, // - sender_vault_id (uint31)
  //       transfer.token, // - token (hex str with 0x prefix < prime)
  //       transfer.target_vault_id, // - target_vault_id (uint31)
  //       transfer.target_public_key, // - target_public_key (hex str with 0x prefix < prime)
  //       transfer.expiration_timestamp // - expiration_timestamp (uint22)
  //     );
  //     const msgSignature = starkwareCrypto.sign(keyPair, msgHash);
  //     const { r, s } = msgSignature;
  //     return { r, s };
  //   } catch (error) {
  //     uiConsole(error);
  //     return error;
  //   }
  // };

  const getStarkKey = async (): Promise<string | undefined> => {
    try {
      const account = await getStarkAccount();
      const publicKeyX = account.pub.getX().toString("hex");
      uiConsole(publicKeyX);
      return publicKeyX;
    } catch (error) {
      uiConsole(error);
      return error as string;
    }
  };

  const onMintRequest = async (amount: string, tokenId: string, vaultId: string) => {
    try {
      const txId = await starkExAPI.gateway.getFirstUnusedTxId();
      const starkKey = await getStarkKey();

      const request = {
        txId,
        vaultId,
        amount,
        tokenId,
        starkKey: `0x${starkKey}`,
      };
      const response = await starkExAPI.gateway.mint(request);
      uiConsole(response);
    } catch (error) {
      uiConsole(error);
    }
  };

  const onViewBalanceRequest = async (assetType: string, vaultId: string) => {
    const privateKey = await provider?.request({ method: "private_key" });
    const alchemyProvider = new providers.AlchemyProvider("goerli", "4ZLZLLlFuTk2Md56571LEpcn6WML4L7X");
    const signer = new Wallet(privateKey as string, alchemyProvider);
    const StarkExchange = new Contract("0x471bDA7f420de34282AB8AF1F5F3DAf2a4C09746", ABI, signer);
    const starkKey = await getStarkKey();
    uiConsole(await StarkExchange.getDepositBalance(BigInt(`0x${starkKey}` as string).toString(10), assetType, vaultId));
  };

  const onL1DepositRequest = async (amount: string, assetType: string, vaultId: string) => {
    uiConsole("Depositing from L1");
    try {
      const privateKey = await provider?.request({ method: "private_key" });
      const alchemyProvider = new providers.AlchemyProvider("goerli", "4ZLZLLlFuTk2Md56571LEpcn6WML4L7X");
      const signer = new Wallet(privateKey as string, alchemyProvider);
      const StarkExchange = new Contract("0x471bDA7f420de34282AB8AF1F5F3DAf2a4C09746", ABI, signer);
      const starkKey = await getStarkKey();
      const txn = await StarkExchange.depositEth(BigInt(`0x${starkKey}` as string).toString(10), assetType, vaultId, {
        gasPrice: 10000000000,
        gasLimit: 9000000,
        value: amount,
      });
      uiConsole(txn);
      uiConsole(await txn.wait());
    } catch (error) {
      console.log(error);
      uiConsole(error);
    }
  };

  const onDepositRequest = async (amount: string, tokenId: string, vaultId: string) => {
    try {
      const starkKey = await getStarkKey();

      const txId = await starkExAPI.gateway.getFirstUnusedTxId();

      const request = {
        txId,
        amount,
        starkKey: `0x${starkKey}`,
        tokenId,
        vaultId,
      };
      const response = await starkExAPI.gateway.deposit(request);
      uiConsole(response);
      uiConsole(await starkExAPI.gateway.getTransaction(response.txId));
    } catch (error) {
      console.log(error);
      uiConsole(error);
    }
  };

  const onViewDepositBalanceRequest = async (assetId: string, vaultId: string) => {
    try {
      const starkKey = await getStarkKey();
      const privateKey = await provider?.request({ method: "private_key" });
      const alchemyProvider = new providers.AlchemyProvider("goerli", "4ZLZLLlFuTk2Md56571LEpcn6WML4L7X");
      const signer = new Wallet(privateKey as string, alchemyProvider);
      const StarkExchange = new Contract("0x471bDA7f420de34282AB8AF1F5F3DAf2a4C09746", ABI, signer);
      const balance = await StarkExchange.getQuantizedDepositBalance(BigInt(`0x${starkKey}` as string).toString(10), assetId, vaultId);
      uiConsole(balance);
    } catch (error) {
      console.log(error);
      uiConsole(error);
    }
  };

  const onL1WithdrawalRequest = async (amount: string, vaultId: string, assetType: string) => {
    uiConsole("Withdrawing to L1");
    try {
      const privateKey = await provider?.request({ method: "private_key" });
      const alchemyProvider = new providers.AlchemyProvider("goerli", "4ZLZLLlFuTk2Md56571LEpcn6WML4L7X");
      const signer = new Wallet(privateKey as string, alchemyProvider);
      const StarkExchange = new Contract("0x471bDA7f420de34282AB8AF1F5F3DAf2a4C09746", ABI, signer);
      const txn = await StarkExchange.withdrawFromVault(assetType, vaultId, amount, {
        gasPrice: 10000000000,
        gasLimit: 9000000,
      });
      uiConsole(txn);
      uiConsole(await txn.wait());
    } catch (error) {
      console.log(error);
      uiConsole(error);
    }
  };

  const onWithdrawalRequest = async (amount: string, tokenId: string, vaultId: string) => {
    try {
      const txId = await starkExAPI.gateway.getFirstUnusedTxId();
      const starkKey = await getStarkKey();
      const request = {
        txId,
        amount,
        starkKey: `0x${starkKey}`,
        tokenId,
        vaultId,
      };
      const response = await starkExAPI.gateway.withdrawal(request);
      uiConsole(response);
    } catch (error) {
      uiConsole(error);
    }
  };
  const onTransferRequest = async (
    amount: string,
    nonce: string,
    sender_public_key: string,
    sender_vault_id: string,
    token: string,
    receiver_public_key: string,
    receiver_vault_id: string,
    expirationTimestamp: string,
    signaturer: string,
    signatures: string
  ): Promise<any> => {
    try {
      const account = await getStarkAccount();
      const publicKeyX = account.pub.getX().toString("hex");
      const publicKeyY = account.pub.getY().toString("hex");
      const request = {
        tx: {
          type: "TransferRequest",
          amount,
          expirationTimestamp,
          nonce,
          receiver_public_key,
          receiver_vault_id,
          sender_public_key,
          sender_vault_id,
          signature: {
            r: signaturer,
            s: signatures,
          },
          token,
        },
        feeTx: {
          type: "TransferRequest",
          amount,
          expirationTimestamp,
          nonce,
          receiver_public_key,
          receiver_vault_id,
          sender_public_key,
          sender_vault_id,
          signature: {
            r: signaturer,
            s: signatures,
          },
          token,
        },
        starkPublicKey: {
          x: publicKeyX,
          y: publicKeyY,
        },
        memo: "my reference",
        partnerId: "xxyyzz",
      };
      const response = await starkExAPI.gateway.transfer(request);
      return response;
    } catch (error) {
      return error as string;
    }
  };

  const onSettlementRequest = async (): Promise<any> => {
    try {
      const account = await getStarkAccount();
      const publicKeyX = account.pub.getX().toString("hex");
      const publicKeyY = account.pub.getY().toString("hex");
      const request = {
        tx: {
          type: "TransferRequest",
          amount: "100",
          expirationTimestamp: 516578,
          nonce: 624865484,
          receiverPublicKey: "0x011869c13b32ab9b7ec84e2b31c1de58baaaa6bbb2443a33bbad8df739a6e958",
          receiverVaultId: 1478152318,
          senderPublicKey: "0x0435a5f41a1109379a143f931b6d2062623be35cc688a4f896e8689a1dd6f5c6",
          senderVaultId: 1252694399,
          signature: {
            r: "5d14357fcf8f489218de0855267c6f64bc463135debf62680ad796e63cd6d3b",
            s: "786ab874d91e3a5871134955fcb768914754760a0ada326af67f758f32819cf",
          },
          token: "0xb333e3142fe16b78628f19bb15afddaef437e72d6d7f5c6c20c6801a27fba7",
        },
        feeTx: {
          type: "TransferRequest",
          amount: "100",
          expirationTimestamp: 516578,
          nonce: 624865484,
          receiverPublicKey: "0x011869c13b32ab9b7ec84e2b31c1de58baaaa6bbb2443a33bbad8df739a6e958",
          receiverVaultId: 1478152318,
          senderPublicKey: "0x0435a5f41a1109379a143f931b6d2062623be35cc688a4f896e8689a1dd6f5c6",
          senderVaultId: 1252694399,
          signature: {
            r: "5d14357fcf8f489218de0855267c6f64bc463135debf62680ad796e63cd6d3b",
            s: "786ab874d91e3a5871134955fcb768914754760a0ada326af67f758f32819cf",
          },
          token: "0xb333e3142fe16b78628f19bb15afddaef437e72d6d7f5c6c20c6801a27fba7",
        },
        starkPublicKey: {
          x: publicKeyX,
          y: publicKeyY,
        },
        memo: "my reference",
        partnerId: "xxyyzz",
      };
      const response = await starkExAPI.gateway.settlement(request);
      return response;
    } catch (error) {
      return error as string;
    }
  };
  return {
    getETHAddress,
    getStarkAccount,
    getStarkKey,
    onViewBalanceRequest,
    onMintRequest,
    onDepositRequest,
    onL1DepositRequest,
    onViewDepositBalanceRequest,
    onWithdrawalRequest,
    onL1WithdrawalRequest,
    onTransferRequest,
    onSettlementRequest,
  };
};

export default starkexProvider;
