// ===== Hàm dùng chung với localStorage =====
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  const email = localStorage.getItem("currentUser");
  return getUsers().find((user) => user.email === email);
}

// ===== Header: hiện tên + nút Đăng xuất nếu đã đăng nhập =====
function renderUserBox() {
  const box = document.getElementById("user-box");
  const user = getCurrentUser();
  if (!box || !user) return;

  box.innerHTML = `
    <span>Xin chào, ${user.name}</span>
    <button id="logout-btn" class="btn btn-outline">Đăng xuất</button>
  `;
  document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    location.href = "index.html";
  });
}
renderUserBox();

// ===== Đăng ký =====
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // chặn form tải lại trang

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const message = document.getElementById("message");

    if (password.length < 6) {
      message.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
      return;
    }
    if (password !== confirm) {
      message.textContent = "Mật khẩu nhập lại không khớp";
      return;
    }

    const users = getUsers();
    if (users.find((user) => user.email === email)) {
      message.textContent = "Email này đã được đăng ký";
      return;
    }

    users.push({ name, email, password }); // Lưu user mới vào mảng
    saveUsers(users);
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    location.href = "login.html";
  });
}

// ===== Đăng nhập =====
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const user = getUsers().find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      document.getElementById("message").textContent =
        "Sai email hoặc mật khẩu";
      return;
    }

    localStorage.setItem("currentUser", email);
    // Nếu trước đó bị chuyển tới từ trang khác thì quay lại trang đó
    const back = new URLSearchParams(location.search).get("redirect");
    location.href = back || "index.html";
  });
}
