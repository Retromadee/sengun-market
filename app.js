const PROFILE_STORAGE_KEY = "sengun-demo-profile-v1";
const CART_STORAGE_KEY = "sengun-demo-cart-v2";
const PRODUCTS_STORAGE_KEY = "sengun-demo-staff-products-v1";
const DELIVERY_FEE = 29.9;
const FREE_DELIVERY_THRESHOLD = 500;

const translations = {
  tr: {
    welcomeEyebrow: "ŞENGÜN SÜPERMARKET",
    welcomeTitle: "Alışverişe<br>başlayalım.",
    welcomeIntro: "Başlamak için telefonunu, e-posta adresini ve ev adresini ekle.",
    googleDemoButton: "Google ile devam et",
    demoBadge: "DEMO",
    googleDemoHint: "Google ile giriş bu demoda henüz etkin değil. İstersen telefon, e-posta ve adresinle devam et.",
    orEnterDetails: "veya bilgilerini gir",
    fullName: "Ad soyad",
    phoneNumber: "Telefon numarası",
    emailAddress: "E-posta adresi",
    emailPlaceholder: "ornek@eposta.com",
    homeAddress: "Ev adresin",
    homeAddressPlaceholder: "Açık adresini yaz",
    homeAddressLabel: "Ev",
    otherAddressLabel: "Adres {count}",
    firstDeliveryAddress: "İlk teslimat adresin",
    addressLabel: "Adres adı",
    city: "İl",
    district: "İlçe",
    neighborhood: "Mahalle",
    streetAddress: "Sokak, bina ve daire",
    addressNote: "Adres tarifi (isteğe bağlı)",
    namePlaceholder: "Adın ve soyadın",
    phonePlaceholder: "+90 5xx xxx xx xx",
    addressLabelPlaceholder: "Ev, İş...",
    cityPlaceholder: "İl",
    districtPlaceholder: "İlçe",
    neighborhoodPlaceholder: "Mahalle",
    streetPlaceholder: "Cadde/sokak, bina no, daire no",
    addressNotePlaceholder: "Daireyi bulmaya yardımcı olacak bilgi",
    localStorageNote: "Bilgilerin bu cihazda saklanır; yalnızca sipariş verdiğinde mağazaya iletilir.",
    useCurrentLocation: "Canlı konumumu kullan",
    gettingLocation: "Konum alınıyor…",
    locationCaptured: "Konum alındı. Bu pin sipariş verdiğinde mağazaya iletilir.",
    locationPermissionDenied: "Konum izni verilmedi. Tarayıcı ayarlarından izin ver veya adresi elle gir.",
    locationUnavailable: "Konum alınamadı. GPS'i açıp tekrar dene veya adresi elle gir.",
    locationTimeout: "Konum isteği zaman aşımına uğradı. Tekrar dene veya adresi elle gir.",
    locationUnsupported: "Bu tarayıcı konum desteği sunmuyor. Adresi elle gir.",
    currentLocation: "Canlı konum",
    openMapLocation: "Harita konumunu aç",
    locationAccuracy: "Konum doğruluğu yaklaşık ±{meters} m",
    staffDemoTitle: "Personel demosu",
    staffShortcuts: "Personel bağlantıları",
    staffDemoWarning: "Yalnızca bu tarayıcıda çalışan örnek verili demo. Güvenli giriş değildir.",
    staffDemoBadge: "YEREL DEMO · GÜVENLİ DEĞİL",
    staffExit: "Mağazaya dön",
    staffEyebrow: "PERSONEL PANELİ",
    staffTitle: "Sipariş ve mağaza yönetimi",
    adminRole: "Admin",
    riderRole: "Teslimat görevlisi",
    staffOrdersEyebrow: "SİPARİŞ AKIŞI",
    staffOrdersTitle: "Siparişler",
    staffCatalogEyebrow: "ÜRÜN VE FİYATLAR",
    staffCatalogTitle: "Mağaza kataloğu",
    resetCatalog: "Örnek kataloğu sıfırla",
    staffCatalogNotice: "Değişiklikler yalnızca bu tarayıcıdaki vitrin demosuna uygulanır. Gerçek sipariş fiyatları sunucu kataloğundan alınır.",
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
    staffOrderCount: "{count} sipariş",
    staffTotalOrders: "Toplam sipariş",
    staffNeedsAcceptance: "Mağaza onayı bekliyor",
    staffInDelivery: "Teslimat aşamasında",
    staffProducts: "Aktif ürün",
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
    staffCustomer: "Müşteri",
    staffAddress: "Teslimat adresi",
    staffOrderItems: "Ürünler",
    sampleOrder: "Örnek sipariş",
    productAdded: "Ürün yerel demo kataloğuna eklendi.",
    productSaved: "Ürün yerel demo kataloğunda güncellendi.",
    catalogResetDone: "Yerel katalog değişiklikleri sıfırlandı.",
    orderStatusSaved: "Sipariş durumu yerel demoda güncellendi.",
    staffStorageError: "Demo değişikliği kaydedilemedi. Tarayıcı depolama alanını kontrol et.",
    staffOrderStorageError: "Sipariş WhatsApp'a gönderildi ancak bu tarayıcıdaki demo sipariş listesine kaydedilemedi.",
    demoCatalogCheckoutBlocked: "Bu yerel katalog değişikliği gerçek siparişte kullanılamaz. Sunucudaki katalog ayrıca güncellenmelidir.",
    saveAndShop: "Bilgilerimi kaydet ve alışverişe başla",
    deliverTo: "Teslimat adresi",
    searchProducts: "Ürün ara",
    searchPlaceholder: "Ürün veya marka ara",
    cart: "Sepet",
    account: "Hesabım",
    allProducts: "Tüm ürünler",
    offers: "Fırsatlar",
    categories: "Kategoriler",
    demoPrices: "Görsellerdeki fiyatlar güncel olmayabilir",
    heroEyebrow: "ŞENGÜN SÜPERMARKET",
    heroTitle: "Ürünlere bugün<br>göz at.",
    heroIntro: "Ürünlere göz at, sepetini oluştur ve siparişini mağazaya ilet.",
    startShopping: "Alışverişe başla",
    localMarket: "Alışverişin birkaç dokunuş uzağında.",
    marketSelection: "Şengün Süpermarket",
    shopOnline: "Online ürün vitrini",
    browseByCategory: "KATEGORİYE GÖRE GÖZ AT",
    viewAll: "Tümünü gör",
    storePromotions: "ŞENGÜN SÜPERMARKET",
    promoTitle: "Ürünleri keşfet,<br>fiyatı mağazaya sor.",
    promoCopy: "Listelenen fiyatlar tanıtım amaçlıdır. Siparişte mağazadan teyit edilir.",
    discoverProducts: "Ürünleri keşfet",
    storeCatalog: "ŞENGÜN SÜPERMARKET",
    productsTitle: "Marketin öne çıkanları.",
    priceDisclaimer: "Fiyatlar tanıtım görsellerinden alınmıştır; güncel fiyat ve stok değişebilir. Sipariş sırasında mağazadan teyit edilir.",
    noResults: "Bu aramada ürün bulunamadı.",
    promiseOneTitle: "Fiyat mağazada teyit edilir",
    promiseOneCopy: "Siparişiniz WhatsApp'tan iletilir.",
    promiseTwoTitle: "Adreslerin her zaman yanında",
    promiseTwoCopy: "Hesabında en fazla 5 adres sakla.",
    promiseThreeTitle: "Kolay ve güvenli",
    promiseThreeCopy: "Ödeme bilgisi bu demo uygulamada alınmaz.",
    footerNote: "Şengün Süpermarket için hazırlanmış online sipariş demosu.",
    demoOnly: "Demo · gerçek ödeme alınmaz",
    viewCart: "Sepeti gör",
    accountDetails: "HESAP BİLGİLERİ",
    yourAccount: "Hesabın ve adreslerin",
    saveProfile: "Bilgileri kaydet",
    savedAddresses: "Kayıtlı adresler",
    addAddress: "Yeni adres ekle",
    cancel: "Vazgeç",
    saveAddress: "Adresi kaydet",
    orderSummary: "SİPARİŞ ÖZETİ",
    emptyCart: "Sepetin şu an boş",
    emptyCartCopy: "Ürünlere göz atıp alışverişe başlayabilirsin.",
    subtotal: "Ara toplam",
    deliveryFee: "Teslimat ücreti",
    total: "Toplam",
    continueOrder: "Siparişe devam et",
    whatsappSendNote: "Siparişini verdiğinde mağazaya otomatik olarak iletilir.",
    checkout: "SİPARİŞİ TAMAMLA",
    deliveryDetails: "Teslimat bilgileri",
    checkoutIntro: "Siparişini onayladığında sipariş ve teslimat bilgilerin mağazaya WhatsApp üzerinden otomatik iletilir.",
    deliverToAddress: "Teslimat adresi",
    manageAddresses: "Adresleri yönet",
    deliveryTime: "Teslimat zamanı tercihi",
    asap: "Mağazayla teyitleş",
    contactForTime: "Teslimat saatini konuşalım",
    sendOrder: "Siparişi ver",
    sendingOrder: "Sipariş gönderiliyor...",
    whatsappConsentNote: "Siparişini verdiğinde iletişim ve teslimat bilgilerin mağazaya WhatsApp üzerinden gönderilir. Fiyat, stok ve teslimat mağaza tarafından teyit edilir.",
    categoryCount: "{count} ürün",
    searchResults: "{count} ürün bulundu",
    addToCart: "Sepete ekle",
    addAnother: "Bir tane daha ekle",
    itemAdded: "{name} sepete eklendi.",
    cartStoredError: "Sepetin bu oturumda saklanamadı.",
    profileStoredError: "Bilgilerin kaydedilemedi. Tarayıcı depolama alanını kontrol et.",
    addressLimit: "En fazla 5 adres kaydedebilirsin.",
    profileSaved: "İletişim bilgilerin kaydedildi.",
    addressSaved: "Adresin kaydedildi.",
    addressRemoved: "Adres silindi.",
    chooseAddress: "Teslimat için bir adres seç.",
    freeDeliveryRemaining: "{amount} daha ekle, teslimat ücreti kalksın.",
    freeDeliveryReached: "Teslimat ücreti ücretsiz.",
    unitNotListed: "Birim belirtilmemiş",
    displayPrice: "görsel fiyatı",
    perUnit: "/ {unit}",
    orderRequestTitle: "Şengün Süpermarket siparişi",
    orderNumber: "Sipariş numarası",
    customer: "Müşteri",
    phone: "Telefon",
    deliveryAddress: "Teslimat adresi",
    deliveryPreference: "Teslimat tercihi",
    contactSoon: "Mağazayla teyitleş",
    contactForDeliveryTime: "Teslimat saatini konuşalım",
    items: "Ürünler",
    subtotalLabel: "Ara toplam",
    feeLabel: "Tahmini teslimat ücreti",
    totalLabel: "Tahmini toplam",
    orderSent: "Siparişin mağazaya iletildi",
    orderSentIntro: "Sipariş bilgilerin mağazanın WhatsApp hattına gönderildi. Mağaza fiyat, stok ve teslimat bilgilerini seninle teyit edecek.",
    requestPrepared: "Mağazaya iletildi",
    waitingStore: "Mağaza teyidi bekleniyor",
    deliveryToConfirm: "Teslimat teyit edilecek",
    returnToShop: "Alışverişe dön",
    addressSelected: "Seçili adres",
    selected: "Seçili",
    selectAddress: "Teslimat adresi olarak seç",
    removeAddress: "Adresi sil",
    addAddressLimit: "Adres sınırına ulaştın (5/5).",
    profileRequired: "Başlamak için telefonunu, e-posta adresini ve ev adresini kaydet.",
    googleDemoMessage: "Google girişi, Firebase Authentication bağlandığında etkinleştirilecek. Bu demo sürümünde giriş yapılmaz; lütfen formu doldur.",
    noAddresses: "Henüz kayıtlı adres yok.",
    addressSummary: "{label} · {district}, {city}",
    orderErrorConfig: "Sipariş gönderimi henüz yapılandırılmadı. Lütfen daha sonra tekrar dene.",
    orderErrorFailed: "Sipariş WhatsApp'a gönderilemedi. Lütfen tekrar dene.",
    orderErrorInvalid: "Sipariş bilgileri geçersiz. Sepetini ve teslimat adresini kontrol et.",
    orderTooLarge: "Sipariş bilgileri gönderilemeyecek kadar uzun. Adres tarifini kısaltıp tekrar dene.",
    updatedAddressCount: "{count}/5 adres",
    close: "Kapat",
  },
  en: {
    welcomeEyebrow: "ŞENGÜN SUPERMARKET",
    welcomeTitle: "Let's get<br>started.",
    welcomeIntro: "Add your phone number, email, and home address to get started.",
    googleDemoButton: "Continue with Google",
    demoBadge: "DEMO",
    googleDemoHint: "Google sign-in is not enabled in this demo yet. You can continue with your phone, email, and address.",
    orEnterDetails: "or enter your details",
    fullName: "Full name",
    phoneNumber: "Phone number",
    emailAddress: "Email address",
    emailPlaceholder: "you@example.com",
    homeAddress: "Home address",
    homeAddressPlaceholder: "Enter your full address",
    homeAddressLabel: "Home",
    otherAddressLabel: "Address {count}",
    firstDeliveryAddress: "Your first delivery address",
    addressLabel: "Address label",
    city: "City",
    district: "District",
    neighborhood: "Neighborhood",
    streetAddress: "Street, building and apartment",
    addressNote: "Delivery instructions (optional)",
    namePlaceholder: "Your full name",
    phonePlaceholder: "+90 5xx xxx xx xx",
    addressLabelPlaceholder: "Home, Work...",
    cityPlaceholder: "City",
    districtPlaceholder: "District",
    neighborhoodPlaceholder: "Neighborhood",
    streetPlaceholder: "Street, building number, apartment",
    addressNotePlaceholder: "Details to help find your door",
    localStorageNote: "Your details stay on this device and are shared with the store only when you place an order.",
    useCurrentLocation: "Use my live location",
    gettingLocation: "Getting your location…",
    locationCaptured: "Location captured. This pin will be sent to the store with your order.",
    locationPermissionDenied: "Location permission was denied. Allow it in your browser settings or enter the address manually.",
    locationUnavailable: "Could not get your location. Turn on GPS and try again, or enter the address manually.",
    locationTimeout: "The location request timed out. Try again or enter the address manually.",
    locationUnsupported: "This browser does not support location. Enter the address manually.",
    currentLocation: "Current location",
    openMapLocation: "Open map location",
    locationAccuracy: "Location accuracy approximately ±{meters} m",
    staffDemoTitle: "Staff demo",
    staffShortcuts: "Staff shortcuts",
    staffDemoWarning: "Sample-data demo stored only in this browser. This is not secure staff sign-in.",
    staffDemoBadge: "LOCAL DEMO · NOT SECURE",
    staffExit: "Return to shop",
    staffEyebrow: "STAFF PANEL",
    staffTitle: "Store and order management",
    adminRole: "Admin",
    riderRole: "Delivery rider",
    staffOrdersEyebrow: "ORDER WORKFLOW",
    staffOrdersTitle: "Orders",
    staffCatalogEyebrow: "PRODUCTS AND PRICES",
    staffCatalogTitle: "Store catalog",
    resetCatalog: "Reset sample catalog",
    staffCatalogNotice: "Changes affect only this browser's storefront demo. Real order prices come from the server catalog.",
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
    productDemoOnly: "Local demo product; unavailable for real checkout",
    emptyOrders: "There are no orders to show for this role.",
    staffOrderCount: "{count} orders",
    staffTotalOrders: "Total orders",
    staffNeedsAcceptance: "Awaiting store review",
    staffInDelivery: "In delivery",
    staffProducts: "Active products",
    orderStatusNew: "New",
    orderStatusAccepted: "Accepted",
    orderStatusRejected: "Rejected",
    orderStatusPreparing: "Preparing",
    orderStatusReady: "Ready for delivery",
    orderStatusOut: "Out for delivery",
    orderStatusDelivered: "Delivered",
    orderStatusCancelled: "Cancelled",
    orderNextAccepted: "Accept order",
    orderNextPreparing: "Start preparing",
    orderNextReady: "Ready for delivery",
    orderNextOut: "Pick up and start delivery",
    orderNextDelivered: "Mark delivered",
    orderReject: "Reject",
    staffCustomer: "Customer",
    staffAddress: "Delivery address",
    staffOrderItems: "Items",
    sampleOrder: "Sample order",
    productAdded: "Product added to the local demo catalog.",
    productSaved: "Product updated in the local demo catalog.",
    catalogResetDone: "Local catalog changes have been reset.",
    orderStatusSaved: "Order status updated in the local demo.",
    staffStorageError: "Could not save the demo change. Check browser storage.",
    staffOrderStorageError: "The order was sent to WhatsApp but could not be saved to this browser's demo order list.",
    demoCatalogCheckoutBlocked: "This local catalog change cannot be used for a real order. The server catalog must be updated separately.",
    saveAndShop: "Save details and start shopping",
    deliverTo: "Deliver to",
    searchProducts: "Search products",
    searchPlaceholder: "Search products or brands",
    cart: "Cart",
    account: "My account",
    allProducts: "All products",
    offers: "Offers",
    categories: "Categories",
    demoPrices: "Prices shown may not be current",
    heroEyebrow: "ŞENGÜN SUPERMARKET",
    heroTitle: "Browse products<br>today.",
    heroIntro: "Browse the products, fill your cart, and send your order to the store.",
    startShopping: "Start shopping",
    localMarket: "Your groceries are just a few clicks away.",
    marketSelection: "Şengün Supermarket",
    shopOnline: "Online grocery catalog",
    browseByCategory: "SHOP BY CATEGORY",
    viewAll: "View all",
    storePromotions: "ŞENGÜN SUPERMARKET",
    promoTitle: "Browse the products.<br>Confirm today's price.",
    promoCopy: "Displayed prices are for reference and will be confirmed by the store when you order.",
    discoverProducts: "Browse products",
    storeCatalog: "ŞENGÜN SUPERMARKET",
    productsTitle: "Popular at your local market.",
    priceDisclaimer: "Prices are taken from promotional images. Current prices and availability may differ and will be confirmed by the store.",
    noResults: "No products found. Try another search.",
    promiseOneTitle: "Prices confirmed by the store",
    promiseOneCopy: "Order requests are sent through WhatsApp.",
    promiseTwoTitle: "Your addresses, ready when needed",
    promiseTwoCopy: "Save up to five addresses in your account.",
    promiseThreeTitle: "Simple and secure",
    promiseThreeCopy: "This demo does not collect payment details.",
    footerNote: "An online ordering demo for Şengün Supermarket.",
    demoOnly: "Demo · no real payments",
    viewCart: "View cart",
    accountDetails: "ACCOUNT DETAILS",
    yourAccount: "Your account and addresses",
    saveProfile: "Save details",
    savedAddresses: "Saved addresses",
    addAddress: "Add a new address",
    cancel: "Cancel",
    saveAddress: "Save address",
    orderSummary: "ORDER SUMMARY",
    emptyCart: "Your cart is empty",
    emptyCartCopy: "Browse the catalog and add a few things.",
    subtotal: "Subtotal",
    deliveryFee: "Delivery fee",
    total: "Total",
    continueOrder: "Continue to checkout",
    whatsappSendNote: "Your order is sent to the store automatically when you place it.",
    checkout: "CHECKOUT",
    deliveryDetails: "Delivery details",
    checkoutIntro: "When you place your order, its details are sent automatically to the store through WhatsApp.",
    deliverToAddress: "Delivery address",
    manageAddresses: "Manage addresses",
    deliveryTime: "Delivery preference",
    asap: "Confirm timing with store",
    contactForTime: "Ask store to arrange a time",
    sendOrder: "Place order",
    sendingOrder: "Sending order...",
    whatsappConsentNote: "Your contact and delivery details will be sent to the store through WhatsApp. The store will confirm prices, availability, and delivery.",
    categoryCount: "{count} products",
    searchResults: "{count} results",
    addToCart: "Add to cart",
    addAnother: "Add one more",
    itemAdded: "{name} added to cart.",
    cartStoredError: "Your cart could not be saved in this browser.",
    profileStoredError: "Your details could not be saved. Check browser storage settings.",
    addressLimit: "You can save up to five addresses.",
    profileSaved: "Your contact details have been saved.",
    addressSaved: "Your address has been saved.",
    addressRemoved: "Address removed.",
    chooseAddress: "Choose a delivery address.",
    freeDeliveryRemaining: "Add {amount} more for free delivery.",
    freeDeliveryReached: "Delivery fee is waived.",
    unitNotListed: "Unit not specified",
    displayPrice: "displayed price",
    perUnit: "/ {unit}",
    orderRequestTitle: "Şengün Supermarket order",
    orderNumber: "Order number",
    customer: "Customer",
    phone: "Phone",
    deliveryAddress: "Delivery address",
    deliveryPreference: "Delivery preference",
    contactSoon: "Confirm timing with store",
    contactForDeliveryTime: "Arrange a delivery time",
    items: "Items",
    subtotalLabel: "Subtotal",
    feeLabel: "Estimated delivery fee",
    totalLabel: "Estimated total",
    orderSent: "Your order was sent to the store",
    orderSentIntro: "Your order details were sent to the store's WhatsApp. The store will confirm prices, availability, and delivery with you.",
    requestPrepared: "Sent to store",
    waitingStore: "Awaiting store confirmation",
    deliveryToConfirm: "Delivery to be confirmed",
    returnToShop: "Return to shopping",
    addressSelected: "Selected address",
    selected: "Selected",
    selectAddress: "Set as delivery address",
    removeAddress: "Remove address",
    addAddressLimit: "Address limit reached (5/5).",
    profileRequired: "Save your phone, email, and home address to get started.",
    googleDemoMessage: "Google sign-in will be enabled when Firebase Authentication is connected. This demo does not sign you in; please fill in the form.",
    noAddresses: "No saved addresses yet.",
    addressSummary: "{label} · {district}, {city}",
    orderErrorConfig: "Order sending is not configured yet. Please try again later.",
    orderErrorFailed: "The order could not be sent to WhatsApp. Please try again.",
    orderErrorInvalid: "The order details are invalid. Check your cart and delivery address.",
    orderTooLarge: "The order details are too long to send. Shorten the delivery instructions and try again.",
    updatedAddressCount: "{count}/5 addresses",
    close: "Close",
  },
};

