// =========================
// 📦 PRODUCT LIST 
// =========================
const products = [
  { name: "Notebook", desc: "70-sheet ruled notebook", price: 35},
  { name: "Ballpen Pack", desc: "Pack of smooth-writing pens", price: 50},
  { name: "Highlighter Set", desc: "Fluorescent color markers", price: 120},
  { name: "Sticky Notes", desc: "Memo note pads (Assorted colors)", price: 25},
  { name: "Scissors", desc: "Stainless steel school scissors", price: 80},
  { name: "Correction Tape", desc: "White tape for clean erasing", price: 45}
];

// =========================
// 🔹 DOM ELEMENTS
// =========================
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");

// Load existing cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || {};


// =========================
// 🧃 DISPLAY PRODUCTS
// =========================
products.forEach((item) => {
  const card = document.createElement("div");
  card.className =
    "product-card bg-gray-800 p-5 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300";

  card.innerHTML = `
    <img src="${item.img || 'https://via.placeholder.com/300'}"
         alt="${item.name}"
         class="rounded-xl mb-3 w-full h-56 object-cover">

    <h3 class="text-xl font-semibold text-yellow-400">${item.name}</h3>
    <p class="text-gray-400 text-sm">${item.desc}</p>
    <p class="mt-2 font-bold text-gray-200">₱${item.price}</p>
  `;

  card.addEventListener("click", () => addToCart(item));
  productList.appendChild(card);
});


// =========================
// 🛒 ADD TO CART
// =========================
function addToCart(item) {
  if (!cart[item.name]) cart[item.name] = { ...item, qty: 1 };
  else cart[item.name].qty++;

  saveAndUpdate();
}


// =========================
// 🔄 UPDATE CART DISPLAY
// =========================
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  for (const key in cart) {
    const { name, price, qty } = cart[key];
    total += price * qty;

    const li = document.createElement("li");
    li.className =
      "flex justify-between bg-blue-700 p-3 rounded-lg items-center hover:scale-[1.02] transition-all duration-200";

    li.innerHTML = `
      <span class="text-white-900">${name}</span>

      <div class="flex items-center gap-2">
        <button class="px-2 bg-gray-700 rounded hover:bg-gray-600" onclick="changeQty('${name}', -1)">-</button>
        <span>${qty}</span>
        <button class="px-2 bg-gray-700 rounded hover:bg-gray-600" onclick="changeQty('${name}', 1)">+</button>
        <button class="px-2 bg-red-700 rounded hover:bg-red-600 text-sm" onclick="removeItem('${name}')">🗑️</button>
      </div>

      <span>₱${(price * qty).toFixed(2)}</span>
    `;

    cartList.appendChild(li);
  }

  cartTotal.textContent = Object.keys(cart).length
    ? `Total: ₱${total.toFixed(2)}`
    : "Cart is empty";
}


// =========================
// ➕ / ➖ CHANGE QUANTITY
// =========================
function changeQty(name, delta) {
  if (cart[name]) {
    cart[name].qty += delta;
    if (cart[name].qty <= 0) delete cart[name];
    saveAndUpdate();
  }
}


// =========================
// 🗑️ REMOVE ITEM
// =========================
function removeItem(name) {
  delete cart[name];
  saveAndUpdate();
}


// =========================
// 💾 SAVE + UPDATE CART
// =========================
function saveAndUpdate() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}


// =========================
// 🧹 CLEAR CART
// =========================
clearCartBtn.addEventListener("click", () => {
  cart = {};
  saveAndUpdate();
});


// =========================
// 🧾 CHECKOUT MODAL
// =========================
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("🛒 Cart is empty!");
    return;
  }

  checkoutModal.classList.remove("hidden");
  cart = {};
  saveAndUpdate();
});

closeModal.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});


// =========================
// 🔄 INITIAL LOAD
// =========================
updateCart();
