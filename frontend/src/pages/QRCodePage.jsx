function QRCodePage() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Scan QR Page</h2>
      <div className="relative w-64 h-64 mb-4">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black"></div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">QR của bạn</button>
      <div className="flex gap-4 mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2"><span className="material-icons">image</span> Chọn ảnh mã QR</button>
        <button className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2"><span className="material-icons">history</span> Lịch sử</button>
      </div>
      <span className="fixed bottom-8 right-8 bg-yellow-200 rounded-full p-3 shadow cursor-pointer" title="Trợ giúp">?</span>
    </div>
  );
}
export default QRCodePage;
