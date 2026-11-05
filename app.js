const categories = [
  { id: "Meyve & Sebze", label: "Meyve & Sebze", count: "Instagram paylaşımları", emoji: "🍇", bg: "#e9efdf" },
  { id: "Kasap", label: "Kasap", count: "Instagram paylaşımları", emoji: "🥩", bg: "#f2e3dc" },
  { id: "Süt & Şarküteri", label: "Süt & Şarküteri", count: "Instagram paylaşımları", emoji: "🧀", bg: "#f5ebd6" },
  { id: "Kuru Gıda", label: "Kuru Gıda", count: "Instagram paylaşımları", emoji: "🌾", bg: "#f2e8df" },
  { id: "Ev & Temizlik", label: "Ev & Temizlik", count: "Instagram paylaşımları", emoji: "🫧", bg: "#e5eee7" },
];

const products = [
  { id: "dana-kiyma", name: "Dana Kıyma", category: "Kasap", unit: "Birim görselde belirtilmemiş", price: 889.9, emoji: "🥩", image: "assets/instagram/dana-kiyma.jpg", bg: "#f4e5df", tag: "POST · 29 EKİ", sourceDate: "29 Ekim 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/DfEif-jidjJ/" },
  { id: "sultani-uzum", name: "Sultani Üzüm", category: "Meyve & Sebze", unit: "Birim görselde belirtilmemiş", price: 99.9, emoji: "🍇", image: "assets/instagram/sultani-uzum.jpg", bg: "#e9efdf", tag: "POST · 17 EKİ", sourceDate: "17 Ekim 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/DeljfwrggP_/" },
  { id: "duru-bulgur", name: "Duru Pratik Bulgur Pilavı", category: "Kuru Gıda", unit: "250 g · farklı çeşitler", price: 69.9, emoji: "🌾", image: "assets/instagram/duru-bulgur.jpg", bg: "#f2e8df", tag: "POST · 17 EKİ", sourceDate: "17 Ekim 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/DelibNnghnO/" },
  { id: "kovil-sabun", name: "Kovil Sıvı Sabun Çeşitleri", category: "Ev & Temizlik", unit: "400 ml", price: 29.9, emoji: "🫧", image: "assets/instagram/kovil-liquid-soap.jpg", bg: "#e5eee7", tag: "POST · 23 EKİ", sourceDate: "23 Ekim 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/De3duUFAp2u/" },
  { id: "danablu", name: "Castello Danablu", category: "Süt & Şarküteri", unit: "100 g", price: 139.9, emoji: "🧀", image: "assets/instagram/castello-danablu.jpg", bg: "#f5ebd6", tag: "POST · 25 EYL", sourceDate: "25 Eylül 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/DdvVcRbgjcW/" },
  { id: "seftali", name: "Şeftali", category: "Meyve & Sebze", unit: "Birim görselde belirtilmemiş", price: 84.9, emoji: "🍑", image: "assets/instagram/peaches.jpg", bg: "#f6e5df", tag: "POST · 18 EYL", sourceDate: "18 Eylül 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/Dddato2gmju/" },
  { id: "kavun", name: "Kavun", category: "Meyve & Sebze", unit: "Birim görselde belirtilmemiş", price: 34.9, emoji: "🍈", image: "assets/instagram/honeydew-melon.jpg", bg: "#e8efdf", tag: "POST · 12 EYL", sourceDate: "12 Eylül 2026", sourceUrl: "https://www.instagram.com/supermarketsengun/p/DdLm-EtgsRM/" },
];

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
const DELIVERY_FEE = 29.9;
const FREE_DELIVERY_THRESHOLD = 500;
const CART_STORAGE_KEY = "sepet-demo-cart-v1";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $("#main-content");
const cartOverlay = $("#cart-overlay");
const checkoutOverlay = $("#checkout-overlay");
const confirmationPage = $("#confirmation-page");
const searchInput = $("#search-input");
const productGrid = $("#product-grid");
const toast = $("#toast");

