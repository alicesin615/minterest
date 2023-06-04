
# Minterest

Chainlink Hackathon Spring 2023

Welcome to my submission for Chainlink's 2023 hackathon! Minterest is a simple staking decentralized application (DApp) that allows users to stake and unstake tokens and earn rewards. I built this application independently as a beginner in smart contract development. 

## Features

- Connect your MetaMask wallet: Users can connect their own MetaMask wallet to the DApp, providing a seamless and secure way to interact with the application.
- Stake and unstake ERC20 tokens: Users can stake their tokens into the application, locking them up for a specific period.
- Track staking duration: The application keeps track of the duration for which tokens are staked, determining the rewards accordingly.
- Earn rewards: By staking their tokens, users become eligible to earn rewards over time.
- Real-time token price display: Utilizes Chainlink's decentralized price feed oracle to fetch and display real-time prices of ERC20 tokens. This feature ensures transparency and reliability by aggregating data from multiple independent node operators.
- The user interface is designed to be intuitive and easy to navigate. Default theme has been set to dark theme, following the trends of the latest DApps. 


## Installation

1. Contracts Deployment
Run the following commands.
``` 
  cd contracts
  npm install
  npx hardhat compile
  npx hardhat run --network sepolia ./scripts/deploy.ts 
  npx hardhat run --network sepolia ./scripts/deploy-stake.ts
```
The first deploy command will deploy the test ERC20 tokens such as LINK and USDC, and deploy the staking contract on Seplia testnet. The contract address will be printed out.

After deploying the contracts to Seplolia testnet, you can get test LINK tokens & sepolia ETH from the testnet faucet.

2. Frontend
Run the frontend by going into the client directory and running the commands below.

```bash
  cd client
  npm install
  npm run dev
```
    
## Languages, Libraries, Frameworks, and Tools

- Solidity
- Hardhat
- Chainlink Price Feeds
- React
- Wagmi
- TailwindCSS

