# Fission ID Backend (Solana + Anchor)

This document provides setup instructions for the Solana smart contract used in the Fission ID system. The contract is written in Rust using the Anchor framework and is deployed on the Solana Devnet.

## Backend Setup (Solana + Anchor)

### Step-by-step Instructions

1. **Create a new Anchor project** (replace `[project_name]` with your name):

   ```bash
   anchor init [project_name]
   ```

2. **Replace the following folder:**

   Copy everything from:

   ```
   packages/backend/programs/fission_quest/
   ```

   into:

   ```
   [project_name]/programs/
   ```

3. **Update `declare_id!` in `lib.rs`**

   Find this line:

   ```rust
   declare_id!("...");
   ```

   Replace it with:

   ```bash
   solana address -k target/deploy/[project_name]-keypair.json
   ```

4. **Update Anchor.toml**

   Replace `[project_name]/Anchor.toml` with the provided `packages/backend/programs/Anchor.toml`.

   Then edit this section in the file:

   ```toml
   [programs.devnet]
   fission_quest = ""
   ```

   Replace the empty string with the result of:

   ```bash
   solana address -k target/deploy/[project_name]-keypair.json
   ```

5. **Build and deploy the program**

   ```bash
   anchor build --arch sbf
   anchor deploy
   ```

Now your smart contract should be deployed and ready to interact with the Fission ID frontend.

## Directory Structure

```
[project_name]/
  ├── Anchor.toml
  └── programs/
       └── fission_quest/
            ├── Cargo.toml
            ├── Xargo.toml
            └── src/
                 └── lib.rs
```
