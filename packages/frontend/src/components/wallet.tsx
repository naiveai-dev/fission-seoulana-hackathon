import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from './button';
import useBalance from '../lib/use-balance';
import { useRef } from 'react';
import { cn } from '../lib/tailwind-util';
import css from './wallet.module.css';

export default function Wallet() {
  const { setVisible } = useWalletModal();
  const wallet = useWallet();
  const balance = useBalance();

  const balancePrev = useRef<number | null>(balance.sol ?? null);

  const trimedPublicKey =
    wallet.publicKey?.toBase58().slice(0, 4) +
    '...' +
    wallet.publicKey?.toBase58().slice(-4);

  return (
    <div className="flex flex-col gap-1 w-full h-full">
      {!wallet.connected && (
        <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-2">
          <p>Please connect your wallet</p>
          <Button className="w-fit" onClick={() => setVisible(true)}>
            {/* Connect Wallet */}⏻ ON
          </Button>
        </div>
      )}
      {wallet.connected && (
        <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-2">
          <p className="tracking-tighter">
            {trimedPublicKey}{' '}
            <span
              key={balance.sol}
              className={cn(
                balancePrev.current !== balance.sol && css.textFadeInOut,
              )}
            >
              ({balance.sol ?? '...'} SOL)
            </span>
          </p>
          <Button className="w-fit" onClick={() => wallet.disconnect()}>
            ⏻ OFF
          </Button>
        </div>
      )}
    </div>
  );
}
