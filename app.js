// ========================================================
// AMAZON CLONE - OPTIMIZED JAVASCRIPT
// ========================================================

const $ = id => document.getElementById(id);

// 1. Products Catalog
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

// 2. Render Product Cards
function renderProducts(list) {
  const grid = $('products-grid');
  if (!grid) return;
  grid.innerHTML = list.map(item => `
    <div class="card">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <h4>${item.title}</h4>
      <div class="rating">★★★★★ (4.8)</div>
      <div class="price">$${item.price.toFixed(2)}</div>
      <button class="buy-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    </div>
  `).join('');
}

// 3. Cart Management
let cart = [];

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;
  cart.push(item);
  updateCart();
  showToast(`Added "${item.title.slice(0, 20)}..." to cart!`);
}

function updateCart() {
  const countEl = $('cart-count');
  if (countEl) countEl.innerText = cart.length;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cartBody = $('cart-items');
  if (cartBody) {
    cartBody.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <span>${item.title.slice(0, 22)}...</span>
        <b>$${item.price.toFixed(2)}</b>
        <button onclick="removeItem(${i})" title="Remove item">&times;</button>
      </div>
    `).join('');
  }

  const totalEl = $('cart-total');
  if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

const removeItem = i => { cart.splice(i, 1); updateCart(); };
const clearCart = () => { cart = []; updateCart(); };

function toggleCart() {
  $('cart-drawer')?.classList.toggle('open');
  $('cart-overlay')?.classList.toggle('open');
}

function checkout() {
  if (!cart.length) return alert("Your cart is empty!");
  alert(`Order Placed Successfully! Total: ${$('cart-total')?.innerText || '$0.00'}`);
  clearCart();
  toggleCart();
}

// 4. Categories & Search Filter
let currentCategory = 'all';

const categoryTitles = {
  all: 'Featured Products',
  deals: "🔥 Today's Top Deals",
  electronics: 'Electronics & Gadgets',
  fashion: 'Fashion & Clothing',
  gaming: 'Gaming & Accessories',
  home: 'Home & Kitchen Essentials',
  books: 'Books & Bestsellers',
  beauty: 'Beauty & Personal Care'
};

function updateCategoryHeading(cat) {
  const titleEl = $('category-title');
  if (titleEl) titleEl.innerText = categoryTitles[cat] || (cat.toUpperCase() + ' Products');
}

function handleCategorySelectChange(cat) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', (btn.getAttribute('onclick') || '').includes(`'${cat}'`));
  });
  updateCategoryHeading(cat);
  applyFilters();
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const select = $('search-category-select');
  if (select) select.value = cat;
  updateCategoryHeading(cat);
  applyFilters();
}

const handleSearchInput = q => applyFilters(q);

function executeSearch() {
  applyFilters();
  document.querySelector('.store-container')?.scrollIntoView({ behavior: 'smooth' });
}

function applyFilters(query) {
  const q = (query !== undefined ? query : ($('search-input')?.value || '')).toLowerCase().trim();
  let filtered = products;

  if (currentCategory === 'deals') {
    filtered = filtered.filter(p => p.price < 40);
  } else if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (q) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }

  renderProducts(filtered);

  if (!filtered.length) {
    const grid = $('products-grid');
    if (grid) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 45px 20px; background: #fff; border-radius: 8px; border: 1px solid #ddd;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; color: #ff9900; margin-bottom: 12px; display: block;"></i>
          <h4 style="font-size: 1.2rem; margin-bottom: 8px;">No matching products found</h4>
          <p style="color: #666; font-size: 0.9rem; margin-bottom: 16px;">We couldn't find any products matching your search in this category.</p>
          <button onclick="clearSearch()" class="btn-yellow" style="padding: 8px 20px; font-size: 0.88rem;">Show All Products</button>
        </div>
      `;
    }
  }
}

function clearSearch() {
  const input = $('search-input');
  if (input) input.value = '';
  const select = $('search-category-select');
  if (select) select.value = 'all';
  currentCategory = 'all';
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  updateCategoryHeading('all');
  applyFilters();
}

const searchProducts = q => handleSearchInput(q);

