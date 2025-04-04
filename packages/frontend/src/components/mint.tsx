import { Button } from './button';
import { useWallet } from '@solana/wallet-adapter-react';
import useFissionId, { MintStatus } from '../lib/use-fission-id';
import { FISSIONID_IMAGE_URI } from '../lib/config';
import { cn } from '../lib/tailwind-util';
import { useMemo } from 'react';

export default function MintSection() {
  const wallet = useWallet();
  const { mint, status, error } = useFissionId();
  const imageUri = FISSIONID_IMAGE_URI;

  const text = useMemo(() => {
    if (status === MintStatus.PENDING) {
      return 'Minting...';
    }
    if (status === MintStatus.SUCCESS) {
      return 'Minted!';
    }
    return 'Mint Fission ID';
  }, [status, wallet.connected]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          'w-22 sm:w-40 aspect-square relative mx-auto',
          status === MintStatus.PENDING && 'animate-pulse',
          status === MintStatus.SUCCESS && 'animate-rotate-3d repeat-1',
        )}
      >
        <div className="absolute inset-0 bg-primary/40 animate-pulse z-0"></div>
        {imageUri && (
          <img
            src={imageUri}
            width={160}
            height={160}
            className="absolute inset-0 z-[1] w-22 sm:w-44 aspect-square object-cover"
          />
        )}
      </div>
      <Button
        disabled={status === MintStatus.PENDING || !wallet.connected}
        onClick={async () => {
          if (!wallet.connected) {
            return;
          }

          await mint();
        }}
      >
        {text}
      </Button>
      {error && (
        <p className="text-xs text-red-500 tracking-tighter w-full break-all text-center">
          {error?.message}
        </p>
      )}
    </div>
  );
}
