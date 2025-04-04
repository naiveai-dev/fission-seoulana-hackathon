import { useState } from 'react';
import { Button } from '../button';
import { cn } from '../../lib/tailwind-util';
import { sleep } from '../../lib/sleep';

export default function MintIdButton({
  completed,
  onAfterCheck,
}: {
  completed: boolean;
  onAfterCheck: () => void;
}) {
  const [verified, setVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (completed) {
    return (
      <Button
        className={cn(
          'w-24 pointer-events-none bg-green-700! border-green-700!',
        )}
      >
        Completed
      </Button>
    );
  }

  if (!verified) {
    return (
      <Button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          if (completed) {
            return;
          }

          // Simulate a check
          await sleep(3);

          setVerified(true);
          setLoading(false);
        }}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        onAfterCheck();
      }}
    >
      Save
    </Button>
  );
}