// 5. Toast Notifications
let toastTimer;
function showToast(msg) {
  const toast = $('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// 6. Generic Modal Helper
const toggleModal = (id, show) => {
  const el = $(id);
  if (!el) return;
  el.classList.toggle('open', show);
  document.body.style.overflow = el.classList.contains('open') ? 'hidden' : '';
};

const closeModalOnBackdrop = (e, modalId, closeClass) => {
  if (e && e.target && e.target !== e.currentTarget && !e.target.classList.contains(closeClass)) return;
  toggleModal(modalId, false);
};

// 7. Authentication State & Modal
let currentUser = null;

function initAuth() {
  try {
    const saved = localStorage.getItem('amazon_clone_user');
    currentUser = saved ? JSON.parse(saved) : null;
  } catch { currentUser = null; }
  updateAuthUI();
}

function updateAuthUI() {
  const greeting = $('user-greeting');
  const authBtnText = $('nav-auth-text');
  const authBtnIcon = $('nav-auth-icon');
  const authBtn = $('nav-auth-btn');
  const footerPrompt = $('auth-footer-prompt');
  const dropdownHeader = $('dropdown-header');
  const signoutLink = $('dropdown-signout-link');

  if (currentUser) {
    if (greeting) greeting.innerText = `Hello, ${currentUser.name}`;
    if (authBtnText) authBtnText.innerText = 'Sign Out';
    if (authBtnIcon) authBtnIcon.className = 'fa-solid fa-arrow-right-from-bracket';
    if (authBtn) {
      authBtn.classList.add('logged-in');
      authBtn.title = `Signed in as ${currentUser.name} (Click to sign out)`;
    }
    if (footerPrompt) footerPrompt.style.display = 'none';
    if (dropdownHeader) {
      dropdownHeader.innerHTML = `
        <p style="font-size:0.95rem; margin-bottom:4px;">Hello, <strong>${currentUser.name}</strong></p>
        <small style="color:#666;">${currentUser.email || ''}</small>
      `;
    }
    if (signoutLink) signoutLink.style.display = 'flex';
  } else {
    if (greeting) greeting.innerText = 'Hello, Sign in';
    if (authBtnText) authBtnText.innerText = 'Sign In';
    if (authBtnIcon) authBtnIcon.className = 'fa-solid fa-arrow-right-to-bracket';
    if (authBtn) {
      authBtn.classList.remove('logged-in');
      authBtn.title = 'Sign In to your Amazon Clone account';
    }
    if (footerPrompt) footerPrompt.style.display = 'block';
    if (dropdownHeader) {
      dropdownHeader.innerHTML = `
        <p>Welcome to Amazon Clone</p>
        <button class="dropdown-signin-btn" onclick="openLoginModal()">Sign in</button>
        <small>New customer? <a href="#" onclick="openLoginModal(); return false;">Start here.</a></small>
      `;
    }
    if (signoutLink) signoutLink.style.display = 'none';
  }
}

function openLoginModal() {
  closeAccountDropdown();
  toggleModal('auth-overlay', true);
  setTimeout(() => $('login-email')?.focus(), 100);
}
const closeLoginModal = e => closeModalOnBackdrop(e, 'auth-overlay', 'auth-close-btn');

const handleAccountClick = () => (!currentUser ? openLoginModal() : toggleAccountDropdown());
const handleAuthBtnClick = () => (currentUser ? logout() : openLoginModal());
const toggleAccountDropdown = () => $('account-dropdown')?.classList.toggle('open');
const closeAccountDropdown = () => $('account-dropdown')?.classList.remove('open');

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = ($('login-email')?.value || '').trim();
  if (!email) return;
  const name = email.split('@')[0];
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  currentUser = { name: capitalized, email };
  localStorage.setItem('amazon_clone_user', JSON.stringify(currentUser));
  updateAuthUI();
  toggleModal('auth-overlay', false);
  showToast(`Welcome back, ${capitalized}!`);
  $('auth-form')?.reset();
}

function demoLogin() {
  currentUser = { name: 'John Doe', email: 'john.doe@amazonclone.demo' };
  localStorage.setItem('amazon_clone_user', JSON.stringify(currentUser));
  updateAuthUI();
  toggleModal('auth-overlay', false);
  showToast('Signed in as John Doe (Demo Account)!');
}

function logout() {
  const name = currentUser ? currentUser.name : '';
  currentUser = null;
  localStorage.removeItem('amazon_clone_user');
  closeAccountDropdown();
  updateAuthUI();
  showToast(name ? `Signed out ${name}. See you soon!` : 'Signed out successfully.');
}

// 8. Returns & Orders
function handleOrdersClick() {
  if (!currentUser) {
    openLoginModal();
    showToast('Please sign in to view your orders & returns.');
  } else {
    showOrdersModal();
  }
}

function showOrdersModal() {
  closeAccountDropdown();
  toggleModal('orders-overlay', true);
  const userInfo = $('orders-user-info');
  if (userInfo && currentUser) {
    userInfo.innerHTML = `<span>Signed in as <b>${currentUser.name}</b> (${currentUser.email || 'Member'})</span><span class="orders-count">Showing 2 recent orders</span>`;
  }
}
const closeOrdersModal = e => closeModalOnBackdrop(e, 'orders-overlay', 'orders-close-btn');

// 9. Delivery Location
const openLocationModal = () => { closeAccountDropdown(); toggleModal('location-overlay', true); };
const closeLocationModal = e => closeModalOnBackdrop(e, 'location-overlay', 'location-close-btn');

function setDeliveryCountry(country) {
  const label = $('delivery-location-label');
  if (label) label.innerText = country;
  localStorage.setItem('amazon_clone_delivery_loc', country);
  showToast(`Deliver to updated: ${country}`);
}

function applyZipCode() {
  const zip = ($('zip-code-input')?.value || '').trim();
  if (!zip) return alert('Please enter a valid zip or postal code.');
  const loc = `ZIP ${zip}`;
  const label = $('delivery-location-label');
  if (label) label.innerText = loc;
  localStorage.setItem('amazon_clone_delivery_loc', loc);
  showToast(`Delivery location set to ${loc}!`);
  toggleModal('location-overlay', false);
}

function initDeliveryLocation() {
  try {
    const saved = localStorage.getItem('amazon_clone_delivery_loc');
    if (saved) {
      const label = $('delivery-location-label');
      if (label) label.innerText = saved;
      const selector = $('country-selector');
      if (selector) selector.value = saved.startsWith('ZIP') ? 'United States' : saved;
    }
  } catch {}
}

// 10. Global Event Listeners & Startup
window.addEventListener('click', e => {
  const wrap = document.querySelector('.account-wrapper');
  if (wrap && !wrap.contains(e.target)) closeAccountDropdown();
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['auth-overlay', 'orders-overlay', 'location-overlay'].forEach(id => toggleModal(id, false));
    closeAccountDropdown();
  }
});

// Initial Startup
renderProducts(products);
initAuth();
initDeliveryLocation();
