

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FarmListPage from "./pages/FarmListPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import QRCodePage from "./pages/QRCodePage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Router>
      <header className="bg-green-100 shadow">
        <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <div className="flex gap-6 items-center">
            <span className="font-bold text-xl text-green-800">Agritrace Zero</span>
            <Link to="/" className="hover:text-green-700">Trang chủ</Link>
            <Link to="/trang-trai" className="hover:text-green-700">Trang trại</Link>
            <Link to="/marketplace-p2p" className="hover:text-green-700">Marketplace P2P</Link>
            <Link to="/thong-bao" className="hover:text-green-700">Thông báo</Link>
            <Link to="/ho-so" className="hover:text-green-700">Hồ sơ</Link>
            <Link to="/qr-code" className="hover:text-green-700">QR code</Link>
          </div>
          <Link to="/ng-nhp">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Đăng nhập</button>
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trang-trai" element={<FarmListPage />} />
          <Route path="/marketplace-p2p" element={<MarketplacePage />} />
          <Route path="/thong-bao" element={<NotificationsPage />} />
          <Route path="/ho-so" element={<ProfilePage />} />
          <Route path="/qr-code" element={<QRCodePage />} />
          <Route path="/ng-nhp" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
