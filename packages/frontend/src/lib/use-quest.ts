import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import {
  FISSIONID_COLLECTION_PUBLIC_KEY,
  QUEST_PROGRAM_ID,
  SOLANA_CLUSTER_API_URL,
} from './config';
import { IDL } from './idl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Metadata, Metaplex } from '@metaplex-foundation/js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { sleep } from './sleep';

interface Quest {
  pubkey: string;
  questId: string;
  title: string;
  description: string;
  rewardPoints: number;
  isActive: boolean;
}

export default function useQuest() {
  const queryClient = useQueryClient();
  const wallet = useWallet();

  const program = getQuestProgram(wallet as unknown as Wallet);

  const { data: questList, isLoading: questListLoading } = useQuery<Quest[]>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['quest', wallet.publicKey?.toString()],
    queryFn: () =>
      fetchQuests({
        program,
        wallet,
      }),
  });

  const { data: questStatus, isLoading: statusLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['quest', 'status', wallet.publicKey?.toString()],
    queryFn: () =>
      fetchQuestStatus({
        program,
        wallet,
        questList: questList!,
      }),
    enabled: !!questList,
  });

  async function complete(quest: Quest) {
    if (!wallet.publicKey) {
      throw new Error('Wallet is not connected');
    }

    const connection = new Connection(SOLANA_CLUSTER_API_URL, 'confirmed');

    const metaplex = Metaplex.make(connection);
    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: wallet.publicKey });

    let found = false;
    let mint: PublicKey | null = null;

    nfts.forEach((nft) => {
      const ca = nft.collection?.address.toBase58();

      if (
        ca &&
        ca.toLowerCase() === FISSIONID_COLLECTION_PUBLIC_KEY.toLowerCase()
      ) {
        found = true;
        mint = (nft as Metadata).mintAddress;
      }
    });

    if (!found || !mint) {
      throw new Error("You don't have Fission ID");
    }

    const userTokenAccount = await getAssociatedTokenAddress(
      mint!,
      wallet.publicKey,
    );

    const [userProfilePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('user-profile'), wallet.publicKey.toBuffer()],
      program.programId,
    );

    const [statusPDA, bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('user-quest'),
        wallet.publicKey.toBuffer(),
        Buffer.from(quest.questId),
      ],
      program.programId,
    );

    try {
      await program.account.userProfile.fetch(userProfilePDA);
    } catch {
      await program.methods
        .initializeUserProfile()
        .accounts({
          user: wallet.publicKey,
          userProfile: userProfilePDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    }

    await program.methods
      .completeQuest(bump)
      .accounts({
        user: wallet.publicKey,
        nftTokenAccount: userTokenAccount,
        nftMint: mint,
        questAccount: new PublicKey(quest.pubkey),
        userProfile: userProfilePDA,
        userQuestStatus: statusPDA,
        tokenProgram: new PublicKey(
          'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        ),
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    await queryClient.invalidateQueries({
      queryKey: ['quest', 'status', wallet.publicKey?.toString()],
      exact: true,
    });
  }

  return {
    complete,
    questList,
    questStatus,
    questListLoading,
    statusLoading,
  };
}

function getQuestProgram(wallet: Wallet) {
  const provider = new AnchorProvider(
    new Connection(SOLANA_CLUSTER_API_URL, 'confirmed'),
    wallet as unknown as Wallet,
    {
      preflightCommitment: 'processed',
    },
  );

  return new Program(IDL, QUEST_PROGRAM_ID, provider);
}

async function fetchQuests({
  program,
}: {
  program: Program;
  wallet: WalletContextState;
}) {
  await sleep(2);
  const questAccounts = await program.account.quest.all();

  const parsed = questAccounts.map((q) => ({
    pubkey: q.publicKey.toBase58(),
    questId: q.account.questId,
    title: q.account.title,
    description: q.account.description,
    rewardPoints: q.account.rewardPoints,
    isActive: q.account.isActive,
  }));

  parsed.sort((a, b) => a.questId.localeCompare(b.questId));

  console.log('questList', parsed);
  return parsed;
}

async function fetchQuestStatus({
  program,
  wallet,
  questList,
}: {
  program: Program;
  wallet: WalletContextState;
  questList: Quest[];
}) {
  const statusMap: Record<string, boolean> = {};

  if (!wallet.publicKey) {
    throw new Error('Wallet not connected');
  }

  for (const q of questList) {
    await sleep(0.2);

    const [statusPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('user-quest'),
        wallet.publicKey.toBuffer(),
        Buffer.from(q.questId),
      ],
      program.programId,
    );

    try {
      const status = await program.account.userQuestStatus.fetch(statusPDA);
      statusMap[q.questId] = status.completed;
    } catch {
      statusMap[q.questId] = false;
    }
  }

  return statusMap;
}