const { categories, products: defaultProducts } = window.SengunCatalog;

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $("#main-content");
const header = $("#site-header");
const footer = $("#site-footer");
const welcomeScreen = $("#welcome-screen");
const accountOverlay = $("#account-overlay");
const cartOverlay = $("#cart-overlay");
const checkoutOverlay = $("#checkout-overlay");
const confirmationPage = $("#confirmation-page");
const searchInput = $("#search-input");
const productGrid = $("#product-grid");
const toast = $("#toast");

let language = loadLanguage();
let profile = loadProfile();
let products = loadProducts();
let cart = loadCart();
let selectedCategory = null;
let previousFocus = null;
let accountReturnToCheckout = false;
let lastOrder = null;
let toastTimer;

function t(key, values = {}) {
  let text = translations[language][key] || translations.en[key] || key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function loadLanguage() {
  try {
    return localStorage.getItem("sengun-demo-language") === "en" ? "en" : "tr";
  } catch (error) {
    console.error("Language preference could not be read:", error);
    return "tr";
  }
}

function applyTranslations() {
  document.documentElement.lang = language;
  document.title = language === "tr" ? "Şengün Süpermarket" : "Şengün Supermarket";
  $$("[data-i18n]").forEach((element) => { element.innerHTML = t(element.dataset.i18n); });
  $$("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $$("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  $$("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  $$("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  $$("[data-toggle-language]").forEach((button) => {
    button.textContent = language === "tr" ? "EN" : "TR";
    button.setAttribute("aria-label", language === "tr" ? "Switch to English" : "Türkçeye geç");
  });
  renderCategories();
  renderProducts();
  renderCart();
  renderAccount();
  if (!checkoutOverlay.hidden) renderCheckout();
  if (lastOrder && !confirmationPage.hidden) renderConfirmation(lastOrder);
}

function saveLanguage() {
  try {
    localStorage.setItem("sengun-demo-language", language);
  } catch (error) {
    console.error("Language preference could not be saved:", error);
  }
}

function validCoordinates(location) {
  return location && typeof location === "object" && !Array.isArray(location) &&
    Number.isFinite(location.latitude) && location.latitude >= -90 && location.latitude <= 90 &&
    Number.isFinite(location.longitude) && location.longitude >= -180 && location.longitude <= 180 &&
    (location.accuracy === undefined ||
      (Number.isFinite(location.accuracy) && location.accuracy >= 0 && location.accuracy <= 100000));
}

function mapLocationUrl(location) {
  return validCoordinates(location)
    ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
    : "";
}

function loadProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "null");
    if (!stored || typeof stored.phone !== "string" || !Array.isArray(stored.addresses)) {
      return { name: "", phone: "", email: "", addresses: [], activeAddressId: "" };
    }
    const addresses = stored.addresses.slice(0, 5).filter((address) =>
      address && typeof address.id === "string" && typeof address.label === "string" &&
      typeof address.city === "string" && typeof address.district === "string" &&
      typeof address.neighborhood === "string" && typeof address.street === "string"
    ).map((address) => ({
      ...address,
      location: validCoordinates(address.location) ? {
        latitude: address.location.latitude,
        longitude: address.location.longitude,
        ...(Number.isFinite(address.location.accuracy) ? { accuracy: address.location.accuracy } : {}),
      } : null,
    }));
    const activeAddressId = addresses.some((address) => address.id === stored.activeAddressId)
      ? stored.activeAddressId
      : addresses[0]?.id || "";
    return {
      name: typeof stored.name === "string" ? stored.name.slice(0, 80) : "",
      phone: stored.phone.slice(0, 24),
      email: typeof stored.email === "string" ? stored.email.slice(0, 254) : "",
      addresses,
      activeAddressId,
    };
  } catch (error) {
    console.error("Saved profile could not be read:", error);
    return { name: "", phone: "", email: "", addresses: [], activeAddressId: "" };
  }
}

