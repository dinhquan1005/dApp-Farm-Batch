const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Farm Contract - Self-made tests", function () {
  let Farm, farm;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Farm = await ethers.getContractFactory("Farm");
    farm = await Farm.deploy();
    await farm.waitForDeployment();
  });

  it("Should register a farm correctly", async function () {
    const tx = await farm.registerFarm("12.345,67.890", "Ngô");
    await tx.wait();

    const info = await farm.getFarm(1);
    expect(info.owner).to.equal(owner.address);
    expect(info.gpsCoordinates).to.equal("12.345,67.890");
    expect(info.productType).to.equal("Ngô");
  });

  it("Should reject empty GPS", async function () {
    await expect(farm.registerFarm("", "Ngô")).to.be.revertedWith("Cần tọa độ GPS");
  });

  it("Should reject empty product type", async function () {
    await expect(farm.registerFarm("12.345,67.890", "")).to.be.revertedWith("Cần loại nông sản");
  });

  it("Should get farms by owner", async function () {
    await farm.registerFarm("12.345,67.890", "Ngô");
    await farm.registerFarm("13.456,78.901", "Lúa");

    const farms = await farm.getFarmsByOwner(owner.address);
    expect(farms.length).to.equal(2);
  });

  it("Should get farm count correctly", async function () {
    await farm.registerFarm("12.345,67.890", "Ngô");
    const count = await farm.getFarmCount();
    expect(Number(count)).to.equal(1);
  });
});
