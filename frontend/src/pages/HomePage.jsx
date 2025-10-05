function HomePage() {
  return (
    <div className="home-hero">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Minh bạch từ ruộng đến bàn ăn — chỉ với một cú quét QR</h1>
      <div className="flex gap-6 items-center justify-center flex-wrap">
        {/* Thay src bằng đường dẫn ảnh thực tế nếu có */}
        <img src="/logo.png" alt="Agritrace Zero Logo" className="h-24" />
        <img src="/farm.png" alt="Farm" className="h-24" />
        <img src="/qrcode.png" alt="QR Code" className="h-24" />
        <img src="/blockchain.png" alt="Blockchain" className="h-24" />
      </div>
    </div>
  );
}
export default HomePage;
