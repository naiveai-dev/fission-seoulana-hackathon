# Fission ID Frontend

This project is the frontend for the Fission ID system—a self-sovereign, merit-based identity solution built on the Solana blockchain. It integrates modern web technologies with blockchain functionality and interactive quests, including wallet connection, NFT minting, and data labeling tasks.

## Overview

Fission ID leverages:

- React + TypeScript & Vite: For fast development and hot module reloading.

- Solana Wallet Adapter & Web3.js: To enable users to securely connect their wallets and interact with the blockchain.

- Metaplex & Anchor: For NFT minting and on-chain quest management.

- Tailwind CSS: For a responsive and modern user interface.

- React Query: To manage asynchronous state and data fetching.

- ESLint & TypeScript Configurations: To enforce code quality and consistency.

The application supports various interactive quests:

- Mint Fission ID: Mint a unique NFT to represent your identity.

- Follow on 𝕏: Verify your social media follow.

- Read Fission Docs: Encourage users to explore project documentation.

- Data Labeling: Engage with an AI-assisted data labeling interface to assess response accuracy.

> And yes, while the code is meticulously structured, it’s as precise as your morning coffee—only with fewer spills!

## Features

- Wallet Integration: Users can connect/disconnect their Solana wallet to interact with the application.

- NFT Minting: Mint a Fission ID NFT directly from the app.

- Quest System: Complete quests to earn reward points, which include following social media accounts and reading documentation.

- Data Labeling Interface: Engage in a labeling task that checks the accuracy of AI responses.

- Blockchain Interactions: Utilize the Solana devnet via Anchor and Metaplex for secure and fast transactions.

## Installation

1. Install Dependencies:

```
pnpm install
```

2. Development Server:

```
pnpm frontend dev
```

3. Build for Production:

```
pnpm frontend run build
```

## Configuration

Vite Configuration: Located in vite.config.ts, includes plugins for React (using SWC), Tailwind CSS, and polyfills for Node globals.

TypeScript Configuration: Multiple TSConfig files (tsconfig.json, tsconfig.app.json, tsconfig.node.json) are used to ensure a strict, type-safe environment.

ESLint: The project uses a custom ESLint configuration (eslint.config.js) that includes recommended rules for React and TypeScript.

## Folder Structure

- `src/`

  - `components/` – Contains React components for wallet management, quests, data labeling, and UI elements.

  - `lib/` – Houses utility functions, Solana configuration, custom hooks (e.g., for wallet, balance, quests, minting, data labeling), and blockchain interaction logic.

  - `provider.tsx` – Sets up global providers for wallet and data querying.

  - `index.tsx` & main.tsx – Entry points for the application.

- Project Config Files: Includes configurations for Vite, TypeScript, and ESLint.

## Usage

1. Connect Wallet: Use the wallet component to connect your Solana wallet.

2. Complete Quests: Navigate through the quest section to verify actions such as minting your Fission ID NFT, following social media, and reviewing documentation.

3. Data Labeling: Participate in the interactive labeling interface to evaluate AI response fragments and save your progress on-chain.
