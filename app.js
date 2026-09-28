// 1. Products Data (Expanded Variety)
const products = [
  // Electronics
  { id: 1, title: "Wireless Noise-Canceling Headphones", category: "electronics", price: 49.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 2, title: "Smart Fitness Watch with Heart Rate", category: "electronics", price: 79.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 3, title: "Portable Waterproof Bluetooth Speaker", category: "electronics", price: 34.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { id: 4, title: "3-in-1 Fast Wireless Charging Stand", category: "electronics", price: 27.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400" },

  // Gaming
  { id: 5, title: "RGB Wireless Gaming Controller", category: "gaming", price: 44.99, image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400" },
  { id: 6, title: "Mechanical Backlit Gaming Keyboard", category: "gaming", price: 59.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { id: 7, title: "Pro Surround Sound Gaming Headset", category: "gaming", price: 39.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400" },

  // Fashion
  { id: 8, title: "Lightweight Breathable Running Shoes", category: "fashion", price: 59.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 9, title: "Classic Men's Quartz Leather Watch", category: "fashion", price: 39.99, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400" },
  { id: 10, title: "Polarized Retro UV400 Sunglasses", category: "fashion", price: 18.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
  { id: 11, title: "Water-Resistant Travel Laptop Backpack", category: "fashion", price: 32.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },

  // Home & Kitchen
  { id: 12, title: "Espresso & Cappuccino Coffee Maker", category: "home", price: 89.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
  { id: 13, title: "Digital Touchscreen Air Fryer 4-Quart", category: "home", price: 69.99, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400" },
  { id: 14, title: "Stainless Steel Vacuum Water Bottle", category: "home", price: 19.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },

  // Books
  { id: 15, title: "Atomic Habits Bestseller Hardcover", category: "books", price: 14.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
  { id: 16, title: "The Psychology of Money Paperback", category: "books", price: 15.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },

  // Beauty & Personal Care
  { id: 17, title: "Vitamin C Radiance Face Serum 30ml", category: "beauty", price: 16.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
  { id: 18, title: "Ionic Ceramic Salon Hair Dryer", category: "beauty", price: 36.99, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400" }
];

let cart = [];

// 2. Render Product Cards
function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = list.map(item => `
    <div class="card">
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <div class="rating">★★★★★ (4.8)</div>
      <div class="price">$${item.price.toFixed(2)}</div>
      <button class="buy-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    </div>
  `).join('');
}

// 3. Add to Cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
  showToast(`Added "${item.title.slice(0, 20)}..." to cart!`);
}

// 4. Update Cart Drawer & Total
function updateCart() {
  document.getElementById('cart-count').innerText = cart.length;
  const cartBody = document.getElementById('cart-items');
  let total = 0;

  cartBody.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item">
        <span>${item.title.slice(0, 22)}...</span>
        <b>$${item.price.toFixed(2)}</b>
        <button onclick="removeItem(${index})">&times;</button>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

// 5. Remove Item & Clear Cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

// 6. Open / Close Cart Sidebar
function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

// 7. Checkout
function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert(`Order Placed Successfully! Total: ${document.getElementById('cart-total').innerText}`);
  clearCart();
  toggleCart();
}

// 8. Live Search
function searchProducts(query) {
  const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  renderProducts(filtered);
}

// 9. Category Filter
function filterCategory(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const titles = {
    all: 'Featured Products',
    deals: "🔥 Today's Top Deals",
    electronics: 'Electronics & Gadgets',
    fashion: 'Fashion & Clothing',
    gaming: 'Gaming & Accessories',
    home: 'Home & Kitchen Essentials',
    books: 'Books & Bestsellers',
    beauty: 'Beauty & Personal Care'
  };
  document.getElementById('category-title').innerText = titles[cat] || (cat.toUpperCase() + ' Products');

  let filtered = products;
  if (cat === 'deals') {
    filtered = products.filter(p => p.price < 40); // items under $40 are featured deals
  } else if (cat !== 'all') {
    filtered = products.filter(p => p.category === cat);
  }

  renderProducts(filtered);
}

// 10. Toast Popup
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Initial Load
renderProducts(products);
