require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

const { POLYGON_API_URL, PRIVATE_KEY, POLYGON_SCAN_KEY } = process.env;

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      gas: 1200000000,
      gasPrice: 8000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    // mumbai: {
    //   url: POLYGON_API_URL,
    //   accounts: {
    //     mnemonic: PRIVATE_KEY,
    //   },
    // },
  rinkeby: {
    url: "https://rinkeby.infura.io/v3/bdc4654092594165bb49db751678af50",
    accounts: {
      mnemonic: PRIVATE_KEY,
    }
  }
  },

  etherscan: {
    apiKey: process.env.RINKEBY_SCAN_KEY,
  },
};