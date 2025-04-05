import { useWallet } from '@solana/wallet-adapter-react';

import MintIdButton from './quest-check/mint-id';
import FollowXButton from './quest-check/follow-x';
import DocCheckButton from './quest-check/doc-check';
import useQuest from '../lib/use-quest';

import { QUEST_KEY } from '../lib/config';
import DataLabelingButton from './quest-check/data-labeling';
import HuggingFaceButton from './quest-check/hugging-face';

export default function QuestSection() {
  const wallet = useWallet();
  const { questList, complete, questStatus } = useQuest();

  const followXQuest = questList?.find((q) => q.questId === QUEST_KEY.FOLLOW_X);
  const followXCompleted = Boolean(questStatus?.[QUEST_KEY.FOLLOW_X]);

  const mintFissionIdQuest = questList?.find(
    (q) => q.questId === QUEST_KEY.MINT_FISSION_ID,
  );
  const mintFissionIdCompleted = Boolean(
    questStatus?.[QUEST_KEY.MINT_FISSION_ID],
  );

  const fissionDocsQuest = questList?.find(
    (q) => q.questId === QUEST_KEY.FISSION_DOC,
  );
  const fissionDocsCompleted = Boolean(questStatus?.[QUEST_KEY.FISSION_DOC]);

  const dataLabelingQuest = questList?.find(
    (q) => q.questId === QUEST_KEY.DATA_LABELING,
  );
  const dataLabelingCompleted = Boolean(questStatus?.[QUEST_KEY.DATA_LABELING]);

  const huggingFaceQuest = questList?.find(
    (q) => q.questId === QUEST_KEY.HUGGING_FACE,
  );
  const huggingFaceCompleted = Boolean(questStatus?.[QUEST_KEY.HUGGING_FACE]);

  return (
    <div className="w-full">
      <div>
        <span className="text-sm text-gray-500">
          Please press [Verify] → [Save]
        </span>
      </div>
      {!wallet.connected && (
        <div className="absolute inset-2 bg-material z-10 opacity-90 px-4 py-2 flex flex-col items-center justify-center">
          <p className="text-pretty max-w-xs text-center">
            Please connect your wallet to check your quests.
          </p>
        </div>
      )}
      <ul className="min-h-[204px]">
        <li className="py-3">
          <div className="flex justify-between items-center">
            <span>Mint Fission ID</span>
            <div className="h-11">
              {mintFissionIdQuest ? (
                <MintIdButton
                  completed={mintFissionIdCompleted}
                  onAfterCheck={async () => await complete(mintFissionIdQuest)}
                />
              ) : (
                <>...</>
              )}
            </div>
          </div>
        </li>

        <li className="py-3">
          <div className="flex justify-between items-center">
            <span>Follow @fission_web3 in 𝕏</span>
            <div className="h-11">
              {followXQuest ? (
                <FollowXButton
                  completed={followXCompleted}
                  onAfterCheck={async () => await complete(followXQuest)}
                />
              ) : (
                <>...</>
              )}
            </div>
          </div>
        </li>

        <li className="py-3">
          <div className="flex justify-between items-center">
            <span>Read Fission docs</span>
            <div className="h-11">
              {fissionDocsQuest ? (
                <DocCheckButton
                  completed={fissionDocsCompleted}
                  onAfterCheck={async () => await complete(fissionDocsQuest)}
                />
              ) : (
                <>...</>
              )}
            </div>
          </div>
        </li>

        <li className="py-3">
          <div className="flex justify-between items-center">
            <span>Try Data Labeling</span>
            <div className="h-11">
              {dataLabelingQuest ? (
                <DataLabelingButton
                  completed={dataLabelingCompleted}
                  onClick={() => {}}
                />
              ) : (
                <>...</>
              )}
            </div>
          </div>
        </li>

        <li className="py-3">
          <div className="flex justify-between items-center">
            <span>Hugging Face</span>
            <div className="h-11">
              {huggingFaceQuest ? (
                <HuggingFaceButton
                  completed={huggingFaceCompleted}
                  onAfterCheck={async () => await complete(huggingFaceQuest)}
                />
              ) : (
                <>...</>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
