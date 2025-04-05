import { clusterApiUrl } from '@solana/web3.js';

export const SOLANA_CLUSTER_API_URL = clusterApiUrl('devnet');

export const FISSIONID_COLLECTION_PUBLIC_KEY =
  '7ZRp97Nge8AWBzxnUTUStnCAvG2YirgoA8ws1ipPWvLo';

export const FISSIONID_METADATA_URI =
  'https://gateway.irys.xyz/BsiKVpPmNQAqexFQuMVbkvSpftNahN5ZLdZ7CN1a1vaS';

export const FISSIONID_IMAGE_URI =
  'https://gateway.irys.xyz/ALjExXMyGJ6CLYJxuVCXsjb7vbKkKqSaWJash19s2T65';

export const QUEST_PROGRAM_ID = 'Bs7zB5us8D2PGPoos7ZX8xRviK5gBbx5ESvFPc1cMBAY';

export enum QUEST_KEY {
  MINT_FISSION_ID = 'mint-fission-id',
  FOLLOW_X = 'follow-x',
  FISSION_DOC = 'fission-doc',
}
