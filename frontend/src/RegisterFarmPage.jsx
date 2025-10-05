import { useState } from "react";

function RegisterFarmPage() {
  const [owner, setOwner] = useState("");
  const [gps, setGps] = useState("");
  const [cropType, setCropType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký trang trại ở đây
    alert(`Chủ: ${owner}\nGPS: ${gps}\nLoại: ${cropType}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đăng ký Trang trại</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Tên chủ trang trại"
          value={owner}
          onChange={e => setOwner(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="GPS (lat,long)"
          value={gps}
          onChange={e => setGps(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Loại nông sản"
          value={cropType}
          onChange={e => setCropType(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default RegisterFarmPage;