const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Batch Contract - Self-made tests", function () {
  let Farm, Batch;
  let farm, batch;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Triển khai hợp đồng Farm trước
    Farm = await ethers.getContractFactory("Farm");
    farm = await Farm.deploy();
    await farm.waitForDeployment();

    // Triển khai hợp đồng Batch
    Batch = await ethers.getContractFactory("Batch");
    batch = await Batch.deploy();
    await batch.waitForDeployment();

    // Đăng ký 1 nông trại để dùng cho batch
    await farm.registerFarm("10.111,20.222", "Lúa");
  });

  it("Should create a batch successfully", async function () {
    const tx = await batch.createBatch(
      1,                      // farmId
      "2025-01-01",           // sowingDate
      "2025-04-01",           // harvestDate
      "NPK Organic",           // fertilizers
      "Neem Oil",             // pesticides
      "qr_test_001"           // qrHash
    );
    await tx.wait();

    const info = await batch.getBatch(1);
    expect(Number(info.farmId)).to.equal(1);
    expect(info.sowingDate).to.equal("2025-01-01");
    expect(info.harvestDate).to.equal("2025-04-01");
    expect(info.fertilizers).to.equal("NPK Organic");
    expect(info.pesticides).to.equal("Neem Oil");
    expect(info.qrHash).to.equal("qr_test_001");
  });

  it("Should emit BatchCreated event", async function () {
    await expect(batch.createBatch(
      1, "2025-01-01", "2025-04-01", "NPK Organic", "Neem Oil", "qr_test_002"
    ))
      .to.emit(batch, "BatchCreated")
      .withArgs(1, 1, "2025-01-01", "2025-04-01", "qr_test_002", owner.address);
  });

  it("Should reject duplicate QR hash", async function () {
    await batch.createBatch(1, "2025-01-01", "2025-04-01", "NPK Organic", "Neem Oil", "qr_dup");
    await expect(batch.createBatch(1, "2025-02-01", "2025-05-01", "NPK", "Chemical", "qr_dup"))
      .to.be.revertedWith("Mã QR đã tồn tại");
  });

  it("Should get batch by QR hash", async function () {
    await batch.createBatch(1, "2025-01-01", "2025-04-01", "NPK Organic", "Neem Oil", "qr_lookup");
    const info = await batch.getBatchByQR("qr_lookup");
    expect(info.fertilizers).to.equal("NPK Organic");
    expect(info.pesticides).to.equal("Neem Oil");
  });

  it("Should get batches by farm", async function () {
    await batch.createBatch(1, "2025-01-01", "2025-04-01", "NPK Organic", "Neem Oil", "qr1");
    await batch.createBatch(1, "2025-02-01", "2025-05-01", "NPK", "Chemical", "qr2");

    const batchIds = await batch.getBatchesByFarm(1);
    expect(batchIds.length).to.equal(2);
    expect(Number(batchIds[0])).to.equal(1);
    expect(Number(batchIds[1])).to.equal(2);
  });

  it("Should return correct batch count", async function () {
    await batch.createBatch(1, "2025-01-01", "2025-04-01", "NPK Organic", "Neem Oil", "qr_count");
    const count = await batch.getBatchCount();
    expect(Number(count)).to.equal(1);
  });
});
