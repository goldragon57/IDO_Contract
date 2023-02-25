require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

real_accounts = undefined;
if (process.env.PRIVATE_KEY) {
  real_accounts = [process.env.PRIVATE_KEY];
}
const alchemyApiKey = process.env.ALCHEMY_API_KEY ?? "NO_ALCHEMY_API_KEY";

const apiKey = process.env.IS_AVALANCHE == "True" ? process.env.AVALANCHE_API_KEY : process.env.BSCSCAN_API_KEY

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialDate: "2021-04-04T00:00:00.000+00:00",
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      tags: ["ido", "presale", "test"],
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`,
      tags: ["ido", "presale", "test"],
      chainId: 3,
      accounts: real_accounts,
      gas: 2100000,
      gasPrice: 8000000000
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      tags: ["ido", "presale", "test"],
      chainId: 4,
      accounts: real_accounts,
      gas: 2100000,
      gasPrice: 8000000000
    },
    testnet: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: real_accounts,
      gas: 'auto',
      gasPrice: 25000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    mainnet: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      chainId: 43114,
      accounts: real_accounts,
      gas: 'auto',
      gasPrice: 25000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: real_accounts,
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: apiKey,
  },
};
