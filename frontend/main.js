// main.js
let provider, signer;
let farmContract, batchContract;

// Contract addresses và ABI (cần tạo file contracts.json)
const CONTRACT_ADDRESSES = {
  farm: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Thay bằng địa chỉ thực
  batch: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"  // Thay bằng địa chỉ thực
};

// ABI cơ bản (thay bằng ABI thực từ contract)
const FARM_ABI = [
  "function registerFarm(string gpsCoordinates, string productType) external",
  "function getFarmCount() external view returns (uint256)",
  "function getFarm(uint256 farmId) external view returns (address owner, string gpsCoordinates, string productType, uint256 createdAt)"
];

const BATCH_ABI = [
  "function createBatch(uint256 farmId, string sowDate, string harvestDate, string fertilizerUsed, string pesticideUsed, string qrCode) external",
  "function getBatchCount() external view returns (uint256)",
  "function getBatch(uint256 batchId) external view returns (uint256 farmId, string sowDate, string harvestDate, string fertilizerUsed, string pesticideUsed, string qrCode, address owner, uint256 createdAt)"
];

const connectBtn = document.getElementById('connectBtn');
const accountP = document.getElementById('account');
const networkP = document.getElementById('network');

connectBtn.onclick = connectMetaMask;

async function connectMetaMask() {
  try {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask!");
      return;
    }

    // Yêu cầu kết nối tài khoản
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Tạo provider và signer
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    // Hiển thị thông tin tài khoản
    const address = await signer.getAddress();
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    accountP.innerText = `Đã kết nối: ${shortAddress}`;
    accountP.style.color = 'green';

    // Hiển thị network
    const network = await provider.getNetwork();
    networkP.innerText = `Network: ${network.name} (Chain ID: ${network.chainId})`;

    // Khởi tạo contract
    farmContract = new ethers.Contract(CONTRACT_ADDRESSES.farm, FARM_ABI, signer);
    batchContract = new ethers.Contract(CONTRACT_ADDRESSES.batch, BATCH_ABI, signer);

    // Load dữ liệu
    await loadFarms();
    await loadBatches();

    // Thêm event listener cho network change
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    // Thêm event listener cho account change
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        accountP.innerText = 'Chưa kết nối';
        accountP.style.color = 'red';
      } else {
        window.location.reload();
      }
    });

  } catch (error) {
    console.error('Lỗi kết nối MetaMask:', error);
    alert('Lỗi kết nối: ' + error.message);
  }
}

async function loadFarms() {
  try {
    const farmCount = Number(await farmContract.getFarmCount());
    const farmList = document.getElementById('farmList');
    farmList.innerHTML = '';

    if (farmCount === 0) {
      farmList.innerHTML = '<p>Chưa có farm nào</p>';
      return;
    }

    for (let i = 1; i <= farmCount; i++) {
      try {
        const farm = await farmContract.getFarm(i);
        const div = document.createElement('div');
        div.className = 'farm';
        div.innerHTML = `
          <strong>Farm ID: ${i}</strong><br>
          Chủ sở hữu: ${farm.owner}<br>
          GPS: ${farm.gpsCoordinates}<br>
          Loại nông sản: ${farm.productType}<br>
          Ngày tạo: ${new Date(Number(farm.createdAt) * 1000).toLocaleDateString('vi-VN')}
        `;
        farmList.appendChild(div);
      } catch (error) {
        console.error(`Lỗi load farm ${i}:`, error);
      }
    }
  } catch (error) {
    console.error('Lỗi load farms:', error);
  }
}

