import { Idl } from '@project-serum/anchor';

export const IDL: Idl = {
  version: '0.1.0',
  name: 'my_nft_project',
  instructions: [
    {
      name: 'createQuest',
      accounts: [
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'questAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'questId',
          type: 'string',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'rewardPoints',
          type: 'u32',
        },
      ],
    },
    {
      name: 'toggleQuestStatus',
      accounts: [
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'questAccount',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initializeUserProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'completeQuest',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'nftTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'questAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userQuestStatus',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'userQuestStatusBump',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Quest',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey',
          },
          {
            name: 'questId',
            type: 'string',
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'description',
            type: 'string',
          },
          {
            name: 'rewardPoints',
            type: 'u32',
          },
          {
            name: 'isActive',
            type: 'bool',
          },
          {
            name: 'completionCount',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'UserProfile',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'totalPoints',
            type: 'u32',
          },
          {
            name: 'completedQuestsCount',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'UserQuestStatus',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'questId',
            type: 'string',
          },
          {
            name: 'completed',
            type: 'bool',
          },
          {
            name: 'completedAt',
            type: 'i64',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Unauthorized',
      msg: '권한이 없습니다',
    },
    {
      code: 6001,
      name: 'QuestAlreadyCompleted',
      msg: '이미 완료한 퀘스트입니다',
    },
    {
      code: 6002,
      name: 'QuestNotActive',
      msg: '현재 비활성화된 퀘스트입니다',
    },
    {
      code: 6003,
      name: 'NotNFTOwner',
      msg: 'NFT 소유자가 아닙니다',
    },
    {
      code: 6004,
      name: 'NoNFTTokens',
      msg: 'NFT 토큰이 없습니다',
    },
    {
      code: 6005,
      name: 'QuestIdTooLong',
      msg: '퀘스트 ID가 너무 깁니다',
    },
  ],
  metadata: {
    address: 'EgRVporMpouQNbeacxnJDedG4zGnBMoEu1B6NKL4EQHn',
  },
} as const;
