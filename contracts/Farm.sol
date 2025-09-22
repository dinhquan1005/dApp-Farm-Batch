// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Farm {
    struct FarmInfo {
        address owner;
        string gpsCoordinates;
        string productType;
        uint256 createdAt;
    }

    mapping(uint256 => FarmInfo) public farms;
    mapping(address => uint256[]) public ownerFarms;
    uint256 public farmCount;

    event FarmRegistered(uint256 indexed farmId, address indexed owner, string gpsCoordinates, string productType);

    function registerFarm(string memory _gpsCoordinates, string memory _productType) external returns (uint256) {
        require(bytes(_gpsCoordinates).length > 0, unicode"Cần tọa độ GPS");
        require(bytes(_productType).length > 0, unicode"Cần loại nông sản");

        farmCount++;
        farms[farmCount] = FarmInfo({
            owner: msg.sender,
            gpsCoordinates: _gpsCoordinates,
            productType: _productType,
            createdAt: block.timestamp
        });

        ownerFarms[msg.sender].push(farmCount);

        emit FarmRegistered(farmCount, msg.sender, _gpsCoordinates, _productType);
        return farmCount;
    }

    function getFarm(uint256 _farmId) external view returns (FarmInfo memory) {
        require(_farmId > 0 && _farmId <= farmCount, unicode"ID nông trại không hợp lệ");
        return farms[_farmId];
    }

    function getFarmsByOwner(address _owner) external view returns (uint256[] memory) {
        return ownerFarms[_owner];
    }

    function getFarmCount() external view returns (uint256) {
        return farmCount;
    }
}