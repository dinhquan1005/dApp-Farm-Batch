// Mock data
const farms = [
  { id: "001", name: "Trang trại A", owner: "Nguyễn Văn A", location: "Hà Nội", crop: "Rau sạch" },
  { id: "002", name: "Trang trại B", owner: "Trần Thị B", location: "Đà Lạt", crop: "Dâu tây" },
  { id: "003", name: "Trang trại C", owner: "Lê Văn C", location: "Cần Thơ", crop: "Lúa gạo" }
];
const products = [
  { name: "Ngô vàng", price: "30.000đ/kg", farm: "Trang trại A", type: "Ngô" },
  { name: "Dâu tây", price: "120.000đ/kg", farm: "Trang trại B", type: "Dâu" },
  { name: "Rau cải", price: "20.000đ/kg", farm: "Trang trại A", type: "Rau" }
];
const notifications = [
  { text: "Đơn hàng #1023 đã được xác nhận", time: "30 phút trước" },
  { text: "Đơn hàng #1022 đã giao thành công", time: "1 giờ trước" },
  { text: "Bạn có 1 tin nhắn mới", time: "Hôm qua" }
];
const userMock = { email: "user@example.com", password: "123456", name: "Nguyễn Văn A", phone: "0123456789" };

// Helper
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}
function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}
function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  window.location.href = "ng-nhp.html";
}
function requireLogin() {
  if (!isLoggedIn()) window.location.href = "ng-nhp.html";
}
