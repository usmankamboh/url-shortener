// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract URLRegistry {
    mapping(string => address) public urlOwners;
    mapping(address => string[]) public userUrls;

    function registerURL(string memory shortCode) public {
        urlOwners[shortCode] = msg.sender;
        userUrls[msg.sender].push(shortCode);
    }
}
