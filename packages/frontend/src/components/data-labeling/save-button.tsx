import { useState } from 'react';
import useQuest from '../../lib/use-quest';
import { Button } from '../button';
import { QUEST_KEY } from '../../lib/config';

export default function SaveButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { complete, questList } = useQuest();

  const quest = questList?.find((q) => q.questId === QUEST_KEY.DATA_LABELING);

  const handleSave = async () => {
    if (!quest) {
      return;
    }

    try {
      setLoading(true);
      await complete(quest);
      setSuccess(true);
    } catch (error) {
      console.error('Error completing quest:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p className="text-center text-lg">Progress Saved!</p>;
  }

  return (
    <Button className="w-full" size={'lg'} onClick={handleSave}>
      Save Progress in on-chain
    </Button>
  );
}
