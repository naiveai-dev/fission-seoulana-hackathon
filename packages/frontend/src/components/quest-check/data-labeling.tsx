import { Button } from '../button';

export default function DataLabelingButton({
  completed,
  onClick,
}: {
  completed: boolean;
  onClick: () => void;
}) {
  return <Button onClick={onClick}>{completed ? 'Completed' : 'Start'}</Button>;
}
