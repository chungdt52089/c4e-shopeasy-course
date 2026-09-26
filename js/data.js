// Danh sách sản phẩm (dữ liệu cố định), cái này lưu vào RAM, không lưu vào localStorage
const products = [
  {
    id: 1,
    name: "Tay cầm HAVIT HV-G92",
    category: "Gaming",
    price: 490000,
    img: "img/p1.jpg",
    desc: "Tay cầm có dây, rung kép, cắm là chơi trên PC.",
  },
  {
    id: 2,
    name: "Bàn phím AK-900 có dây",
    category: "Máy tính",
    price: 890000,
    img: "img/p2.jpg",
    desc: "Đèn LED RGB, phím êm, chống nước nhẹ.",
  },
  {
    id: 3,
    name: "Màn hình gaming IPS LCD",
    category: "Máy tính",
    price: 4590000,
    img: "img/p3.jpg",
    desc: "Màn cong 27 inch, tần số quét 165Hz.",
  },
  {
    id: 4,
    name: "Laptop gaming ASUS FHD",
    category: "Máy tính",
    price: 18990000,
    img: "img/p4.jpg",
    desc: "Màn Full HD, card rời, tản nhiệt tốt.",
  },
  {
    id: 5,
    name: "Máy chơi game PlayStation 5",
    category: "Gaming",
    price: 13490000,
    img: "img/p5.jpg",
    desc: "Kèm 1 tay cầm DualSense, ổ SSD tốc độ cao.",
  },
  {
    id: 6,
    name: "Áo khoác The North Coat",
    category: "Thời trang",
    price: 1690000,
    img: "img/p6.jpg",
    desc: "Chống gió, có mũ trùm, nhiều túi tiện lợi.",
  },
  {
    id: 7,
    name: "Áo khoác bomber satin",
    category: "Thời trang",
    price: 1290000,
    img: "img/p7.jpg",
    desc: "Vải satin bóng nhẹ, lót trần bông giữ ấm.",
  },
  {
    id: 8,
    name: "Túi du lịch Gucci Duffle",
    category: "Thời trang",
    price: 25900000,
    img: "img/p8.jpg",
    desc: "Họa tiết GG canvas, quai da, sức chứa lớn.",
  },
  {
    id: 9,
    name: "Ghế S-Series Comfort",
    category: "Nội thất",
    price: 2490000,
    img: "img/p9.jpg",
    desc: "Đệm êm, chân gỗ tự nhiên, phù hợp phòng khách.",
  },
  {
    id: 10,
    name: "Kệ sách mini gỗ",
    category: "Nội thất",
    price: 890000,
    img: "img/p10.jpg",
    desc: "Gỗ tự nhiên, nhỏ gọn, đặt cạnh sofa hoặc giường.",
  },
];

// Đổi số thành dạng tiền: 150000 -> "150.000 đ"
function formatPrice(number) {
  return number.toLocaleString("vi-VN") + " đ";
}
