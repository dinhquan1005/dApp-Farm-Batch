require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PIONE_URL = process.env.PIONE_URL || "";
const LOCAL_RPC = process.env.LOCAL_RPC || "http://127.0.0.1:8545";

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    hardhat: { chainId: 31337 },
    localhost: { url: LOCAL_RPC, chainId: 31337 },
    pioneTestnet: {
      url: PIONE_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5080,
    },
  },
};
