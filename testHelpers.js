// testHelpers.js
require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Delay helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  try {
    console.log("🟡 Bắt đầu chạy tests...");

    // 🔑 Lấy PRIVATE_KEY & RPC_URL từ .env
    const PRIVATE_KEY = process.env.PRIVATE_KEY;   // ví Pione testnet
    const RPC_URL = process.env.PIONE_URL;         // RPC Pione testnet

    if (!PRIVATE_KEY || !RPC_URL) throw new Error("Vui lòng kiểm tra PRIVATE_KEY và PIONE_URL trong .env");

    // Load ABI + contract address
    const farmABI = JSON.parse(fs.readFileSync(path.join(__dirname, "FarmABI.json")));
    const batchABI = JSON.parse(fs.readFileSync(path.join(__dirname, "BatchABI.json")));
    const contracts = JSON.parse(fs.readFileSync(path.join(__dirname, "contracts.json")));

    // Kết nối provider + wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const balance = await provider.getBalance(wallet.address);
    console.log("✅ Wallet:", wallet.address);
    console.log("✅ Balance:", ethers.formatEther(balance), "ETH");

    if (balance === 0n) throw new Error("Wallet không có ETH để thực hiện transaction");

    // Contract instances
    const farmRead = new ethers.Contract(contracts.farm, farmABI, provider);
    const batchRead = new ethers.Contract(contracts.batch, batchABI, provider);
    const farmWrite = new ethers.Contract(contracts.farm, farmABI, wallet);
    const batchWrite = new ethers.Contract(contracts.batch, batchABI, wallet);

    console.log("✅ Đã tạo contract instances");

    // Lấy farm hiện có
    const farmCount = Number(await farmRead.getFarmCount());
    console.log(`📊 Số farm hiện có: ${farmCount}`);
    for (let id = 1; id <= farmCount; id++) {
      const f = await farmRead.getFarm(id);
      console.log(`Farm ${id}:`, f);
    }

    // Lấy batch hiện có
    const batchCount = Number(await batchRead.getBatchCount());
    console.log(`📊 Số batch hiện có: ${batchCount}`);
    for (let id = 1; id <= batchCount; id++) {
      const b = await batchRead.getBatch(id);
      console.log(`Batch ${id}:`, b);
    }

    // Tạo farm mới
    console.log("🟡 Tạo farm mới...");
    const txFarm = await farmWrite.registerFarm("12.345,67.890", "Ngô", {
      gasLimit: 5_000_000,
      gasPrice: ethers.parseUnits("1", "gwei")
    });
    await txFarm.wait();
    console.log("✅ Farm mới tạo xong");

    await delay(1000); // đợi nonce cập nhật

    // Tạo batch mới
    console.log("🟡 Tạo batch mới...");
    const txBatch = await batchWrite.createBatch(
      farmCount + 1,
      "2025-03-01",
      "2025-06-01",
      "NPK",
      "Neem Oil",
      "qr_test1",
      { gasLimit: 5_000_000, gasPrice: ethers.parseUnits("1", "gwei") }
    );
    await txBatch.wait();
    console.log("✅ Batch mới tạo xong");

    console.log("🎉 All tests done!");
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  }
}

runTests();
