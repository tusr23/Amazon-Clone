// ========================================================
// AMAZON CLONE - MINIMIZED & OPTIMIZED JAVASCRIPT
// ========================================================
const $ = id => document.getElementById(id);
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  str: (k, d = '') => localStorage.getItem(k) || d
};

// 1. Products Catalog
const products = [
  { id: 1, title: "Wireless Noise-Canceling Headphones", category: "electronics", price: 49.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 2, title: "Smart Fitness Watch with Heart Rate", category: "electronics", price: 79.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 3, title: "Portable Waterproof Bluetooth Speaker", category: "electronics", price: 34.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { id: 4, title: "3-in-1 Fast Wireless Charging Stand", category: "electronics", price: 27.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400" },
  { id: 5, title: "RGB Wireless Gaming Controller", category: "gaming", price: 44.99, image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400" },
  { id: 6, title: "Mechanical Backlit Gaming Keyboard", category: "gaming", price: 59.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { id: 7, title: "Pro Surround Sound Gaming Headset", category: "gaming", price: 39.99, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400" },
  { id: 8, title: "Lightweight Breathable Running Shoes", category: "fashion", price: 59.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 9, title: "Classic Men's Quartz Leather Watch", category: "fashion", price: 39.99, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400" },
  { id: 10, title: "Polarized Retro UV400 Sunglasses", category: "fashion", price: 18.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
  { id: 11, title: "Water-Resistant Travel Laptop Backpack", category: "fashion", price: 32.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 12, title: "Espresso & Cappuccino Coffee Maker", category: "home", price: 89.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
  { id: 13, title: "Digital Touchscreen Air Fryer 4-Quart", category: "home", price: 69.99, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400" },
  { id: 14, title: "Stainless Steel Vacuum Water Bottle", category: "home", price: 19.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  { id: 15, title: "Atomic Habits Bestseller Hardcover", category: "books", price: 14.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
  { id: 16, title: "The Psychology of Money Paperback", category: "books", price: 15.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
  { id: 17, title: "Vitamin C Radiance Face Serum 30ml", category: "beauty", price: 16.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
  { id: 18, title: "Ionic Ceramic Salon Hair Dryer", category: "beauty", price: 36.99, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400" }
];

// 2. Product Rendering
function renderProducts(list) {
  const grid = $('products-grid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: var(--orange); margin-bottom: 10px; display: block;"></i>
        <h4 style="margin-bottom: 6px; color: var(--text-main);">No matching products found</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 14px;">Try a different keyword or department category.</p>
        <button onclick="clearSearch()" class="btn-yellow" style="padding: 7px 18px;">Show All Products</button>
      </div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h4>${p.title}</h4>
      <div class="rating">★★★★★ (4.8)</div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="buy-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`).join('');
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
  const total = cart.reduce((s, p) => s + p.price, 0);
  const itemsEl = $('cart-items');
  if (itemsEl) {
    itemsEl.innerHTML = cart.length ? cart.map((p, i) => `
      <div class="cart-item">
        <span>${p.title.slice(0, 22)}...</span>
        <b>$${p.price.toFixed(2)}</b>
        <button onclick="removeItem(${i})" title="Remove item">&times;</button>
      </div>`).join('') : '<p style="text-align:center; padding:30px 10px; color:var(--text-muted);">Your cart is empty.</p>';
  }
  const totalEl = $('cart-total');
  if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

const removeItem = i => { cart.splice(i, 1); updateCart(); };
const clearCart = () => { cart = []; updateCart(); };
const toggleCart = () => {
  $('cart-drawer')?.classList.toggle('open');
  $('cart-overlay')?.classList.toggle('open');
};

function checkout() {
  if (!cart.length) return alert("Your cart is empty!");
  alert(`Order Placed Successfully! Total: ${$('cart-total')?.innerText || '$0.00'}`);
  clearCart();
  toggleCart();
}

// 4. Categories & Search Filter
let currentCategory = 'all';
const categoryTitles = {
  all: 'Featured Products', deals: "🔥 Today's Top Deals",
  electronics: 'Electronics & Gadgets', fashion: 'Fashion & Clothing',
  gaming: 'Gaming & Accessories', home: 'Home & Kitchen Essentials',
  books: 'Books & Bestsellers', beauty: 'Beauty & Personal Care'
};

function updateCategoryHeading(cat) {
  const t = $('category-title');
  if (t) t.innerText = categoryTitles[cat] || `${cat.toUpperCase()} Products`;
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const sel = $('search-category-select');
  if (sel) sel.value = cat;
  updateCategoryHeading(cat);
  applyFilters();
}

function handleCategorySelectChange(cat) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', (b.getAttribute('onclick') || '').includes(`'${cat}'`));
  });
  updateCategoryHeading(cat);
  applyFilters();
}

const handleSearchInput = q => applyFilters(q);
const searchProducts = q => applyFilters(q);
function executeSearch() {
  applyFilters();
  document.querySelector('.store-container')?.scrollIntoView({ behavior: 'smooth' });
}

function applyFilters(query) {
  const q = (query !== undefined ? query : ($('search-input')?.value || '')).toLowerCase().trim();
  let filtered = currentCategory === 'deals' ? products.filter(p => p.price < 40)
    : (currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory));
  if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  renderProducts(filtered);
}

function clearSearch() {
  const input = $('search-input');
  if (input) input.value = '';
  const sel = $('search-category-select');
  if (sel) sel.value = 'all';
  filterCategory('all', document.querySelector('.subnav .tab-btn'));
}

// 5. Toast Notifications
let toastTimer;
function showToast(msg) {
  const t = $('toast');
  if (!t) return;
  t.innerText = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// 6. Generic Modals
const toggleModal = (id, show) => {
  const el = $(id);
  if (!el) return;
  el.classList.toggle('open', show);
  document.body.style.overflow = el.classList.contains('open') ? 'hidden' : '';
};
const closeModalOnBackdrop = (e, modalId, closeClass) => {
  if (!e || e.target === e.currentTarget || e.target?.classList.contains(closeClass)) {
    toggleModal(modalId, false);
  }
};

// 7. Authentication State & Dropdown
let currentUser = null;
function initAuth() {
  currentUser = store.get('amazon_clone_user', null);
  updateAuthUI();
}

function updateAuthUI() {
  const g = $('user-greeting'), txt = $('nav-auth-text'), icn = $('nav-auth-icon'), btn = $('nav-auth-btn');
  const prompt = $('auth-footer-prompt'), hdr = $('dropdown-header'), signout = $('dropdown-signout-link');
  if (currentUser) {
    if (g) g.innerText = `Hello, ${currentUser.name}`;
    if (txt) txt.innerText = 'Sign Out';
    if (icn) icn.className = 'fa-solid fa-arrow-right-from-bracket';
    if (btn) { btn.classList.add('logged-in'); btn.title = `Signed in as ${currentUser.name}`; }
    if (prompt) prompt.style.display = 'none';
    if (hdr) hdr.innerHTML = `<p>Hello, <strong>${currentUser.name}</strong></p><small style="color:var(--text-muted);">${currentUser.email || ''}</small>`;
    if (signout) signout.style.display = 'flex';
  } else {
    if (g) g.innerText = 'Hello, Sign in';
    if (txt) txt.innerText = 'Sign In';
    if (icn) icn.className = 'fa-solid fa-arrow-right-to-bracket';
    if (btn) { btn.classList.remove('logged-in'); btn.title = 'Sign In to your Amazon Clone account'; }
    if (prompt) prompt.style.display = 'block';
    if (hdr) hdr.innerHTML = `<p>Welcome to Amazon Clone</p><button class="dropdown-signin-btn" onclick="openLoginModal()">Sign in</button><small>New customer? <a href="#" onclick="openLoginModal(); return false;">Start here.</a></small>`;
    if (signout) signout.style.display = 'none';
  }
}

const openLoginModal = () => { closeAccountDropdown(); toggleModal('auth-overlay', true); setTimeout(() => $('login-email')?.focus(), 100); };
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
  currentUser = { name: name.charAt(0).toUpperCase() + name.slice(1), email };
  store.set('amazon_clone_user', currentUser);
  updateAuthUI();
  toggleModal('auth-overlay', false);
  showToast(`Welcome back, ${currentUser.name}!`);
  $('auth-form')?.reset();
}

function demoLogin() {
  currentUser = { name: 'John Doe', email: 'john.doe@amazonclone.demo' };
  store.set('amazon_clone_user', currentUser);
  updateAuthUI();
  toggleModal('auth-overlay', false);
  showToast('Signed in as John Doe (Demo Account)!');
}

function logout() {
  const name = currentUser?.name;
  currentUser = null;
  localStorage.removeItem('amazon_clone_user');
  closeAccountDropdown();
  updateAuthUI();
  showToast(name ? `Signed out ${name}. See you soon!` : 'Signed out successfully.');
}

// 8. Orders Modal
function handleOrdersClick() {
  if (!currentUser) { openLoginModal(); showToast('Please sign in to view orders & returns.'); }
  else { showOrdersModal(); }
}

function showOrdersModal() {
  closeAccountDropdown();
  toggleModal('orders-overlay', true);
  const info = $('orders-user-info');
  if (info && currentUser) info.innerHTML = `<span>Signed in as <b>${currentUser.name}</b> (${currentUser.email || 'Member'})</span><span class="orders-count">Showing 2 recent orders</span>`;
}
const closeOrdersModal = e => closeModalOnBackdrop(e, 'orders-overlay', 'orders-close-btn');

// 9. Delivery Location
const openLocationModal = () => { closeAccountDropdown(); toggleModal('location-overlay', true); };
const closeLocationModal = e => closeModalOnBackdrop(e, 'location-overlay', 'location-close-btn');
function setDeliveryCountry(c) {
  if ($('delivery-location-label')) $('delivery-location-label').innerText = c;
  localStorage.setItem('amazon_clone_delivery_loc', c);
  showToast(`Deliver to updated: ${c}`);
}
function applyZipCode() {
  const zip = ($('zip-code-input')?.value || '').trim();
  if (!zip) return alert('Please enter a valid zip or postal code.');
  setDeliveryCountry(`ZIP ${zip}`);
  toggleModal('location-overlay', false);
}
function initDeliveryLocation() {
  const loc = store.str('amazon_clone_delivery_loc');
  if (loc) {
    if ($('delivery-location-label')) $('delivery-location-label').innerText = loc;
    if ($('country-selector')) $('country-selector').value = loc.startsWith('ZIP') ? 'United States' : loc;
  }
}

// 10. Amazon Dark Theme
function initTheme() {
  const saved = localStorage.getItem('amazon_clone_theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : !!prefersDark, false);
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('amazon_clone_theme')) applyTheme(e.matches, false);
  });
}

function applyTheme(isDark, notify = true) {
  document.body.classList.toggle('dark-mode', isDark);
  try { localStorage.setItem('amazon_clone_theme', isDark ? 'dark' : 'light'); } catch {}
  if ($('theme-label')) $('theme-label').innerText = isDark ? 'Light' : 'Dark';
  if ($('theme-toggle-btn')) {
    $('theme-toggle-btn').setAttribute('aria-pressed', isDark ? 'true' : 'false');
    $('theme-toggle-btn').title = isDark ? 'Switch to Light Theme' : 'Switch to Amazon Dark Theme';
  }
  if ($('dropdown-theme-text')) $('dropdown-theme-text').innerText = isDark ? 'Light Theme' : 'Dark Theme';
  if ($('footer-theme-text')) $('footer-theme-text').innerText = isDark ? 'Light Mode' : 'Dark Mode';
  if ($('footer-theme-icon')) $('footer-theme-icon').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  if (notify) showToast(isDark ? '🌙 Switched to Amazon Dark Theme' : '☀️ Switched to Light Theme');
}

const toggleTheme = () => applyTheme(!document.body.classList.contains('dark-mode'), true);

// 11. Global Listeners & Bootstrap
window.addEventListener('click', e => {
  const w = document.querySelector('.account-wrapper');
  if (w && !w.contains(e.target)) closeAccountDropdown();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['auth-overlay', 'orders-overlay', 'location-overlay'].forEach(id => toggleModal(id, false));
    if ($('cart-drawer')?.classList.contains('open')) toggleCart();
    closeAccountDropdown();
  }
});

// Init
initTheme();
renderProducts(products);
initAuth();
initDeliveryLocation();
