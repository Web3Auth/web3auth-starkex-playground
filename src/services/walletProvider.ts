import { SafeEventEmitterProvider } from "@web3auth/base";

import starkexProvider from "./starkexProvider";

export interface IWalletProvider {
  getStarkAccount: () => Promise<any>;
  getStarkKey: () => Promise<any>;
  getETHAddress: () => Promise<any>;
  onMintRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onDepositRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onWithdrawalRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onL1DepositRequest: (amount: string, assetType: string, vaultId: string) => Promise<void>;
  onL1WithdrawalRequest: (amount: string, vaultId: string, assetType: string) => Promise<void>;
  onViewBalanceRequest: (assetType: string, vaultId: string) => Promise<void>;
  onViewDepositBalanceRequest: (assetId: string, vaultId: string) => Promise<void>;
  onTransferRequest: (
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
  ) => Promise<void>;
  onSettlementRequest: () => Promise<void>;
}

export const getWalletProvider = (provider: SafeEventEmitterProvider | null, uiConsole: any): IWalletProvider => {
  return starkexProvider(provider, uiConsole);
};
