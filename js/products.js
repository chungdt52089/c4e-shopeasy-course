// ===== CN1: Hiển thị sản phẩm =====
function productCard(product) {
  return `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}">
      <div class="product-body">
        <h3>${product.name}</h3>
        <p class="product-meta">${product.category}</p>
        <p class="price">${formatPrice(product.price)}</p>
        <a href="product-detail.html?id=${product.id}" class="btn">Xem chi tiết</a>
      </div>
    </div>
  `;
}

function renderProducts(list, containerId) {
  const box = document.getElementById(containerId);
  if (!box) return;

  if (list.length === 0) {
    box.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    return;
  }
  box.innerHTML = list.map(productCard).join("");
}

// Trang chủ: 6 sản phẩm đầu tiên
renderProducts(products.slice(0, 6), "featured-list");

// ===== CN2: Tìm kiếm, lọc danh mục, sắp xếp giá =====
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

function filterProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  const result = products.filter(function (product) {
    const matchName = product.name.toLowerCase().includes(keyword);
    const matchCategory = category === "" || product.category === category;
    return matchName && matchCategory;
  });

  if (sort === "asc") result.sort((a, b) => a.price - b.price);
  if (sort === "desc") result.sort((a, b) => b.price - a.price);

  renderProducts(result, "product-list");
}

if (searchInput) {
  const q = new URLSearchParams(location.search).get("q");
  if (q) searchInput.value = q;

  searchInput.addEventListener("input", filterProducts);
  categorySelect.addEventListener("change", filterProducts);
  sortSelect.addEventListener("change", filterProducts);
  filterProducts();
}

// ===== Chi tiết sản phẩm =====
function renderDetail() {
  const box = document.getElementById("product-detail");
  if (!box) return;

  const id = Number(new URLSearchParams(location.search).get("id"));
  const product = products.find((p) => p.id === id);

  if (!product) {
    box.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
    return;
  }

  box.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div>
      <h1>${product.name}</h1>
      <p class="price">${formatPrice(product.price)}</p>
      <p>${product.desc}</p>
      <ul class="specs">
        <li>Danh mục: ${product.category}</li>
      </ul>
      <input type="number" id="qty" class="qty-input" value="1" min="1">
      <button id="add-btn" class="btn">Thêm vào giỏ</button>
    </div>
  `;
  document.getElementById("add-btn").addEventListener("click", function () {
    const qty = Number(document.getElementById("qty").value);
    addToCart(product.id, qty);
  });
}
renderDetail();
