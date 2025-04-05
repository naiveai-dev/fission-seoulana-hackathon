import { useMemo } from 'react';
import { labelingQuestions, useLabeling } from '../../lib/use-labeling';
import { Box } from '../box';

export default function LabelingStatus() {
  const status = useLabeling((state) => state.status);

  const accuracy = useMemo(() => {
    if (status.questionIndex === 0) {
      return 0;
    }
    return (status.correctCount / labelingQuestions.length) * 100;
  }, [status.correctCount, status.questionIndex]);

  return (
    <Box label="Labeling Status">
      <p>
        <u>Current Progress</u>: {status.questionIndex + 1} /{' '}
        {labelingQuestions.length}
      </p>
      <p>
        <u>Accuracy</u>: {accuracy}%
      </p>
    </Box>
  );
}