function saveProfile() {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error("Saved profile could not be written:", error);
    showToast(t("profileStoredError"));
    return false;
  }
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
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_STORAGE_KEY) || "null");
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

function saveProducts() {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error("Staff demo catalog could not be saved:", error);
    showToast(t("staffStorageError"));
    return false;
  }
}

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {};
    return Object.fromEntries(
      Object.entries(stored).filter(([id, quantity]) =>
        products.some((product) => product.id === id) &&
        Number.isInteger(quantity) && quantity > 0 && quantity < 100
      ),
    );
  } catch (error) {
    console.error("Saved cart could not be read:", error);
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Saved cart could not be written:", error);
    showToast(t("cartStoredError"));
  }
}

function formatPrice(value) {
  return money.format(value);
}

function getText(value) {
  return typeof value === "string" ? value : value[language];
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

function getAddress(id = profile.activeAddressId) {
  return profile.addresses.find((address) => address.id === id) || null;
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

function makeAddress(formData) {
  const rawLatitude = String(formData.get("locationLatitude") || "");
  const rawLongitude = String(formData.get("locationLongitude") || "");
  const rawAccuracy = String(formData.get("locationAccuracy") || "");
  const latitude = Number(rawLatitude);
  const longitude = Number(rawLongitude);
  const accuracy = Number(rawAccuracy);
  const location = rawLatitude && rawLongitude && Number.isFinite(latitude) && Number.isFinite(longitude)
    ? { latitude, longitude, ...(rawAccuracy && Number.isFinite(accuracy) && accuracy >= 0 ? { accuracy } : {}) }
    : null;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label: String(formData.get("label") || t(profile.addresses.length ? "otherAddressLabel" : "homeAddressLabel", {
      count: profile.addresses.length + 1,
    })).trim(),
    city: String(formData.get("city") || "").trim(),
    district: String(formData.get("district") || "").trim(),
    neighborhood: String(formData.get("neighborhood") || "").trim(),
    street: String(formData.get("street") || formData.get("homeAddress") || "").trim(),
    note: String(formData.get("note") || "").trim(),
    location: validCoordinates(location) ? location : null,
  };
}

function addressSummary(address) {
  return [
    address.street,
    address.neighborhood,
    address.district,
    address.city,
  ].filter(Boolean).join(", ") || address.label;
}

function renderCategories() {
  $("#category-list").innerHTML = categories.map((category) => {
    const label = category[language];
    const count = products.filter((product) => product.active && product.category === category.id).length;
    return `
      <button class="category-card${selectedCategory === category.id ? " is-active" : ""}"
        type="button" data-category="${category.id}" aria-pressed="${selectedCategory === category.id}">
        <span class="category-card__initial" aria-hidden="true">${escapeHtml(label.slice(0, 1))}</span>
        <span class="category-card__text"><strong>${escapeHtml(label)}</strong><small>${t("categoryCount", { count })}</small></span>
        <span class="category-card__arrow" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase(language === "tr" ? "tr-TR" : "en-US");
  const filtered = products.filter((product) => {
    if (!product.active) return false;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const searchText = `${getText(product.name)} ${getText(categories.find((category) => category.id === product.category)[language])}`
      .toLocaleLowerCase(language === "tr" ? "tr-TR" : "en-US");
    return matchesCategory && (!query || searchText.includes(query));
  });

  $("#products-title").textContent = selectedCategory
    ? categories.find((category) => category.id === selectedCategory)[language]
    : query ? t("searchResults", { count: filtered.length }) : t("productsTitle");
  $("#results-label").textContent = query
    ? t("searchResults", { count: filtered.length })
    : `${filtered.length} ${language === "tr" ? "ürün" : "products"}`;
  $("#no-results").hidden = filtered.length !== 0;
  productGrid.innerHTML = filtered.map((product) => {
    const quantity = cart[product.id] || 0;
    const name = getText(product.name);
    const unit = getText(product.unit);
    return `
      <article class="product-card">
        <div class="product-card__visual" style="--product-bg:${escapeHtml(product.bg)}">
          <img class="product-card__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(name)}" loading="lazy" />
          ${product.tag ? `<span class="product-card__tag">${escapeHtml(getText(product.tag))}</span>` : ""}
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${escapeHtml(categories.find((category) => category.id === product.category)[language])}</span>
          <h3 class="product-card__name">${escapeHtml(name)}</h3>
          <span class="product-card__unit">${escapeHtml(unit)}</span>
          <div class="product-card__bottom">
            <span class="product-card__price">${formatPrice(product.price)} <small>${unit === t("unitNotListed") ? t("displayPrice") : t("perUnit", { unit: escapeHtml(unit.split(" · ")[0]) })}</small></span>
            <button class="add-button${quantity ? " is-added" : ""}" type="button" data-add="${escapeHtml(product.id)}"
              aria-label="${escapeHtml(name)} — ${quantity ? t("addAnother") : t("addToCart")}">
              ${quantity ? `${quantity} ✓` : "+"}
            </button>
          </div>
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
  $("[data-mobile-cart-count]").textContent = `${count} ${language === "tr" ? "ürün" : "items"}`;
  $("[data-mobile-cart-total]").textContent = formatPrice(subtotal + fee);
  $("[data-mobile-cart]").hidden = isEmpty || !profile.phone || !confirmationPage.hidden;
  $("#cart-empty").hidden = !isEmpty;
  $("#cart-bottom").hidden = isEmpty;

  $("#cart-items").innerHTML = items.map(({ product, quantity }) => `
    <article class="cart-row">
      <img class="cart-row__image" src="${product.image}" alt="" loading="lazy" />
      <div class="cart-row__info">
        <strong>${escapeHtml(getText(product.name))}</strong>
        <small>${escapeHtml(getText(product.unit))} · ${formatPrice(product.price)}</small>
        <div class="cart-row__controls">
          <button class="quantity-button" type="button" data-quantity="${product.id}" data-change="-1"
            aria-label="${language === "tr" ? "Azalt" : "Decrease"} ${escapeHtml(getText(product.name))}">−</button>
          <span class="cart-row__quantity">${quantity}</span>
          <button class="quantity-button" type="button" data-quantity="${product.id}" data-change="1"
            aria-label="${language === "tr" ? "Artır" : "Increase"} ${escapeHtml(getText(product.name))}">+</button>
        </div>
      </div>
      <strong class="cart-row__price">${formatPrice(product.price * quantity)}</strong>
    </article>
  `).join("");

  $("#cart-subtotal").textContent = formatPrice(subtotal);
  $("#cart-delivery").textContent = fee ? formatPrice(fee) : (language === "tr" ? "Ücretsiz" : "Free");
  $("#cart-total").textContent = formatPrice(subtotal + fee);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  $("#free-delivery-note").textContent = isEmpty ? "" : remaining
    ? t("freeDeliveryRemaining", { amount: formatPrice(remaining) })
    : t("freeDeliveryReached");
  $("#checkout-button").disabled = isEmpty;
  const activeAddress = getAddress();
  $("#active-address-label").textContent = activeAddress ? addressSummary(activeAddress) : t("noAddresses");
  $("#header-customer-name").textContent = profile.name || profile.email || t("account");
  renderProducts();
}

function renderAccount() {
  const profileForm = $("#profile-form");
  profileForm.elements.phone.value = profile.phone;
  profileForm.elements.email.value = profile.email;
  $("#address-count").textContent = t("updatedAddressCount", { count: profile.addresses.length });
  $("#saved-addresses").innerHTML = profile.addresses.length
    ? profile.addresses.map((address) => `
      <article class="saved-address${address.id === profile.activeAddressId ? " is-selected" : ""}">
        <button class="saved-address__select" type="button" data-select-address="${address.id}">
          <span class="saved-address__radio" aria-hidden="true"></span>
          <span class="saved-address__details">
            <strong>${escapeHtml(address.label)}${address.id === profile.activeAddressId ? ` <small>${t("selected")}</small>` : ""}</strong>
            <span>${escapeHtml(addressSummary(address))}</span>
            ${address.note ? `<small>${escapeHtml(address.note)}</small>` : ""}
          </span>
        </button>
        <div class="saved-address__actions">
          ${address.location ? `<a class="address-map-link" href="${mapLocationUrl(address.location)}" target="_blank" rel="noopener noreferrer">${t("openMapLocation")}</a>` : ""}
          <button class="remove-address" type="button" data-remove-address="${address.id}" aria-label="${t("removeAddress")}: ${escapeHtml(address.label)}">×</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty-addresses">${t("noAddresses")}</p>`;
  const atLimit = profile.addresses.length >= 5;
  $("#add-address").disabled = atLimit;
  $("#add-address").textContent = atLimit ? t("addAddressLimit") : t("addAddress");
  $("#address-form").hidden = true;
  $("#add-address").hidden = atLimit;
}

function renderCheckout() {
  const addressSelect = $("#checkout-address");
  addressSelect.innerHTML = profile.addresses.map((address) => `
    <option value="${address.id}" ${address.id === profile.activeAddressId ? "selected" : ""}>
      ${escapeHtml(addressSummary(address))}
    </option>
  `).join("");
  addressSelect.disabled = profile.addresses.length === 0;
  const subtotal = getSubtotal();
  const fee = getDeliveryFee(subtotal);
  $("#checkout-items").innerHTML = getCartItems().map(({ product, quantity }) => `
    <div class="checkout-summary__row">
      <img src="${product.image}" alt="" loading="lazy" />
      <span><strong>${escapeHtml(getText(product.name))}</strong><small>${quantity} × ${formatPrice(product.price)}</small></span>
      <b>${formatPrice(product.price * quantity)}</b>
    </div>
  `).join("");
  $("#checkout-subtotal").textContent = formatPrice(subtotal);
  $("#checkout-delivery").textContent = fee ? formatPrice(fee) : (language === "tr" ? "Ücretsiz" : "Free");
  $("#checkout-total").textContent = formatPrice(subtotal + fee);
}

function renderConfirmation(order) {
  const address = order.address;
  confirmationPage.innerHTML = `
    <div class="confirmation-head">
      <span class="confirmation-mark" aria-hidden="true">✓</span>
      <span class="section-kicker">${t("orderNumber")} ${escapeHtml(order.number)}</span>
      <h1 id="confirmation-title" tabindex="-1">${t("orderSent")}</h1>
      <p>${t("orderSentIntro")}</p>
    </div>
    <div class="confirmation-details">
      <div><span>${t("customer")}</span><strong>${escapeHtml(profile.phone)}<br>${escapeHtml(profile.email)}</strong></div>
      <div><span>${t("deliveryAddress")}</span><strong>${escapeHtml(addressSummary(address))}${address.location ? `<br><a class="address-map-link" href="${mapLocationUrl(address.location)}" target="_blank" rel="noopener noreferrer">${t("openMapLocation")}</a>` : ""}</strong></div>
    </div>
    <div class="confirmation-order">
      <h2>${t("orderSummary")}</h2>
      ${order.items.map((item) => `<div class="confirmation-order__row"><span>${escapeHtml(getText(item.name))} × ${item.quantity}</span><strong>${formatPrice(item.price * item.quantity)}</strong></div>`).join("")}
      <div class="confirmation-order__row"><span>${t("feeLabel")}</span><strong>${order.fee ? formatPrice(order.fee) : (language === "tr" ? "Ücretsiz" : "Free")}</strong></div>
      <div class="confirmation-order__total"><span>${t("totalLabel")}</span><span>${formatPrice(order.total)}</span></div>
    </div>
    <div class="status-timeline" aria-label="${t("orderSummary")}">
      <div class="status-step is-current"><i>1</i><span>${t("requestPrepared")}</span></div>
      <div class="status-step"><i>2</i><span>${t("waitingStore")}</span></div>
      <div class="status-step"><i>3</i><span>${t("deliveryToConfirm")}</span></div>
    </div>
    <div class="confirmation-actions">
      <button class="button button--outline" type="button" data-return-home>${t("returnToShop")}</button>
    </div>
  `;
}

function addressForStaff(address) {
  return [
    `${address.label}: ${addressSummary(address)}`,
    address.note && `Not: ${address.note}`,
    address.location && `GPS: ${address.location.latitude}, ${address.location.longitude}`,
  ].filter(Boolean).join(" · ");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function showWelcome() {
  welcomeScreen.hidden = false;
  header.hidden = true;
  main.hidden = true;
  footer.hidden = true;
  const form = $("#welcome-form");
  form.elements.phone.value = profile.phone;
  form.elements.email.value = profile.email;
  const savedAddress = getAddress();
  if (savedAddress) form.elements.street.value = addressSummary(savedAddress);
  form.elements.phone.focus();
}

function enterShop() {
  welcomeScreen.hidden = true;
  header.hidden = false;
  main.hidden = false;
  footer.hidden = false;
  renderCart();
}

function setOverlay(openElement, closeElement) {
  if (closeElement) {
    openElement.hidden = true;
    if (accountOverlay.hidden && cartOverlay.hidden && checkoutOverlay.hidden) {
      document.body.classList.remove("has-overlay");
    }
    return;
  }
  previousFocus = document.activeElement;
  openElement.hidden = false;
  document.body.classList.add("has-overlay");
  openElement.querySelector("[role='dialog'] .icon-button, [role='dialog'] input")?.focus();
}

function openAccount() {
  accountReturnToCheckout = !checkoutOverlay.hidden;
  if (accountReturnToCheckout) checkoutOverlay.hidden = true;
  renderAccount();
  setOverlay(accountOverlay);
}

function closeAccount() {
  setOverlay(accountOverlay, true);
  if (accountReturnToCheckout) {
    checkoutOverlay.hidden = false;
    document.body.classList.add("has-overlay");
    renderCheckout();
    $("#checkout-address").focus();
    accountReturnToCheckout = false;
  } else {
    previousFocus?.focus();
  }
}

function openCart() {
  renderCart();
  setOverlay(cartOverlay);
}

function closeCart() {
  setOverlay(cartOverlay, true);
  previousFocus?.focus();
}

function openCheckout() {
  if (!getCartCount()) return;
  if (!profile.addresses.length) {
    closeCart();
    openAccount();
    showToast(t("chooseAddress"));
    return;
  }
  renderCheckout();
  checkoutOverlay.hidden = false;
  cartOverlay.hidden = true;
  document.body.classList.add("has-overlay");
  $("#checkout-address").focus();
}

function closeCheckout() {
  setOverlay(checkoutOverlay, true);
  previousFocus?.focus();
}

function changeQuantity(id, amount) {
  const next = (cart[id] || 0) + amount;
  if (next <= 0) delete cart[id];
  else cart[id] = Math.min(next, 99);
  saveCart();
  renderCart();
  if (!checkoutOverlay.hidden) renderCheckout();
}

function saveAddressFromForm(form) {
  if (profile.addresses.length >= 5) {
    showToast(t("addressLimit"));
    return false;
  }
  const address = makeAddress(new FormData(form));
  if (!address.street) return false;
  const previous = profile;
  profile = {
    ...profile,
    addresses: [...profile.addresses, address],
    activeAddressId: address.id,
  };
  if (!saveProfile()) {
    profile = previous;
    return false;
  }
  form.reset();
  renderAccount();
  renderCart();
  if (!checkoutOverlay.hidden) renderCheckout();
  showToast(t("addressSaved"));
  return true;
}

async function startWhatsappOrder() {
  if (!$("#checkout-address").value) {
    showToast(t("chooseAddress"));
    return;
  }
  const address = getAddress($("#checkout-address").value);
  if (!address) {
    showToast(t("chooseAddress"));
    return;
  }
  if (!getCartCount()) return;
  if (getCartItems().some(({ product }) => product.demoOnly)) {
    showToast(t("demoCatalogCheckoutBlocked"));
    return;
  }

  const submitButton = $("#whatsapp-order");
  const buttonLabel = $("[data-i18n]", submitButton);
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  buttonLabel.textContent = t("sendingOrder");

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: { name: profile.name, phone: profile.phone, email: profile.email },
        address,
        deliveryPreference: $('input[name="deliverySlot"]:checked').value,
        items: getCartItems().map(({ product, quantity }) => ({ id: product.id, quantity })),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errorMessages = {
        service_not_configured: "orderErrorConfig",
        invalid_order: "orderErrorInvalid",
        order_too_large: "orderTooLarge",
      };
      const messageKey = errorMessages[result.error] || "orderErrorFailed";
      showToast(t(messageKey));
      return;
    }

    const storedOrder = {
      id: result.orderNumber,
      sample: false,
      status: "new",
      name: profile.name || profile.email,
      phone: profile.phone,
      email: profile.email,
      address: addressForStaff(address),
      createdAt: new Date().toISOString(),
      items: result.items.map((item) => ({
        id: item.id,
        name: products.find((product) => product.id === item.id)?.name.tr || item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: result.subtotal,
      fee: result.deliveryFee,
      total: result.total,
    };
    storedOrder.location = result.address?.location || null;
    if (!window.SengunStaff.addOrder(storedOrder)) showToast(t("staffOrderStorageError"));

    profile.activeAddressId = address.id;
    saveProfile();
    lastOrder = {
      number: result.orderNumber,
      items: result.items.map((item) => ({
        name: products.find((product) => product.id === item.id).name,
        quantity: item.quantity,
        price: item.price,
      })),
      address,
      deliveryPreference: $('input[name="deliverySlot"]:checked').value,
      subtotal: result.subtotal,
      fee: result.deliveryFee,
      total: result.total,
    };
    cart = {};
    saveCart();
    confirmationPage.hidden = false;
    renderConfirmation(lastOrder);
    checkoutOverlay.hidden = true;
    main.hidden = true;
    header.hidden = true;
    footer.hidden = true;
    document.body.classList.remove("has-overlay");
    renderCart();
    $("#confirmation-title").focus();
    window.scrollTo({ top: 0 });
  } catch (error) {
    console.error("Order submission failed:", error);
    showToast(t("orderErrorFailed"));
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
    buttonLabel.textContent = t("sendOrder");
  }
}

function returnHome() {
  confirmationPage.hidden = true;
  confirmationPage.innerHTML = "";
  lastOrder = null;
  enterShop();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleWelcomeSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  formData.set("label", t("homeAddressLabel"));
  const address = makeAddress(formData);
  if (!address.street) return;
  profile = {
    name: profile.name,
    phone: String(formData.get("phone")).trim(),
    email: String(formData.get("email")).trim(),
    addresses: [address],
    activeAddressId: address.id,
  };
  if (!saveProfile()) {
    profile = { name: "", phone: "", email: "", addresses: [], activeAddressId: "" };
    return;
  }
  enterShop();
}

$("#welcome-form").addEventListener("submit", handleWelcomeSubmit);
$("#google-demo").addEventListener("click", () => showToast(t("googleDemoMessage")));

$$("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    language = button.dataset.language;
    saveLanguage();
    applyTranslations();
  });
});

$$("[data-toggle-language]").forEach((button) => {
  button.addEventListener("click", () => {
    language = language === "tr" ? "en" : "tr";
    saveLanguage();
    applyTranslations();
  });
});

$("#profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const previous = profile;
  profile = {
    ...profile,
    phone: String(formData.get("phone")).trim(),
    email: String(formData.get("email")).trim(),
  };
  if (!saveProfile()) {
    profile = previous;
    return;
  }
  renderCart();
  showToast(t("profileSaved"));
});

$("#address-form").addEventListener("submit", (event) => {
  event.preventDefault();
  saveAddressFromForm(event.currentTarget);
});

$("#add-address").addEventListener("click", () => {
  $("#address-form").hidden = false;
  $("#address-form").querySelector("textarea")?.focus();
});

$("#cancel-address").addEventListener("click", () => {
  const form = $("#address-form");
  form.reset();
  form.hidden = true;
});

$("#saved-addresses").addEventListener("click", (event) => {
  const select = event.target.closest("[data-select-address]");
  if (select) {
    profile.activeAddressId = select.dataset.selectAddress;
    if (saveProfile()) {
      renderAccount();
      renderCart();
      if (!checkoutOverlay.hidden) renderCheckout();
    }
    return;
  }
  const remove = event.target.closest("[data-remove-address]");
  if (!remove) return;
  const previous = profile;
  const addresses = profile.addresses.filter((address) => address.id !== remove.dataset.removeAddress);
  profile = {
    ...profile,
    addresses,
    activeAddressId: profile.activeAddressId === remove.dataset.removeAddress
      ? addresses[0]?.id || ""
      : profile.activeAddressId,
  };
  if (!saveProfile()) {
    profile = previous;
    return;
  }
  renderAccount();
  renderCart();
  if (!checkoutOverlay.hidden) renderCheckout();
  showToast(t("addressRemoved"));
});

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
  showToast(t("itemAdded", { name: getText(products.find((product) => product.id === button.dataset.add).name) }));
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
  if (event.target.closest("[data-open-account]")) {
    event.preventDefault();
    openAccount();
  }
  if (event.target.closest("[data-close-account]")) closeAccount();
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
  if (event.target.closest("[data-close-checkout]")) closeCheckout();
  if (event.target.closest("[data-home-link]")) {
    event.preventDefault();
    returnHome();
  }
  if (event.target.closest("[data-return-home]")) returnHome();
});

$("#checkout-button").addEventListener("click", openCheckout);
$("#whatsapp-order").addEventListener("click", startWhatsappOrder);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!accountOverlay.hidden) closeAccount();
  else if (!checkoutOverlay.hidden) closeCheckout();
  else if (!cartOverlay.hidden) closeCart();
});

applyTranslations();
if (profile.phone && profile.email && profile.addresses.length) enterShop();
else showWelcome();
