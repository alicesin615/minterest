import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config({ path: '../../Minterest/.env' });

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
    solidity: '0.8.19',
    paths: {
        artifacts: '../app/src/artifacts'
    },
    networks: {
        hardhat: {
            chainId: 1337 // avoid metamask error
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
            // accounts: {},
            chainId: 1
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            // accounts: {},
            chainId: 11155111
        }
    },
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY
        }
    }
};

export default config;
