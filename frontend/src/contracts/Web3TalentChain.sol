// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3TalentChain {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event RewardSent(address indexed from, address indexed to, uint256 amount);

    function sendReward(address payable recipient) external payable {
        require(msg.value > 0, "Send some ETH");
        recipient.transfer(msg.value);
        emit RewardSent(msg.sender, recipient, msg.value);
    }

    // For contract balance check (optional)
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
