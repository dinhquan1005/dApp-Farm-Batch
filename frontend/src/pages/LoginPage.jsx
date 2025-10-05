function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-green-50">
        <img src="/logo.png" alt="Agritrace Zero Logo" className="h-32" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
        <input className="border rounded p-2 mb-2 w-64" placeholder="Email hoặc số điện thoại" />
        <input className="border rounded p-2 mb-2 w-64" type="password" placeholder="Mật khẩu" />
        <a href="#" className="text-blue-600 text-sm mb-2">Quên mật khẩu?</a>
        <button className="bg-yellow-700 text-white px-4 py-2 rounded w-64 mb-2">Đăng nhập</button>
        <button className="bg-yellow-700 text-white px-4 py-2 rounded w-64 mb-4">Đăng kí</button>
        <div className="flex gap-4">
          <span className="material-icons">facebook</span>
          <span className="material-icons">instagram</span>
          <span className="material-icons">google</span>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
