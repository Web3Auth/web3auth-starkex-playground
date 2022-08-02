/* eslint-disable camelcase */
// @ts-ignore
import StarkExAPI from "@starkware-industries/starkex-js/dist/browser";
// @ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import type { SafeEventEmitterProvider } from "@web3auth/base";

import { IWalletProvider } from "./walletProvider";

const starkexProvider = (provider: SafeEventEmitterProvider | null, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const starkExAPI = new StarkExAPI({
    endpoint: "https://gw.playground-v2.starkex.co",
  });

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

  const onDepositRequest = async (amount: string, tokenId: string, vaultId: string) => {
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
      const response = await starkExAPI.gateway.deposit(request);
      uiConsole(response);
    } catch (error) {
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
  return { getStarkAccount, getStarkKey, onMintRequest, onDepositRequest, onWithdrawalRequest, onTransferRequest, onSettlementRequest };
};

export default starkexProvider;
