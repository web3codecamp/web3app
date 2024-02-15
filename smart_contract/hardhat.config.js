//https://eth-sepolia.g.alchemy.com/v2/qcXr-upb32xX9ePiRl6eSn2d6Dwio6ij

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/qcXr-upb32xX9ePiRl6eSn2d6Dwio6ij',
      accounts: [ 'fcc34ee8e2732e4419c79cef0c9ec8c1bac9d66cf6738b88047102864394f09e' ]
    }
  }
};
