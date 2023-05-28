import { ethers, upgrades } from 'hardhat';
import '@openzeppelin/hardhat-upgrades';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const PriceFeed = await ethers.getContractFactory('PriceFeed');

    // Deploy implementation contract
    // console.log('Deploying PriceFeed Contract...');
    // const priceFeed = await upgrades.deployProxy(
    //     PriceFeed,
    //     [deployer],
    //     {
    //         initializer: 'initialize'
    //     }
    // );
    // console.log('Price feed deployed to:', priceFeed.address);
    // await priceFeed.deployed();

    // Upgrade proxy contract
    const deployedProxyAddress = '0x17A7A2A8FA089Cb8764322c62B89FA44e54d2983';
    const priceFeed = await upgrades.upgradeProxy(
        deployedProxyAddress,
        PriceFeed
    );
    console.log('Upgrading Price Feed Contract...');
    console.log('Price feed upgraded at:', priceFeed.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
