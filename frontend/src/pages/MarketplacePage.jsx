function MarketplacePage() {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="material-icons">store</span> Marketplace P2P</h2>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input className="border rounded p-2" placeholder="Tên sản phẩm" />
        <input className="border rounded p-2" placeholder="Loại sản phẩm" />
        <input className="border rounded p-2" placeholder="Trang trại" />
        <input className="border rounded p-2" placeholder="Khoảng giá" />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="font-bold">Ngô vàng</div>
          <div>Trang trại A</div>
          <div>30.000đ/kg</div>
          <span className="material-icons">shopping_cart</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="font-bold">Dâu tây</div>
          <div>Trang trại B</div>
          <div>120.000đ/kg</div>
          <span className="material-icons">shopping_cart</span>
        </div>
      </div>
    </div>
  );
}
export default MarketplacePage;
