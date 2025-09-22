// scripts/deploy.js
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const provider = deployer.provider;
  const balance = await provider.getBalance(deployer.address);
  console.log("Triển khai với tài khoản:", deployer.address);
  console.log("Số dư:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) throw new Error("Ví không có token testnet đủ để deploy");

  // Deploy Farm
  const Farm = await ethers.getContractFactory("Farm", deployer);
  const farm = await Farm.deploy({
    gasLimit: 5_000_000,
    gasPrice: ethers.parseUnits("1", "gwei"),
  });
  await farm.waitForDeployment();
  console.log("Farm deployed tại:", farm.target);

  // Deploy Batch
  const Batch = await ethers.getContractFactory("Batch", deployer);
  const batch = await Batch.deploy({
    gasLimit: 5_000_000,
    gasPrice: ethers.parseUnits("1", "gwei"),
  });
  await batch.waitForDeployment();
  console.log("Batch deployed tại:", batch.target);

  // Lưu address contract
  const contracts = {
    farm: farm.target,
    batch: batch.target,
    network: (await provider.getNetwork()).name,
  };
  fs.writeFileSync("contracts.json", JSON.stringify(contracts, null, 2));
  console.log("✅ contracts.json đã lưu");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
