import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { SOLANA_CLUSTER_API_URL } from './config';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';

async function fetchBalance({ publicKey }: { publicKey: PublicKey }) {
  const connection = new Connection(SOLANA_CLUSTER_API_URL);

  const lamports = await connection.getBalance(publicKey);

  return lamports;
}

export default function useBalance() {
  const { publicKey, connected } = useWallet();

  const query = useQuery({
    queryKey: ['balance', publicKey],
    queryFn: () => fetchBalance({ publicKey: publicKey! }),
    enabled: connected,
  });

  return {
    lamports: query.data,
    sol: query.data ? query.data / LAMPORTS_PER_SOL : null,
    status: query.status,
  };
}
