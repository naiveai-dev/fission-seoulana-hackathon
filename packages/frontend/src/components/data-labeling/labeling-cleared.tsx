import { useMemo } from 'react';
import { labelingQuestions, useLabeling } from '../../lib/use-labeling';
import { Box } from '../box';
import { useEvaluation } from '../../lib/use-evaluation';
import { Button } from '../button';
import SaveButton from './save-button';

export default function LabelingCleared() {
  const status = useLabeling((state) => state.status);
  const history = useLabeling((state) => state.labelingHistory);
  const endLabeling = useLabeling((state) => state.endLabeling);

  const accuracy = (status.correctCount / labelingQuestions.length) * 100;

  const { mutate, data, status: evaluationStatus } = useEvaluation(history);

  const level = useMemo(() => {
    if (accuracy >= 90) {
      return 'Expert';
    } else if (accuracy >= 75) {
      return 'Proficient';
    } else if (accuracy >= 50) {
      return 'Intermediate';
    } else {
      return 'Beginner';
    }
  }, [accuracy]);

  return (
    <Box className="min-h-64 space-y-4">
      <div className="bg-primary text-white px-4 py-2">
        <p className="text-lg text-center text-balance">
          You are [{level}] Level!
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4">
        <li className="bg-white border border-primary p-4 flex justify-between items-center">
          <span>Trust Score</span>
          <span>{accuracy} / 100</span>
        </li>
        <li className="bg-white border border-primary p-4 flex justify-between items-center">
          <span>Completed Task</span>
          <span>{status.correctCount}</span>
        </li>
        <li className="bg-white border border-primary p-4 col-span-2 min-h-40 max-h-96 overflow-auto space-y-4">
          <span className="block">AI Evaluation:</span>
          {evaluationStatus === 'idle' && (
            <Button onClick={() => mutate()}>Check AI's Evaluation</Button>
          )}
          {evaluationStatus !== 'idle' && (
            <span className="block whitespace-pre-wrap">
              {evaluationStatus === 'pending'
                ? 'Loading...'
                : evaluationStatus === 'error'
                  ? 'Error'
                  : data}
            </span>
          )}
        </li>
      </ul>

      <div className="space-y-2">
        <SaveButton />

        <Button className="w-full" size={'lg'} onClick={() => endLabeling()}>
          Close
        </Button>
      </div>
    </Box>
  );
}
