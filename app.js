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

// 2. Product Metadata Specs & Details
const productSpecs = {
  1: { brand: "Sony / SoundCore", rating: 4.8, reviews: 3420, oldPrice: 69.99, stock: 4, features: ["Industry-leading Active Noise Cancellation with dual mics", "Up to 40 hours playtime with USB-C quick charge", "Plush protein leather memory foam ear cushions", "Bluetooth 5.3 multipoint audio connectivity"] },
  2: { brand: "FitPro Tech", rating: 4.7, reviews: 1890, oldPrice: 99.99, stock: 8, features: ["All-day real-time heart rate & SpO2 blood oxygen tracking", "1.78\" Vibrant AMOLED display with customizable dials", "IP68 water resistant with 14-day ultra-long battery life", "Smart notifications for calls, texts, and sports apps"] },
  3: { brand: "JBL Audio", rating: 4.6, reviews: 2110, oldPrice: 49.99, stock: 12, features: ["Rich 360-degree punchy bass with dual passive radiators", "Rugged IPX7 waterproof & dustproof outdoor chassis", "Up to 16 hours continuous playtime per charge", "Built-in noise-canceling microphone for speakerphone"] },
  4: { brand: "Anker Power", rating: 4.5, reviews: 940, oldPrice: 39.99, stock: 6, features: ["Fast 15W wireless charging for phone, watch & earbuds", "Intelligent safety system with overcharge temperature control", "Case-friendly wireless induction design up to 5mm", "Sleek weighted anti-slip aluminum alloy base"] },
  5: { brand: "SteelPlay Gaming", rating: 4.9, reviews: 4210, oldPrice: 59.99, stock: 5, features: ["Zero-drift Hall Effect magnetic triggers and joysticks", "Customizable dynamic RGB lighting with 6 color modes", "Ultra-low latency 2.4GHz wireless plus Bluetooth multi-platform", "Textured ergonomic rubber grips for competitive marathons"] },
  6: { brand: "Razer Mech", rating: 4.8, reviews: 3100, oldPrice: 79.99, stock: 7, features: ["Tactile clicky mechanical switches rated for 80M keystrokes", "Full RGB per-key backlighting with dynamic reactive animations", "Durable aircraft-grade aluminum alloy top plate construction", "Detachable braided USB-C cable for easy travel"] },
  7: { brand: "HyperSound", rating: 4.6, reviews: 1450, oldPrice: 54.99, stock: 10, features: ["Immersive 7.1 virtual surround sound with 50mm drivers", "Noise-canceling detachable microphone with LED mute indicator", "Breathable memory foam ear pads for pressure-free gaming", "Universal 3.5mm and USB compatibility with PC and consoles"] },
  8: { brand: "Nike / SwiftRun", rating: 4.7, reviews: 5200, oldPrice: 85.00, stock: 3, features: ["Ultra-responsive air-cushioned foam midsole for soft landings", "Engineered lightweight mesh upper for 360-degree breathability", "Durable grooved rubber traction outsole for wet and dry pavement", "Reinforced heel support counter to prevent pronation"] },
  9: { brand: "Fossil Quartz", rating: 4.5, reviews: 880, oldPrice: 59.99, stock: 9, features: ["Precision Japanese quartz three-hand movement mechanism", "Genuine brown stitched leather strap with stainless steel buckle", "Scratch-resistant hardened mineral crystal glass dial", "Water resistant to 50 meters (165 ft) for recreational swimming"] },
  10: { brand: "Ray-Style Polarized", rating: 4.4, reviews: 1620, oldPrice: 29.99, stock: 15, features: ["100% UV400 protective polarized lenses blocking 99.9% UVA/UVB", "Durable lightweight polycarbonate frame with spring-hinge arms", "Eliminates glare from water, snow, and driving surfaces", "Includes protective hardshell travel case and cleaning cloth"] },
  11: { brand: "SwissGear Travel", rating: 4.8, reviews: 2940, oldPrice: 48.99, stock: 6, features: ["Padded dedicated laptop compartment holding up to 17-inch laptops", "Water-resistant ballistic nylon exterior with anti-theft pockets", "Built-in external USB charging port with internal pass-through", "Ergonomic air-mesh ventilated back panel and luggage strap"] },
  12: { brand: "De'Longhi Brew", rating: 4.7, reviews: 3870, oldPrice: 129.99, stock: 4, features: ["Authentic 15-bar Italian pump for optimal espresso extraction", "Manual swivel steam frothing wand for rich creamy lattes", "Removable 44-ounce transparent water reservoir for easy refills", "Dual-wall stainless steel filter holder for 1 or 2 shots"] },
  13: { brand: "Ninja AirFlow", rating: 4.9, reviews: 6410, oldPrice: 99.99, stock: 5, features: ["Rapid 360-degree cyclonic air circulation with 75% less oil", "4-Quart nonstick ceramic-coated basket holds 2 lbs of food", "One-touch digital touchscreen with 6 customizable cooking presets", "Dishwasher-safe removable basket for 60-second cleanup"] },
  14: { brand: "Hydro Flask", rating: 4.6, reviews: 1730, oldPrice: 28.00, stock: 14, features: ["TempShield double-wall vacuum keeps cold 24h or hot 12h", "18/8 pro-grade food-safe stainless steel with zero flavor transfer", "ColorLast powder-coat finish won't sweat, slip, or fade", "100% leakproof flex cap with flexible TPU carry strap"] },
  15: { brand: "Penguin Random", rating: 4.9, reviews: 18400, oldPrice: 27.00, stock: 20, features: ["#1 New York Times Bestseller by James Clear with 15M+ copies sold", "Proven framework for forming good habits and 1% daily improvement", "Includes practical habit tracking scorecards and actionable tools", "Deluxe embossed hardcover presentation with gold foil accents"] },
  16: { brand: "Harriman House", rating: 4.8, reviews: 12100, oldPrice: 22.00, stock: 18, features: ["Acclaimed international bestseller by author Morgan Housel", "19 short compelling stories exploring how people think about money", "Timeless lessons on greed, risk, compounding, and financial freedom", "Compact readable paperback printed on acid-free archival paper"] },
  17: { brand: "TruSkin Organics", rating: 4.6, reviews: 2280, oldPrice: 24.99, stock: 11, features: ["Potent 20% Vitamin C + Hyaluronic Acid & Vitamin E radiance formula", "Formulated to target dark spots, fine lines, and brighten skin tone", "Plant-based, cruelty-free, paraben-free, and dermatologist-tested", "Gentle non-greasy formula suitable for all skin types"] },
  18: { brand: "Revlon Salon", rating: 4.7, reviews: 3150, oldPrice: 52.00, stock: 7, features: ["1875-Watt professional ionic ceramic motor cuts drying time in half", "Tourmaline ionic technology tames frizz and seals cuticles for shine", "3 heat / 2 speed settings plus cold shot lock button to set style", "Includes styling smoothing concentrator nozzle and diffuser"] }
};

