(() => {
  const PRODUCT_STORAGE_KEY = "sengun-demo-staff-products-v1";
  const ORDER_STORAGE_KEY = "sengun-demo-staff-orders-v1";
  const DELIVERY_FEE = 29.9;
  const FREE_DELIVERY_THRESHOLD = 500;
  const { categories, products: defaultProducts } = window.SengunCatalog;
  const transitions = {
    admin: {
      new: ["accepted", "rejected"],
      accepted: ["cancelled"],
      preparing: ["cancelled"],
      ready_for_delivery: ["cancelled"],
      out_for_delivery: [],
      rejected: [],
      delivered: [],
      cancelled: [],
    },
    rider: {
      accepted: ["preparing"],
      preparing: ["ready_for_delivery"],
      ready_for_delivery: ["out_for_delivery"],
      out_for_delivery: ["delivered"],
    },
  };
  const statusKeys = {
    new: "orderStatusNew",
    accepted: "orderStatusAccepted",
    rejected: "orderStatusRejected",
    preparing: "orderStatusPreparing",
    ready_for_delivery: "orderStatusReady",
    out_for_delivery: "orderStatusOut",
    delivered: "orderStatusDelivered",
    cancelled: "orderStatusCancelled",
  };
  const actionKeys = {
    accepted: "orderNextAccepted",
    rejected: "orderReject",
    preparing: "orderNextPreparing",
    ready_for_delivery: "orderNextReady",
    out_for_delivery: "orderNextOut",
    delivered: "orderNextDelivered",
    cancelled: "orderStatusCancelled",
  };
  const messages = {
    tr: {
      language: "Dil",
      adminTitle: "Admin paneli",
      riderTitle: "Teslimat paneli",
      adminSubtitle: "Siparişleri ve ürün kataloğunu yönetin.",
      riderSubtitle: "Hazırlanan ve teslimata çıkan siparişleri yönetin.",
      demoWarning: "Yerel tarayıcı demosu · Güvenli giriş değildir · Değişiklikler bu cihazda saklanır.",
      store: "Mağazaya dön",
      deliveryRole: "Teslimat görevlisi",
      adminRole: "Admin",
      ordersEyebrow: "SİPARİŞ AKIŞI",
      orders: "Siparişler",
      catalogEyebrow: "ÜRÜN VE FİYATLAR",
      catalog: "Mağaza kataloğu",
      resetCatalog: "Örnek kataloğu sıfırla",
      catalogNotice: "Değişiklikler yalnızca bu tarayıcıdaki vitrine uygulanır. Gerçek sipariş fiyatları sunucu kataloğundan alınır.",
      addProductTitle: "Ürün ekle",
      productNameTr: "Ürün adı (Türkçe)",
      productNameEn: "Ürün adı (İngilizce)",
      productPrice: "Fiyat (₺)",
      productCategory: "Kategori",
      productUnitTr: "Birim (Türkçe)",
      productUnitEn: "Birim (İngilizce)",
      productImage: "Örnek görsel",
      addProduct: "Ürünü ekle",
      saveProduct: "Değişiklikleri kaydet",
      productActive: "Vitrinde göster",
      productDemoOnly: "Yerel demo ürünü; gerçek siparişte kullanılamaz",
      emptyOrders: "Bu rolde görüntülenecek sipariş yok.",
      orderCount: "{count} sipariş",
      totalOrders: "Toplam sipariş",
      needsAcceptance: "Mağaza onayı bekliyor",
      inDelivery: "Teslimat aşamasında",
      activeProducts: "Aktif ürün",
      activeOrders: "Aktif sipariş",
      preparingOrders: "Hazırlanıyor",
      onTheWay: "Teslimata çıktı",
      orderStatusNew: "Yeni",
      orderStatusAccepted: "Kabul edildi",
      orderStatusRejected: "Reddedildi",
      orderStatusPreparing: "Hazırlanıyor",
      orderStatusReady: "Teslimata hazır",
      orderStatusOut: "Yolda",
      orderStatusDelivered: "Teslim edildi",
      orderStatusCancelled: "İptal edildi",
      orderNextAccepted: "Siparişi kabul et",
      orderNextPreparing: "Hazırlamaya başla",
      orderNextReady: "Teslimata hazır",
      orderNextOut: "Teslim al ve yola çık",
      orderNextDelivered: "Teslim edildi işaretle",
      orderReject: "Reddet",
      customer: "Müşteri",
      address: "Teslimat adresi",
      openMapLocation: "Harita konumunu aç",
      items: "Ürünler",
      total: "Tahmini toplam",
      sampleOrder: "Örnek sipariş",
      productAdded: "Ürün yerel demo kataloğuna eklendi.",
      productSaved: "Ürün yerel demo kataloğunda güncellendi.",
      catalogReset: "Yerel katalog değişiklikleri sıfırlandı.",
      orderSaved: "Sipariş durumu yerel demoda güncellendi.",
      storageError: "Değişiklik kaydedilemedi. Tarayıcı depolama alanını kontrol et.",
    },
    en: {
      language: "Language",
      adminTitle: "Admin panel",
      riderTitle: "Delivery panel",
      adminSubtitle: "Manage orders and the product catalog.",
      riderSubtitle: "Manage orders being prepared and delivered.",
      demoWarning: "Local browser demo · Not secure authentication · Changes stay on this device.",
      store: "Back to store",
      deliveryRole: "Delivery rider",
      adminRole: "Admin",
      ordersEyebrow: "ORDER WORKFLOW",
      orders: "Orders",
      catalogEyebrow: "PRODUCTS AND PRICES",
      catalog: "Store catalog",
      resetCatalog: "Reset sample catalog",
      catalogNotice: "Changes affect only this browser's storefront demo. Real order prices come from the server catalog.",
      addProductTitle: "Add product",
      productNameTr: "Product name (Turkish)",
      productNameEn: "Product name (English)",
      productPrice: "Price (₺)",
      productCategory: "Category",
      productUnitTr: "Unit (Turkish)",
      productUnitEn: "Unit (English)",
      productImage: "Sample image",
      addProduct: "Add product",
      saveProduct: "Save changes",
      productActive: "Show in storefront",
      productDemoOnly: "Local demo product; cannot be used in real checkout",
      emptyOrders: "No orders to show for this role.",
      orderCount: "{count} orders",
      totalOrders: "Total orders",
      needsAcceptance: "Awaiting store approval",
      inDelivery: "In delivery",
      activeProducts: "Active products",
      activeOrders: "Active orders",
      preparingOrders: "Preparing",
      onTheWay: "Out for delivery",
      orderStatusNew: "New",
      orderStatusAccepted: "Accepted",
      orderStatusRejected: "Rejected",
      orderStatusPreparing: "Preparing",
      orderStatusReady: "Ready for delivery",
      orderStatusOut: "On the way",
      orderStatusDelivered: "Delivered",
      orderStatusCancelled: "Cancelled",
      orderNextAccepted: "Accept order",
      orderNextPreparing: "Start preparing",
      orderNextReady: "Ready for delivery",
      orderNextOut: "Take order and start delivery",
      orderNextDelivered: "Mark as delivered",
      orderReject: "Reject",
      customer: "Customer",
      address: "Delivery address",
      openMapLocation: "Open map location",
      items: "Items",
      total: "Estimated total",
      sampleOrder: "Sample order",
      productAdded: "Product added to the local demo catalog.",
      productSaved: "Product updated in the local demo catalog.",
      catalogReset: "Local catalog changes were reset.",
      orderSaved: "Order status updated in the local demo.",
      storageError: "Could not save this change. Check browser storage.",
    },
  };

  const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
  let language;
  let toastTimer;

  function getLanguage() {
    try {
      return localStorage.getItem("sengun-demo-language") === "en" ? "en" : "tr";
    } catch (error) {
      console.error("Staff language preference could not be read:", error);
      return "tr";
    }
  }

  function translate(key, values = {}) {
    let value = messages[language][key] || messages.en[key] || key;
    for (const [name, replacement] of Object.entries(values)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
    return value;
  }

  function applyLanguage() {
    language = getLanguage();
    document.documentElement.lang = language;
    document.title = language === "tr" ? "Şengün Süpermarket" : "Şengün Supermarket";
    document.querySelectorAll("[data-staff-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.staffI18n);
    });
    document.querySelectorAll("[data-toggle-language]").forEach((button) => {
      button.textContent = language === "tr" ? "EN" : "TR";
      button.setAttribute("aria-label", language === "tr" ? "Switch to English" : "Türkçeye geç");
    });
    return language;
  }

  function switchLanguage() {
    language = language === "tr" ? "en" : "tr";
    try {
      localStorage.setItem("sengun-demo-language", language);
    } catch (error) {
      console.error("Staff language preference could not be saved:", error);
    }
    applyLanguage();
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

  function formatPrice(value) {
    return money.format(value);
  }

  function copyProduct(product) {
    return {
      ...product,
      name: { ...product.name },
      unit: { ...product.unit },
      active: product.active !== false,
      demoOnly: product.demoOnly === true,
    };
  }

  function isValidProduct(product) {
    return product && typeof product.id === "string" && /^[a-z0-9-]{1,48}$/.test(product.id) &&
      typeof product.name?.tr === "string" && typeof product.name?.en === "string" &&
      typeof product.unit?.tr === "string" && typeof product.unit?.en === "string" &&
      Number.isFinite(product.price) && product.price > 0 && product.price <= 100000 &&
      categories.some((category) => category.id === product.category) &&
      typeof product.image === "string" && /^assets\/products\/[a-z0-9-]+\.jpg$/i.test(product.image);
  }

  function loadProducts() {
    const defaults = defaultProducts.map(copyProduct);
    try {
      const stored = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || "null");
      if (!Array.isArray(stored)) return defaults;
      const defaultIds = new Set(defaults.map((product) => product.id));
      const byId = new Map(stored.filter(isValidProduct).map((product) => [product.id, product]));
      const editedDefaults = defaults.map((product) => {
        const saved = byId.get(product.id);
        if (!saved) return product;
        return {
          ...product,
          name: { tr: saved.name.tr.slice(0, 80), en: saved.name.en.slice(0, 80) },
          unit: { tr: saved.unit.tr.slice(0, 40), en: saved.unit.en.slice(0, 40) },
          price: Math.round(saved.price * 100) / 100,
          category: saved.category,
          image: saved.image,
          active: saved.active !== false,
          demoOnly: saved.demoOnly === true,
        };
      });
      const additions = stored
        .filter((product) => isValidProduct(product) && !defaultIds.has(product.id))
        .map((product) => ({
          ...copyProduct(product),
          id: product.id.slice(0, 48),
          name: { tr: product.name.tr.slice(0, 80), en: product.name.en.slice(0, 80) },
          unit: { tr: product.unit.tr.slice(0, 40), en: product.unit.en.slice(0, 40) },
          price: Math.round(product.price * 100) / 100,
          demoOnly: true,
        }));
      return [...editedDefaults, ...additions];
    } catch (error) {
      console.error("Staff demo catalog could not be read:", error);
      return defaults;
    }
  }

  function saveProducts(products) {
    try {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
      return true;
    } catch (error) {
      console.error("Staff demo catalog could not be saved:", error);
      return false;
    }
  }

  function sampleOrders() {
    const now = Date.now();
    const samples = [
      { id: "SG-DEMO-1042", status: "new", name: "Demo Müşteri", phone: "+90 555 000 0001", address: "Ev · Moda, Kadıköy, İstanbul · Örnek Sokak 1", age: 12, items: [["sultani-uzum", 2], ["duru-bulgur", 1]] },
      { id: "SG-DEMO-1041", status: "preparing", name: "Demo Müşteri", phone: "+90 555 000 0002", address: "Ev · Kozyatağı, Kadıköy, İstanbul · Örnek Cadde 2", age: 36, items: [["dana-kiyma", 1]] },
      { id: "SG-DEMO-1040", status: "ready_for_delivery", name: "Demo Müşteri", phone: "+90 555 000 0003", address: "İş · Fenerbahçe, Kadıköy, İstanbul · Örnek Sokak 3", age: 58, items: [["seftali", 2], ["kovil-sabun", 1]] },
    ];
    return samples.map((sample) => {
      const items = sample.items.map(([id, quantity]) => {
        const product = defaultProducts.find((item) => item.id === id);
        return { id, name: product.name.tr, quantity, price: product.price };
      });
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const fee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      return {
        id: sample.id,
        sample: true,
        status: sample.status,
        name: sample.name,
        phone: sample.phone,
        address: sample.address,
        createdAt: new Date(now - sample.age * 60_000).toISOString(),
        items,
        subtotal,
        fee,
        total: subtotal + fee,
      };
    });
  }

  function validOrder(order) {
    const locationValid = !order?.location || (
      Number.isFinite(order.location.latitude) && order.location.latitude >= -90 && order.location.latitude <= 90 &&
      Number.isFinite(order.location.longitude) && order.location.longitude >= -180 && order.location.longitude <= 180 &&
      (order.location.accuracy === undefined ||
        (Number.isFinite(order.location.accuracy) && order.location.accuracy >= 0 && order.location.accuracy <= 100000))
    );
    return order && locationValid && typeof order.id === "string" && typeof order.name === "string" &&
      typeof order.phone === "string" && typeof order.address === "string" &&
      (order.email === undefined || typeof order.email === "string") &&
      Object.hasOwn(statusKeys, order.status) && typeof order.createdAt === "string" &&
      Number.isFinite(Date.parse(order.createdAt)) && Number.isFinite(order.total) &&
      Array.isArray(order.items) && order.items.every((item) =>
        item && typeof item.name === "string" && Number.isInteger(item.quantity) &&
        item.quantity > 0 && Number.isFinite(item.price)
      );
  }

  function loadOrders() {
    try {
      const stored = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null");
      if (Array.isArray(stored)) return stored.filter(validOrder).slice(0, 100);
      const seeded = sampleOrders();
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    } catch (error) {
      console.error("Staff demo orders could not be read:", error);
      return sampleOrders();
    }
  }

  function saveOrders(orders) {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders.slice(0, 100)));
      return true;
    } catch (error) {
      console.error("Staff demo orders could not be saved:", error);
      return false;
    }
  }

  function addOrder(order) {
    const orders = loadOrders();
    return saveOrders([order, ...orders.filter((item) => item.id !== order.id)]);
  }

  function getTransitions(role, status) {
    return transitions[role]?.[status] || [];
  }

  function updateOrderStatus(orderId, status, role) {
    const orders = loadOrders();
    const order = orders.find((item) => item.id === orderId);
    if (!order || !getTransitions(role, order.status).includes(status)) return false;
    order.status = status;
    return saveOrders(orders);
  }

  function renderOrderCard(order, role) {
    const actions = getTransitions(role, order.status).map((status) => {
      const secondary = status === "rejected" || status === "cancelled";
      return `<button class="button ${secondary ? "button--outline" : "button--primary"}" type="button" data-order-status="${status}" data-order-id="${escapeHtml(order.id)}">${escapeHtml(translate(actionKeys[status]))}</button>`;
    }).join("");
    const dateLocale = language === "tr" ? "tr-TR" : "en-US";
    const createdAt = new Intl.DateTimeFormat(dateLocale, { dateStyle: "short", timeStyle: "short" })
      .format(new Date(order.createdAt));
    const items = order.items.map((item) =>
      `<li><span>${escapeHtml(item.name)} × ${item.quantity}</span><strong>${formatPrice(item.price * item.quantity)}</strong></li>`
    ).join("");
    const locationLink = order.location
      ? `<a class="address-map-link" href="https://maps.google.com/?q=${order.location.latitude},${order.location.longitude}" target="_blank" rel="noopener noreferrer">${escapeHtml(translate("openMapLocation"))}</a>`
      : "";

    return `
      <article class="staff-order-card">
        <div class="staff-order-card__top">
          <div><h3>${escapeHtml(order.id)} ${order.sample ? `<small>· ${escapeHtml(translate("sampleOrder"))}</small>` : ""}</h3><small>${escapeHtml(createdAt)}</small></div>
          <span class="staff-order-status" data-status="${escapeHtml(order.status)}">${escapeHtml(translate(statusKeys[order.status]))}</span>
        </div>
        <p class="staff-order-card__address"><strong>${escapeHtml(translate("customer"))}:</strong> ${escapeHtml(order.name)} · ${escapeHtml(order.phone)}${order.email ? ` · ${escapeHtml(order.email)}` : ""}<br><strong>${escapeHtml(translate("address"))}:</strong> ${escapeHtml(order.address)}${locationLink ? `<br>${locationLink}` : ""}</p>
        <ul class="staff-order-card__items" aria-label="${escapeHtml(translate("items"))}">${items}</ul>
        <div class="staff-order-card__total"><span>${escapeHtml(translate("total"))}</span><span>${formatPrice(order.total)}</span></div>
        ${actions ? `<div class="staff-order-card__actions">${actions}</div>` : ""}
      </article>
    `;
  }

  function showToast(message) {
    const toast = document.querySelector("#staff-toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function optionsForCategories(selected = "") {
    return categories.map((category) =>
      `<option value="${category.id}" ${selected === category.id ? "selected" : ""}>${escapeHtml(category[language])}</option>`
    ).join("");
  }

  function optionsForImages(selected = "") {
    return [...new Set(defaultProducts.map((product) => product.image))].map((image) => {
      const product = defaultProducts.find((item) => item.image === image);
      return `<option value="${escapeHtml(image)}" ${selected === image ? "selected" : ""}>${escapeHtml(product.name[language])}</option>`;
    }).join("");
  }

  function makeProductId(name, products) {
    const base = name.toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "urun";
    let id = base;
    let suffix = 2;
    while (products.some((product) => product.id === id)) id = `${base}-${suffix++}`;
    return id;
  }

  window.SengunStaff = {
    storageKeys: { products: PRODUCT_STORAGE_KEY, orders: ORDER_STORAGE_KEY },
    applyLanguage,
    switchLanguage,
    translate,
    escapeHtml,
    formatPrice,
    copyProduct,
    isValidProduct,
    loadProducts,
    saveProducts,
    defaultProducts,
    categories,
    optionsForCategories,
    optionsForImages,
    makeProductId,
    loadOrders,
    saveOrders,
    addOrder,
    getTransitions,
    updateOrderStatus,
    renderOrderCard,
    showToast,
    get language() {
      return language;
    },
    getStatusKeys() {
      return { ...statusKeys };
    },
  };
})();
