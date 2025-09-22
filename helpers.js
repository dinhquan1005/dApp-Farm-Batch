// helpers.js
import { ethers } from "ethers";
import batchABI from "./BatchABI.json";
import contracts from "./contracts.json";
import farmABI from "./FarmABI.json";

let provider, signer, farmContract, batchContract;

/**
 * Khởi tạo kết nối MetaMask và contract
 * @param {window.ethereum} ethereumProvider
 */
export async function init(ethereumProvider) {
  if (!ethereumProvider) throw new Error("MetaMask chưa cài đặt");

  provider = new ethers.BrowserProvider(ethereumProvider);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  // Kết nối contract Farm & Batch
  farmContract = new ethers.Contract(contracts.farm, farmABI, signer);
  batchContract = new ethers.Contract(contracts.batch, batchABI, signer);
}

/**
 * Đăng ký nông trại
 * @param {string} gpsCoordinates
 * @param {string} productType
 */
export async function registerFarm(gpsCoordinates, productType) {
  if (!farmContract) throw new Error("Contract chưa khởi tạo");
  const tx = await farmContract.registerFarm(gpsCoordinates, productType);
  await tx.wait();
}

/**
 * Lấy thông tin nông trại theo ID
 * @param {number} farmId
 */
export async function getFarmInfo(farmId) {
  if (!farmContract) throw new Error("Contract chưa khởi tạo");
  return await farmContract.getFarm(farmId);
}

/**
 * Tạo lô hàng
 * @param {number} farmId
 * @param {string} sowingDate
 * @param {string} harvestDate
 * @param {string} fertilizers
 * @param {string} pesticides
 * @param {string} qrHash
 */
export async function createBatch(farmId, sowingDate, harvestDate, fertilizers, pesticides, qrHash) {
  if (!batchContract) throw new Error("Contract chưa khởi tạo");
  const tx = await batchContract.createBatch(farmId, sowingDate, harvestDate, fertilizers, pesticides, qrHash);
  await tx.wait();
}

/**
 * Lấy thông tin lô hàng theo ID
 * @param {number} batchId
 */
export async function getBatchInfo(batchId) {
  if (!batchContract) throw new Error("Contract chưa khởi tạo");
  return await batchContract.getBatch(batchId);
}

/**
 * Lấy thông tin lô hàng theo QR hash
 * @param {string} qrHash
 */
export async function getBatchByQR(qrHash) {
  if (!batchContract) throw new Error("Contract chưa khởi tạo");
  return await batchContract.getBatchByQR(qrHash);
}
