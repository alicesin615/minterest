import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const PriceConsumer = await ethers.getContractFactory('PriceConsumer');
    const priceConsumer = await PriceConsumer.deploy();

    const latestPrice = await priceConsumer.getLatestPrice();
    console.log('Latest Price:', latestPrice);
    // const [owner] = await ethers.getSigners();

    // const Stake = await ethers.getContractFactory('Stake', owner);

    // const stake = await Stake.deploy(179012, {
    //     value: ethers.utils.parseEther('100')
    // });

    // const Chainlink = await ethers.getContractFactory('Chainlink', owner);
    // const chainlink = await Chainlink.deploy();
    // await stake
    //     .connect(owner)
    //     .addToken('Chainlink', 'LINK', chainlink.address, 867, 1500);

    // console.log('Stake:', stake.address);
    // console.log('Chainlink:', chainlink.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
