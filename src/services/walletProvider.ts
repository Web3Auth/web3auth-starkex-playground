import { SafeEventEmitterProvider } from "@web3auth/base";

import starkexProvider from "./starkexProvider";

export interface IWalletProvider {
  getStarkAccount: () => Promise<any>;
  getStarkKey: () => Promise<any>;
  onMintRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onDepositRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onWithdrawalRequest: (amount: string, tokenId: string, vaultId: string) => Promise<void>;
  onTransferRequest: () => Promise<void>;
  onSettlementRequest: () => Promise<void>;
}

export const getWalletProvider = (provider: SafeEventEmitterProvider | null, uiConsole: any): IWalletProvider => {
  return starkexProvider(provider, uiConsole);
};
