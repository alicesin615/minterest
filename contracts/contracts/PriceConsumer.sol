// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Sepolia
     * Aggregator: LINK/USD
     * Address: 0xc59E3633BAAC79493d908e63626716e204A45EdF
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0xc59E3633BAAC79493d908e63626716e204A45EdF
        );
    }

    function getLatestPrice() public view returns (int) {
        (, /* uint80 roundID */ int price, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        priceFeed.latestRoundData();
        return price;
    }
}