async function loadBatches() {
  try {
    const batchCount = Number(await batchContract.getBatchCount());
    const batchList = document.getElementById('batchList');
    batchList.innerHTML = '';

    if (batchCount === 0) {
      batchList.innerHTML = '<p>Chưa có batch nào</p>';
      return;
    }

    for (let i = 1; i <= batchCount; i++) {
      try {
        const batch = await batchContract.getBatch(i);
        const div = document.createElement('div');
        div.className = 'batch';
        div.innerHTML = `
          <strong>Batch ID: ${i}</strong><br>
          Farm ID: ${batch.farmId}<br>
          Ngày gieo: ${batch.sowDate}<br>
          Ngày thu hoạch: ${batch.harvestDate}<br>
          Phân bón: ${batch.fertilizerUsed}<br>
          Thuốc BVTV: ${batch.pesticideUsed}<br>
          QR Code: ${batch.qrCode}<br>
          Ngày tạo: ${new Date(Number(batch.createdAt) * 1000).toLocaleDateString('vi-VN')}
        `;
        batchList.appendChild(div);
      } catch (error) {
        console.error(`Lỗi load batch ${i}:`, error);
      }
    }
  } catch (error) {
    console.error('Lỗi load batches:', error);
  }
}

// Thêm farm mới
document.getElementById('addFarmBtn').onclick = async () => {
  try {
    if (!farmContract) {
      alert('Vui lòng kết nối MetaMask trước!');
      return;
    }

    const gps = document.getElementById('gps').value.trim();
    const product = document.getElementById('product').value.trim();

    if (!gps || !product) {
      alert("Vui lòng nhập đủ thông tin GPS và loại nông sản");
      return;
    }

    const tx = await farmContract.registerFarm(gps, product);
    document.getElementById('addFarmBtn').disabled = true;
    document.getElementById('addFarmBtn').textContent = 'Đang xử lý...';

    await tx.wait();
    
    // Reset form
    document.getElementById('gps').value = '';
    document.getElementById('product').value = '';
    
    // Reload data
    await loadFarms();
    
    alert('Thêm farm thành công!');
    
  } catch (error) {
    console.error('Lỗi thêm farm:', error);
    alert('Lỗi: ' + error.message);
  } finally {
    document.getElementById('addFarmBtn').disabled = false;
    document.getElementById('addFarmBtn').textContent = 'Thêm Farm';
  }
};

// Thêm batch mới
document.getElementById('addBatchBtn').onclick = async () => {
  try {
    if (!batchContract) {
      alert('Vui lòng kết nối MetaMask trước!');
      return;
    }

    const farmId = Number(document.getElementById('farmId').value);
    const sowDate = document.getElementById('sowDate').value.trim();
    const harvestDate = document.getElementById('harvestDate').value.trim();
    const fertilizer = document.getElementById('fertilizer').value.trim();
    const pesticide = document.getElementById('pesticide').value.trim();
    const qr = document.getElementById('qr').value.trim();

    if (!farmId || !sowDate || !harvestDate || !fertilizer || !pesticide || !qr) {
      alert("Vui lòng nhập đầy đủ thông tin batch");
      return;
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(sowDate) || !dateRegex.test(harvestDate)) {
      alert("Vui lòng nhập ngày theo định dạng YYYY-MM-DD");
      return;
    }

    const tx = await batchContract.createBatch(farmId, sowDate, harvestDate, fertilizer, pesticide, qr);
    document.getElementById('addBatchBtn').disabled = true;
    document.getElementById('addBatchBtn').textContent = 'Đang xử lý...';

    await tx.wait();
    
    // Reset form
    document.getElementById('farmId').value = '';
    document.getElementById('sowDate').value = '';
    document.getElementById('harvestDate').value = '';
    document.getElementById('fertilizer').value = '';
    document.getElementById('pesticide').value = '';
    document.getElementById('qr').value = '';
    
    // Reload data
    await loadBatches();
    
    alert('Thêm batch thành công!');
    
  } catch (error) {
    console.error('Lỗi thêm batch:', error);
    alert('Lỗi: ' + error.message);
  } finally {
    document.getElementById('addBatchBtn').disabled = false;
    document.getElementById('addBatchBtn').textContent = 'Thêm Batch';
  }
};

// Tự động kết nối nếu đã kết nối trước đó
window.addEventListener('load', async () => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    await connectMetaMask();
  }
});