// 3. Product Rendering
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
    <div class="card" onclick="openProductModal(${p.id})">
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <button class="quick-view-badge" onclick="event.stopPropagation(); openProductModal(${p.id})" aria-label="Quick preview of ${p.title}">
          <i class="fa-solid fa-eye"></i> Quick View
        </button>
      </div>
      <h4 onclick="event.stopPropagation(); openProductModal(${p.id})">${p.title}</h4>
      <div class="rating">★★★★★ (${(productSpecs[p.id]?.rating || 4.8).toFixed(1)})</div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
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

// 11. Product Quick View Modal
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const d = productSpecs[p.id] || {
    brand: `${p.category.toUpperCase()} Store`, rating: 4.8, reviews: 1500,
    oldPrice: +(p.price * 1.3).toFixed(2), stock: 6,
    features: ["Premium quality materials engineered for longevity", "Fast and free shipping on eligible orders", "Amazon customer satisfaction guaranteed"]
  };
  const discount = d.oldPrice ? Math.round(((d.oldPrice - p.price) / d.oldPrice) * 100) : 0;
  const loc = $('delivery-location-label')?.innerText || 'Worldwide';

  const body = $('product-modal-body');
  if (body) {
    body.innerHTML = `
      <div class="pm-layout">
        <div class="pm-visual-col">
          <div class="pm-badge-row">
            <span class="pm-prime-badge"><i class="fa-solid fa-check"></i> prime</span>
            ${discount > 0 ? `<span class="pm-deal-badge">Save ${discount}%</span>` : ''}
          </div>
          <div class="pm-img-container">
            <img src="${p.image}" alt="${p.title}" class="pm-main-img">
          </div>
          <div class="pm-delivery-pill">
            <i class="fa-solid fa-truck-fast"></i>
            <span>FREE delivery <b>Tomorrow</b> on orders over $35</span>
          </div>
        </div>

        <div class="pm-info-col">
          <div class="pm-brand-tag">Brand: ${d.brand}</div>
          <h2 class="pm-title">${p.title}</h2>
          <div class="pm-rating-row">
            <span class="pm-stars">★★★★★</span>
            <span class="pm-score">${d.rating.toFixed(1)}</span>
            <span class="pm-reviews-link">${d.reviews.toLocaleString()} ratings</span>
            <span class="pm-choice-badge">Amazon's <span>Choice</span></span>
          </div>

          <div class="pm-price-box">
            <span class="pm-price">$${p.price.toFixed(2)}</span>
            ${d.oldPrice ? `<span class="pm-old-price">List: $${d.oldPrice.toFixed(2)}</span>` : ''}
            <span class="pm-tax-note">Inclusive of all taxes</span>
          </div>

          <div class="pm-stock-badge ${d.stock <= 5 ? 'low-stock' : 'in-stock'}">
            <i class="fa-solid fa-circle-check"></i>
            ${d.stock <= 5 ? `Only ${d.stock} left in stock - order soon.` : 'In Stock. Usually ships within 24 hours.'}
          </div>

          <div class="pm-about-section">
            <h4>About this item</h4>
            <ul class="pm-bullets">
              ${d.features.map(f => `<li><i class="fa-solid fa-circle-dot"></i> <span>${f}</span></li>`).join('')}
            </ul>
          </div>

          <div class="pm-action-box">
            <div class="pm-qty-row">
              <label for="pm-qty-select">Quantity:</label>
              <select id="pm-qty-select" class="pm-qty-select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <span class="pm-shipping-loc"><i class="fa-solid fa-location-dot"></i> Deliver to <b>${loc}</b></span>
            </div>

            <div class="pm-btn-group">
              <button class="pm-btn-cart" onclick="addToCartFromModal(${p.id})">
                <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
              <button class="pm-btn-buy" onclick="buyNowFromModal(${p.id})">
                <i class="fa-solid fa-bolt"></i> Buy Now
              </button>
            </div>

            <div class="pm-guarantees">
              <span><i class="fa-solid fa-rotate-left"></i> 30-Day Returns</span>
              <span><i class="fa-solid fa-shield-halved"></i> Secure Transaction</span>
              <span><i class="fa-solid fa-box"></i> Amazon Logistics</span>
            </div>
          </div>
        </div>
      </div>`;
  }
  toggleModal('product-modal-overlay', true);
}

function closeProductModal(e) {
  closeModalOnBackdrop(e, 'product-modal-overlay', 'product-modal-close');
}

function addToCartFromModal(id) {
  const qty = parseInt($('pm-qty-select')?.value || '1', 10);
  const item = products.find(p => p.id === id);
  if (!item) return;
  for (let k = 0; k < qty; k++) cart.push(item);
  updateCart();
  showToast(`Added ${qty > 1 ? qty + 'x ' : ''}"${item.title.slice(0, 18)}..." to cart!`);
  toggleModal('product-modal-overlay', false);
}

function buyNowFromModal(id) {
  addToCartFromModal(id);
  toggleCart();
}

// 12. Global Listeners & Bootstrap
window.addEventListener('click', e => {
  const w = document.querySelector('.account-wrapper');
  if (w && !w.contains(e.target)) closeAccountDropdown();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['auth-overlay', 'orders-overlay', 'location-overlay', 'product-modal-overlay'].forEach(id => toggleModal(id, false));
    if ($('cart-drawer')?.classList.contains('open')) toggleCart();
    closeAccountDropdown();
  }
});

// Init
initTheme();
renderProducts(products);
initAuth();
initDeliveryLocation();
