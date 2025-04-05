import { cn } from '../../lib/tailwind-util';
import { useLabeling } from '../../lib/use-labeling';
import { Button } from '../button';

export default function DataLabelingButton({
  completed,
}: {
  completed: boolean;
}) {
  const setLabelingMode = useLabeling((state) => state.setLabelingMode);

  return (
    <Button
      className={cn(
        completed &&
          'w-24 pointer-events-none bg-green-700! border-green-700! text-white!',
      )}
      disabled={completed}
      onClick={() => setLabelingMode(true)}
    >
      {completed ? 'Completed' : 'Start'}
    </Button>
  );
}
