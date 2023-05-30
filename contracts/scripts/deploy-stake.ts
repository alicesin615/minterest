import { ethers, upgrades } from 'hardhat';
import '@openzeppelin/hardhat-upgrades';

async function main() {
    const [deployer] = await ethers.getSigners();

    const Stake = await ethers.getContractFactory('Stake', deployer);

    console.log('Deploying Stake Contract...');
    const stake = await Stake.deploy(1900, {
        value: ethers.utils.parseEther('0.000000000000001')
    });
    console.log('Stake contract deployed');

    const Chainlink = await ethers.getContractFactory('Chainlink', deployer);
    const chainlink = await Chainlink.deploy();
    console.log('Chainlink contract deployed');

    const UsdCoin = await ethers.getContractFactory('UsdCoin', deployer);
    const usdCoin = await UsdCoin.deploy();

    await stake
        .connect(deployer)
        .addToken('Chainlink', 'LINK', chainlink.address, 867, 1500);

    await stake
        .connect(deployer)
        .addToken('UsdCoin', 'USDC', usdCoin.address, 100, 200);

    console.log('Staking:', stake.address);
    console.log('Chainlink:', chainlink.address);
    console.log('UsdCoin:', usdCoin.address);

    await chainlink
        .connect(deployer)
        .approve(stake.address, ethers.utils.parseEther('0.000000000000001'));
    await stake
        .connect(deployer)
        .stakeTokens('LINK', ethers.utils.parseEther('0.000000000000001'));

    await chainlink
        .connect(deployer)
        .approve(stake.address, ethers.utils.parseEther('0.000000000000001'));
    await stake
        .connect(deployer)
        .stakeTokens('USDC', ethers.utils.parseEther('0.000000000000001'));

    await stake.deployed();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
