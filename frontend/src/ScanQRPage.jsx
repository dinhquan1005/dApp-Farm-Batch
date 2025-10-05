import { useState } from "react";

function ScanQRPage() {
  const [qr, setQr] = useState("");
  const [batchInfo, setBatchInfo] = useState(null);

  const handleSearch = () => {
    // Giả lập lấy thông tin lô hàng từ QR/hash
    setBatchInfo({
      sowDate: "2025-10-01",
      harvestDate: "2025-12-01",
      fertilizer: "NPK",
      pesticide: "An toàn"
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Quét QR & Hiển thị thông tin</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Nhập mã QR hoặc hash"
          value={qr}
          onChange={e => setQr(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
          Tra cứu
        </button>
      </div>
      {batchInfo && (
        <div className="bg-gray-100 p-4 rounded">
          <div>Ngày gieo: {batchInfo.sowDate}</div>
          <div>Ngày thu hoạch: {batchInfo.harvestDate}</div>
          <div>Phân bón: {batchInfo.fertilizer}</div>
          <div>Thuốc BVTV: {batchInfo.pesticide}</div>
        </div>
      )}
    </div>
  );
}

export default ScanQRPage;