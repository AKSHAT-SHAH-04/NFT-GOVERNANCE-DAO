// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract treasury is Ownable {

receive() external payable{}

    constructor()  {
    }

 function balance() external view returns (uint256) {
  return address(this).balance;
 }

    function withdrawFunds(address pay, uint256 amount) public onlyOwner {
        // isReleased = true;
        payable(pay).transfer(amount);
    }
}