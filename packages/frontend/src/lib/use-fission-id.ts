import {
  createAndMint,
  mplTokenMetadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  FISSIONID_COLLECTION_PUBLIC_KEY,
  FISSIONID_METADATA_URI,
  SOLANA_CLUSTER_API_URL,
} from './config';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import {
  generateSigner,
  percentAmount,
  publicKey,
} from '@metaplex-foundation/umi';
import { useEffect, useState } from 'react';

export enum MintStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export default function useFissionId() {
  const [status, setStatus] = useState<MintStatus>(MintStatus.IDLE);
  const [error, setError] = useState<Error | null>(null);

  const wallet = useWallet();

  const umi = createUmi(SOLANA_CLUSTER_API_URL)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet));

  useEffect(() => {
    if (!wallet.connected) {
      setStatus(MintStatus.IDLE);
      setError(null);
    }
  }, [wallet.connected]);

  async function mint() {
    if (!wallet.connected) {
      console.error('Wallet not connected');
      return;
    }

    setStatus(MintStatus.PENDING);
    setError(null);
    try {
      await createAndMint(umi, {
        mint: generateSigner(umi),
        name: 'Fission ID',
        symbol: 'FISSIONID',
        sellerFeeBasisPoints: percentAmount(5),
        tokenStandard: TokenStandard.NonFungible,
        uri: FISSIONID_METADATA_URI,
        authority: umi.identity,
        isCollection: false,
        collection: {
          key: publicKey(FISSIONID_COLLECTION_PUBLIC_KEY),
          verified: false,
        },
      }).sendAndConfirm(umi);

      setStatus(MintStatus.SUCCESS);
    } catch (error) {
      setStatus(MintStatus.ERROR);

      if (error instanceof Error) {
        setError(error);
      }

      console.error('Error minting Fission ID:', error);
      throw error;
    }
  }

  return {
    error,
    status,
    mint,
  };
}
