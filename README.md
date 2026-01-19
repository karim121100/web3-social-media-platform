# Web3 Social Media Platform

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![DApp](https://img.shields.io/badge/type-social-pink)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Web3 Social Media Platform** returns data ownership to the user. Unlike centralized platforms that can ban users or monetize their data, this protocol stores posts as immutable records on the blockchain (or IPFS hashes stored on-chain).

## Features

-   **Unstoppable Content**: Posts cannot be deleted or censored by a central admin.
-   **Direct Tipping**: Readers can send ETH directly to the post author.
-   **Profile System**: simple identity mapping to wallet addresses.
-   **Feed Generation**: Public getter functions to build a frontend feed.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Contract
npx hardhat run deploy.js --network localhost

# 3. Create a Profile
node create_profile.js

# 4. Post a Status (Content stored as string or IPFS hash)
node post_content.js

# 5. Tip an Author
node tip_author.js
