// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract Chainlink is ERC20 {
    constructor() ERC20('Chainlink', 'LINK') {
        _mint(msg.sender, 5000 * 10 ** 18);
    }
}