let selectedCategory = null;
let cart = loadCart();
let previousFocus = null;
let toastTimer;

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {};
    return Object.fromEntries(
      Object.entries(stored).filter(([id, quantity]) =>
        products.some((product) => product.id === id) &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        quantity < 100
      ),
    );
  } catch (error) {
    console.error("Sepet bilgisi okunamadı:", error);
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Sepet bilgisi kaydedilemedi:", error);
    showToast("Sepetin bu oturumda saklanamadı.");
  }
}

function formatPrice(value) {
  return money.format(value);
}

function getCartItems() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
    .filter((item) => item.product);
}

function getSubtotal() {
  return getCartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function getDeliveryFee(subtotal = getSubtotal()) {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

function getCartCount() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function renderCategories() {
  $("#category-list").innerHTML = categories.map((category) => `
    <button
      class="category-card${selectedCategory === category.id ? " is-active" : ""}"
      type="button"
      data-category="${category.id}"
      style="--cat-bg:${category.bg}"
      aria-pressed="${selectedCategory === category.id}"
    >
      <span class="category-card__text"><strong>${category.label}</strong><small>${category.count}</small></span>
      <span class="category-card__art" aria-hidden="true">${category.emoji}</span>
      <span class="category-card__arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  const filtered = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesQuery = !query ||
      product.name.toLocaleLowerCase("tr-TR").includes(query) ||
      product.category.toLocaleLowerCase("tr-TR").includes(query);
    return matchesCategory && matchesQuery;
  });

  $("#products-title").innerHTML = selectedCategory
    ? `${selectedCategory} <span>güzellikleri.</span>`
    : query ? `Arama <span>sonuçların.</span>` : `Şengün'den <span>paylaşımlar.</span>`;
  $("#results-label").textContent = selectedCategory || (query ? `${filtered.length} ürün bulundu` : "Instagram fiyat görselleri");
  $("#no-results").hidden = filtered.length !== 0;
  productGrid.innerHTML = filtered.map((product) => {
    const quantity = cart[product.id] || 0;
    return `
      <article class="product-card">
        <div class="product-card__visual${product.image ? " has-image" : ""}" style="--product-bg:${product.bg}">
          ${product.image ? `<img class="product-card__image" src="${product.image}" alt="${product.name} için Şengün Süpermarket Instagram paylaşımı (${product.sourceDate})" loading="lazy" />` : ""}
          ${product.tag ? `<span class="product-card__tag">${product.tag}</span>` : ""}
          ${product.image ? "" : `<span class="product-card__emoji" aria-hidden="true">${product.emoji}</span>`}
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${product.category}</span>
          <h3 class="product-card__name">${product.name}</h3>
          <span class="product-card__unit">${product.unit}</span>
          <div class="product-card__bottom">
            <span class="product-card__price">${formatPrice(product.price)} <small>${product.unit.startsWith("Birim") ? "görsel fiyatı" : `/ ${product.unit.split(" · ")[0]}`}</small></span>
            <button class="add-button${quantity ? " is-added" : ""}" type="button" data-add="${product.id}" aria-label="${product.name} ${quantity ? "sepette, bir tane daha ekle" : "sepete ekle"}">
              ${quantity ? `${quantity} ✓` : "+"}
            </button>
          </div>
          <a class="product-card__source" href="${product.sourceUrl}" target="_blank" rel="noopener noreferrer">Instagram paylaşımı · ${product.sourceDate} <span aria-hidden="true">↗</span></a>
        </div>
      </article>
    `;
  }).join("");
}

function renderCart() {
  const items = getCartItems();
  const subtotal = getSubtotal();
  const fee = getDeliveryFee(subtotal);
  const count = getCartCount();
  const isEmpty = count === 0;

  $$("[data-cart-count]").forEach((element) => { element.textContent = count; });
  $("[data-mobile-cart-count]").textContent = `${count} ürün`;
  $("[data-mobile-cart-total]").textContent = formatPrice(subtotal + fee);
  $("[data-mobile-cart]").hidden = isEmpty || !main.hidden;
  $("#cart-empty").hidden = !isEmpty;
  $("#cart-bottom").hidden = isEmpty;

  $("#cart-items").innerHTML = items.map(({ product, quantity }) => `
    <article class="cart-row">
      <span class="cart-row__visual" style="--product-bg:${product.bg}" aria-hidden="true">${product.image ? `<img src="${product.image}" alt="" loading="lazy" />` : product.emoji}</span>
      <div class="cart-row__info">
        <strong>${product.name}</strong>
        <small>${product.unit} · ${formatPrice(product.price)}</small>
        <div class="cart-row__controls" aria-label="${product.name} miktarı">
          <button class="quantity-button" type="button" data-quantity="${product.id}" data-change="-1" aria-label="${product.name} miktarını azalt">−</button>
          <span class="cart-row__quantity">${quantity}</span>
          <button class="quantity-button" type="button" data-quantity="${product.id}" data-change="1" aria-label="${product.name} miktarını artır">+</button>
        </div>
      </div>
      <strong class="cart-row__price">${formatPrice(product.price * quantity)}</strong>
    </article>
  `).join("");

  $("#cart-subtotal").textContent = formatPrice(subtotal);
  $("#cart-delivery").textContent = fee ? formatPrice(fee) : "Ücretsiz";
  $("#cart-total").textContent = formatPrice(subtotal + fee);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  $("#free-delivery-note").textContent = isEmpty
    ? ""
    : remaining
      ? `${formatPrice(remaining)} daha ekle, teslimat ücretsiz olsun.`
      : "Harika! Teslimat ücretin bizden.";
  $("#checkout-button").disabled = isEmpty;
  renderProducts();
}

function renderCheckoutSummary() {
  const items = getCartItems();
  const subtotal = getSubtotal();
  const fee = getDeliveryFee(subtotal);
  $("#checkout-items").innerHTML = items.map(({ product, quantity }) => `
    <div class="checkout-summary__row">
      <span class="checkout-summary__emoji" style="--product-bg:${product.bg}" aria-hidden="true">${product.image ? `<img src="${product.image}" alt="" loading="lazy" />` : product.emoji}</span>
      <span><strong>${product.name}</strong><small>${quantity} × ${formatPrice(product.price)}</small></span>
      <b>${formatPrice(product.price * quantity)}</b>
    </div>
  `).join("");
  $("#checkout-subtotal").textContent = formatPrice(subtotal);
  $("#checkout-delivery").textContent = fee ? formatPrice(fee) : "Ücretsiz";
  $("#checkout-total").textContent = formatPrice(subtotal + fee);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setOverlay(openElement, closeElement) {
  if (closeElement) {
    closeElement.hidden = true;
    if (openElement.hidden) document.body.classList.remove("has-overlay");
    return;
  }
  previousFocus = document.activeElement;
  openElement.hidden = false;
  document.body.classList.add("has-overlay");
  const focusTarget = openElement.querySelector("[role='dialog'] .icon-button, [role='dialog'] input");
  focusTarget?.focus();
}

function openCart() {
  renderCart();
  setOverlay(cartOverlay);
}

function closeCart() {
  setOverlay(cartOverlay, true);
  if (checkoutOverlay.hidden) document.body.classList.remove("has-overlay");
  previousFocus?.focus();
}

function openCheckout() {
  if (!getCartCount()) return;
  renderCheckoutSummary();
  checkoutOverlay.hidden = false;
  cartOverlay.hidden = true;
  document.body.classList.add("has-overlay");
  checkoutOverlay.querySelector("input")?.focus();
}

function closeCheckout() {
  checkoutOverlay.hidden = true;
  if (cartOverlay.hidden) document.body.classList.remove("has-overlay");
  previousFocus?.focus();
}

function changeQuantity(id, amount) {
  const next = (cart[id] || 0) + amount;
  if (next <= 0) delete cart[id];
  else cart[id] = Math.min(next, 99);
  saveCart();
  renderCart();
  if (!checkoutOverlay.hidden) renderCheckoutSummary();
}

function confirmOrder(formData) {
  const items = getCartItems();
  if (!items.length) return;
  const subtotal = getSubtotal();
  const order = {
    number: `SP-${Math.floor(100000 + Math.random() * 900000)}`,
    items: items.map(({ product, quantity }) => ({ name: product.name, quantity, price: product.price })),
    total: subtotal + getDeliveryFee(subtotal),
    address: `${formData.get("addressName")} · ${formData.get("address")}`,
    district: `${formData.get("district")}, ${formData.get("city")}`,
    slot: formData.get("deliverySlot"),
  };
  cart = {};
  saveCart();
  checkoutOverlay.hidden = true;
  document.body.classList.remove("has-overlay");
  main.hidden = true;
  $(".site-header").hidden = true;
  $(".site-footer").hidden = true;
  confirmationPage.hidden = false;
  confirmationPage.innerHTML = `
    <div class="confirmation-head">
      <span class="confirmation-check" aria-hidden="true">✓</span>
      <span class="section-kicker">SİPARİŞİN ALINDI</span>
      <h1 id="confirmation-title" tabindex="-1">Güzel seçim. <em>♡</em></h1>
      <p>Sipariş numaran <strong>${order.number}</strong></p>
    </div>
    <p class="confirmation-warning"><strong>Demo bilgilendirmesi:</strong> Bu sipariş yalnızca örnek olarak oluşturuldu. Ödeme alınmadı ve gerçek bir teslimat planlanmadı.</p>
    <div class="confirmation-details">
      <div><span>Teslimat adresi</span><strong>${escapeHtml(order.address)}<br />${escapeHtml(order.district)}</strong></div>
      <div><span>Teslimat zamanı</span><strong>${escapeHtml(order.slot)}</strong></div>
    </div>
    <div class="confirmation-order">
      <h2>Sipariş özeti</h2>
      ${order.items.map((item) => `<div class="confirmation-order__row"><span>${escapeHtml(item.name)} × ${item.quantity}</span><strong>${formatPrice(item.price * item.quantity)}</strong></div>`).join("")}
      <div class="confirmation-order__total"><span>Toplam</span><span>${formatPrice(order.total)}</span></div>
    </div>
    <div class="status-timeline" aria-label="Demo sipariş durumu">
      <div class="status-step is-current"><i>✓</i><span>Sipariş alındı</span></div>
      <div class="status-step"><i>2</i><span>Hazırlanıyor</span></div>
      <div class="status-step"><i>3</i><span>Yola çıktı</span></div>
    </div>
    <button class="button button--dark confirmation-home" type="button" data-return-home>Alışverişe devam et <span aria-hidden="true">→</span></button>
  `;
  renderCart();
  confirmationPage.scrollIntoView({ behavior: "smooth", block: "start" });
  $("#confirmation-title").focus?.();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function returnHome() {
  confirmationPage.hidden = true;
  confirmationPage.innerHTML = "";
  main.hidden = false;
  $(".site-header").hidden = false;
  $(".site-footer").hidden = false;
  renderCart();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("#category-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = selectedCategory === button.dataset.category ? null : button.dataset.category;
  renderCategories();
  renderProducts();
  $("#urunler").scrollIntoView({ behavior: "smooth", block: "start" });
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  changeQuantity(button.dataset.add, 1);
  showToast(`${products.find((product) => product.id === button.dataset.add).name} sepete eklendi.`);
});

$("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (button) changeQuantity(button.dataset.quantity, Number(button.dataset.change));
});

searchInput.addEventListener("input", renderProducts);
searchInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    searchInput.value = "";
    selectedCategory = null;
    renderCategories();
    renderProducts();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-overlay]")) closeCart();
  if (event.target.closest("[data-close-checkout]")) closeCheckout();
  if (event.target.closest("[data-home-link]")) {
    event.preventDefault();
    returnHome();
  }
  if (event.target.closest("[data-return-home]")) returnHome();
});

$("#checkout-button").addEventListener("click", openCheckout);
$("#back-to-cart").addEventListener("click", () => {
  checkoutOverlay.hidden = true;
  cartOverlay.hidden = false;
  renderCart();
  $("#drawer .icon-button").focus();
});

$("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  confirmOrder(new FormData(event.currentTarget));
  event.currentTarget.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!checkoutOverlay.hidden) closeCheckout();
  else if (!cartOverlay.hidden) closeCart();
});

renderCategories();
renderCart();
