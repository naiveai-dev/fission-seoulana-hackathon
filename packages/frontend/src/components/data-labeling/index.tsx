import LabelingInterface from './labeling-interface';
import LabelingStatus from './labeling-status';

export default function DataLabeling() {
  return (
    <div className="space-y-4">
      <LabelingStatus />
      <LabelingInterface />
    </div>
  );
}
