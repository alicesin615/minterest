import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config({ path: '../../Minterest/contracts/.env' });

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
    solidity: '0.8.19',
    paths: {
        artifacts: '../client/src/artifacts'
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
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
            chainId: 11155111
        }
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY
        }
    }
};

export default config;
