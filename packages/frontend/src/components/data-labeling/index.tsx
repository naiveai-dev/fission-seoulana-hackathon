import { useState } from 'react';
import LabelingInterface from './labeling-interface';
import LabelingStatus from './labeling-status';
import LabelingCleared from './labeling-cleared';

export default function DataLabeling() {
  const [cleared, onCleared] = useState<boolean>(false);
  return (
    <div className="space-y-4">
      <LabelingStatus />
      {!cleared && (
        <LabelingInterface
          onClear={() => {
            onCleared(true);
          }}
        />
      )}
      {cleared && <LabelingCleared />}
    </div>
  );
}
