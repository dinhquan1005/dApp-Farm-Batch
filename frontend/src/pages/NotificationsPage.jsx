function NotificationsPage() {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Thông báo</h2>
      <div className="mb-6 flex items-center gap-2">
        <input className="border rounded p-2 flex-1" placeholder="Tìm kiếm thông báo..." />
        <span className="material-icons">search</span>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center gap-2"><span className="material-icons">notifications</span> Đơn hàng #1023 đã được xác nhận — <span className="text-gray-500">30 phút trước</span></li>
        <li className="flex items-center gap-2"><span className="material-icons">notifications</span> Đơn hàng #1022 đã giao thành công — <span className="text-gray-500">1 giờ trước</span></li>
        <li className="flex items-center gap-2"><span className="material-icons">notifications</span> Bạn có 1 tin nhắn mới — <span className="text-gray-500">Hôm qua</span></li>
      </ul>
    </div>
  );
}
export default NotificationsPage;
