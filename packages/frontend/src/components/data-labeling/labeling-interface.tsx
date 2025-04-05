import { labelingQuestions, useLabeling } from '../../lib/use-labeling';
import { Box } from '../box';
import { Button } from '../button';

export default function LabelingInterface({
  onClear,
}: {
  onClear: () => void;
}) {
  const status = useLabeling((state) => state.status);
  const question = labelingQuestions[status.questionIndex];
  const checkAnswer = useLabeling((state) => state.checkAnswer);

  const handleAnswer = (answer: boolean) => {
    checkAnswer(answer);

    if (status.questionIndex === labelingQuestions.length - 1) {
      onClear();
    }
  };

  return (
    <Box label="Data Labeling" className="min-h-64">
      <div className="pt-4 pb-6 px-2 flex justify-center">
        <p className="text-lg">Is this response accurate and helpful?</p>
      </div>
      <div className="relative space-y-4 p-2 bg-white border border-primary">
        <p className="absolute right-0 top-0 text-white leading-tight bg-primary px-2 py-1 text-xs">
          {question.id}
        </p>
        <p className="space-y-1">
          <span className="block px-2 py-1 bg-primary text-white w-fit text-sm">
            Query:
          </span>
          <span className="px-1 inline-block">{question.userQuery}</span>
        </p>
        <p className="space-y-1">
          <span className="block px-2 py-1 bg-primary text-white w-fit text-sm">
            Response Fragment:
          </span>
          <span className="px-1 inline-block">{question.responseFragment}</span>
        </p>
      </div>
      <div className="flex justify-center items-center gap-4 pt-4">
        <Button size={'lg'} onClick={() => handleAnswer(true)}>
          YES
        </Button>
        <Button size={'lg'} onClick={() => handleAnswer(false)}>
          NO
        </Button>
      </div>
    </Box>
  );
}
