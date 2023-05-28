// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import 'hardhat/console.sol';

contract PriceFeed is Initializable {
    address private admin;

    function initialize(address _admin) public initializer {
        admin = _admin;
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    function getPrice(address feed) public view returns (int, uint) {
        AggregatorV3Interface aggregator = AggregatorV3Interface(feed);
        (
            ,
            /* uint80 roundID */ int price /*uint startedAt*/,
            ,
            uint timeStamp, // uint80 answeredInRound

        ) = aggregator.latestRoundData();
        return (price, timeStamp);
    }
}
