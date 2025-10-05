import { useState } from "react";

function CreateBatchPage() {
  const [sowDate, setSowDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [pesticide, setPesticide] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý tạo lô hàng ở đây
    alert(`Ngày gieo: ${sowDate}\nNgày thu hoạch: ${harvestDate}\nPhân bón: ${fertilizer}\nThuốc BVTV: ${pesticide}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thêm Lô Hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={sowDate}
          onChange={e => setSowDate(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={harvestDate}
          onChange={e => setHarvestDate(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Phân bón"
          value={fertilizer}
          onChange={e => setFertilizer(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Thuốc BVTV"
          value={pesticide}
          onChange={e => setPesticide(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">
          Thêm lô hàng
        </button>
      </form>
    </div>
  );
}

export default CreateBatchPage;