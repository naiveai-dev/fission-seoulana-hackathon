import { useLabeling } from '../../lib/use-labeling';
import { Button } from '../button';

export default function DataLabelingButton({
  completed,
}: {
  completed: boolean;
}) {
  const setLabelingMode = useLabeling((state) => state.setLabelingMode);

  return (
    <Button onClick={() => setLabelingMode(true)}>
      {completed ? 'Completed' : 'Start'}
    </Button>
  );
}
