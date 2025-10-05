function ProfilePage() {
  return (
    <div className="container mx-auto p-8 max-w-lg">
      <div className="flex flex-col items-center mb-6">
        <img src="/avatar-placeholder.png" alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
        <div className="font-bold text-lg">Nguyễn Văn A</div>
        <div className="text-gray-600">user@email.com</div>
        <div className="text-gray-600">0123456789</div>
      </div>
      <div className="mb-4">
        <details>
          <summary className="cursor-pointer font-semibold">Thông tin trang trại</summary>
          <div className="pl-4">Tên: Trang trại A, Địa điểm: Hà Nội, Loại: Rau sạch</div>
        </details>
        <details>
          <summary className="cursor-pointer font-semibold">Quản lý tài khoản</summary>
          <div className="pl-4">Đổi mật khẩu, Xóa tài khoản</div>
        </details>
      </div>
      <button className="bg-red-600 text-white px-4 py-2 rounded absolute right-8 bottom-8">Đăng xuất</button>
      <footer className="flex justify-between mt-8 text-sm text-gray-500">
        <span>Terms & Support</span>
        <span>Designed with Canva</span>
      </footer>
    </div>
  );
}
export default ProfilePage;
