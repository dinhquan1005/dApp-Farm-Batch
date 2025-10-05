function FarmListPage() {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách trang trại</h2>
      <div className="mb-6 flex items-center gap-2">
        <input className="border rounded p-2 flex-1" placeholder="Tìm kiếm trang trại..." />
        <span className="material-icons">search</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card mẫu */}
        <div className="bg-yellow-50 rounded-lg p-4 shadow">
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Tên: Trang trại A</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Chủ: Nguyễn Văn A</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Địa điểm: Hà Nội</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Loại: Rau sạch</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1">ID: 001</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 shadow">
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Tên: Trang trại B</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Chủ: Trần Thị B</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Địa điểm: Đà Lạt</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Loại: Dâu tây</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1">ID: 002</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 shadow">
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Tên: Trang trại C</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Chủ: Lê Văn C</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Địa điểm: Cần Thơ</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1 mb-2">Loại: Lúa gạo</div>
          <div className="rounded-full bg-yellow-200 px-3 py-1">ID: 003</div>
        </div>
      </div>
    </div>
  );
}
export default FarmListPage;
