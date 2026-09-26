// Giỏ hàng lưu dạng: [{ productId: 1, qty: 2 }, ...]
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // mỗi lần lưu giỏ thì cập nhật số trên header
}

// ===== CN7 (bonus): Số lượng trên icon giỏ =====
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = total;
}
updateCartCount();

// ===== CN3: Thêm vào giỏ =====
function addToCart(productId, qty) {
  if (qty < 1) {
    alert("Số lượng phải lớn hơn 0");
    return;
  }
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);

  if (item) {
    item.qty += qty; // đã có trong giỏ -> cộng thêm số lượng
  } else {
    cart.push({ productId, qty }); // chưa có -> thêm mới
  }
  saveCart(cart);
  alert("Đã thêm vào giỏ hàng!");
}

// ===== CN4: Hiển thị giỏ, sửa số lượng, xóa, tính tổng =====
function renderCart() {
  const box = document.getElementById("cart-list");
  if (!box) return;

  const cart = getCart();
  if (cart.length === 0) {
    box.innerHTML = `<p>Giỏ hàng trống. <a href="products.html">Mua sắm ngay</a></p>`;
    return;
  }

  const rows = cart.map(function (item) {
    const product = products.find((p) => p.id === item.productId);
    return `
      <tr>
        <td>${product.name}</td>
        <td>${formatPrice(product.price)}</td>
        <td>
          <div class="qty-box">
            <button onclick="changeQty(${item.productId}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.productId}, 1)">+</button>
          </div>
        </td>
        <td>${formatPrice(product.price * item.qty)}</td>
        <td><button class="btn btn-danger" onclick="removeFromCart(${item.productId})">Xóa</button></td>
      </tr>
    `;
  });

  const total = cart.reduce(function (sum, item) {
    const product = products.find((p) => p.id === item.productId);
    return sum + product.price * item.qty;
  }, 0);

  box.innerHTML = `
    <table>
      <thead>
        <tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th></th></tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>
    <div class="cart-summary">
      <h3>Tổng tiền: <span class="price">${formatPrice(total)}</span></h3>
      <button class="btn" onclick="checkout()">Đặt hàng</button>
    </div>
  `;
}

function changeQty(productId, change) {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);
  item.qty += change;

  if (item.qty <= 0) {
    removeFromCart(productId); // giảm về 0 thì xóa luôn
    return;
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.productId !== productId);
  saveCart(cart);
  renderCart();
}

renderCart();

// ===== CN6 (bonus): Đặt hàng + lịch sử =====
function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function checkout() {
  const user = getCurrentUser();
  if (!user) {
    alert("Bạn cần đăng nhập để đặt hàng");
    location.href = "login.html?redirect=cart.html";
    return;
  }

  const cart = getCart();
  const total = cart.reduce(function (sum, item) {
    const product = products.find((p) => p.id === item.productId);
    return sum + product.price * item.qty;
  }, 0);

  const orders = getOrders();
  orders.push({
    id: Date.now(),
    email: user.email,
    items: cart,
    total: total,
    date: new Date().toLocaleDateString("vi-VN")
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  saveCart([]); // đặt xong thì làm trống giỏ
  alert("Đặt hàng thành công!");
  location.href = "orders.html";
}

function renderOrders() {
  const box = document.getElementById("order-list");
  if (!box) return;

  const user = getCurrentUser();
  if (!user) {
    box.innerHTML = `<p>Vui lòng <a href="login.html?redirect=orders.html">đăng nhập</a> để xem đơn hàng.</p>`;
    return;
  }

  const myOrders = getOrders().filter((o) => o.email === user.email);
  if (myOrders.length === 0) {
    box.innerHTML = "<p>Bạn chưa có đơn hàng nào.</p>";
    return;
  }

  const rows = myOrders.map(function (order) {
    const names = order.items.map(function (item) {
      const product = products.find((p) => p.id === item.productId);
      return `${product.name} x${item.qty}`;
    });
    return `
      <tr>
        <td>${order.date}</td>
        <td>${names.join("<br>")}</td>
        <td>${formatPrice(order.total)}</td>
      </tr>
    `;
  });

  box.innerHTML = `
    <table>
      <thead><tr><th>Ngày đặt</th><th>Sản phẩm</th><th>Tổng tiền</th></tr></thead>
      <tbody>${rows.join("")}</tbody>
    </table>
  `;
}
renderOrders();
