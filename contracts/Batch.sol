// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Batch {
    struct BatchInfo {
        uint256 farmId;
        string sowingDate;
        string harvestDate;
        string fertilizers;
        string pesticides;
        string qrHash;
        address owner;
        uint256 createdAt;
    }

    mapping(uint256 => BatchInfo) public batches;
    mapping(uint256 => uint256[]) public farmBatches;
    mapping(string => uint256) public qrToBatchId;
    uint256 public batchCount;

    event BatchCreated(
        uint256 indexed batchId,
        uint256 indexed farmId,
        string sowingDate,
        string harvestDate,
        string qrHash,
        address indexed owner
    );

    function createBatch(
        uint256 _farmId,
        string memory _sowingDate,
        string memory _harvestDate,
        string memory _fertilizers,
        string memory _pesticides,
        string memory _qrHash
    ) external returns (uint256) {
        require(_farmId > 0, unicode"Cần ID nông trại hợp lệ");
        require(bytes(_sowingDate).length > 0, unicode"Cần ngày gieo trồng");
        require(bytes(_qrHash).length > 0, unicode"Cần mã QR hash");
        require(qrToBatchId[_qrHash] == 0, unicode"Mã QR đã tồn tại");

        batchCount++;
        batches[batchCount] = BatchInfo({
            farmId: _farmId,
            sowingDate: _sowingDate,
            harvestDate: _harvestDate,
            fertilizers: _fertilizers,
            pesticides: _pesticides,
            qrHash: _qrHash,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        farmBatches[_farmId].push(batchCount);
        qrToBatchId[_qrHash] = batchCount;

        emit BatchCreated(batchCount, _farmId, _sowingDate, _harvestDate, _qrHash, msg.sender);
        return batchCount;
    }

    function getBatch(uint256 _batchId) external view returns (BatchInfo memory) {
        require(_batchId > 0 && _batchId <= batchCount, unicode"ID lô hàng không hợp lệ");
        return batches[_batchId];
    }

    function getBatchByQR(string memory _qrHash) external view returns (BatchInfo memory) {
        uint256 batchId = qrToBatchId[_qrHash];
        require(batchId > 0, unicode"Không tìm thấy lô hàng với mã QR này");
        return batches[batchId];
    }

    function getBatchesByFarm(uint256 _farmId) external view returns (uint256[] memory) {
        return farmBatches[_farmId];
    }

    function getBatchCount() external view returns (uint256) {
        return batchCount;
    }
}