(() => {
  const categories = [
    { id: "produce", tr: "Meyve & Sebze", en: "Fruit & Vegetables" },
    { id: "butcher", tr: "Kasap", en: "Butcher" },
    { id: "dairy", tr: "Süt & Şarküteri", en: "Dairy & Deli" },
    { id: "pantry", tr: "Kuru Gıda", en: "Pantry" },
    { id: "household", tr: "Ev & Temizlik", en: "Home & Cleaning" },
  ];

  const products = [
    { id: "dana-kiyma", name: { tr: "Dana Kıyma", en: "Ground Beef" }, category: "butcher", unit: { tr: "Birim belirtilmemiş", en: "Unit not specified" }, price: 889.9, image: "assets/products/dana-kiyma.jpg", bg: "#f4e5df", tag: { tr: "ÖNE ÇIKAN", en: "FEATURED" } },
    { id: "sultani-uzum", name: { tr: "Sultani Üzüm", en: "Sultani Grapes" }, category: "produce", unit: { tr: "Birim belirtilmemiş", en: "Unit not specified" }, price: 99.9, image: "assets/products/sultani-uzum.jpg", bg: "#e9efdf" },
    { id: "duru-bulgur", name: { tr: "Duru Pratik Bulgur Pilavı", en: "Duru Quick Bulgur Pilaf" }, category: "pantry", unit: { tr: "250 g · farklı çeşitler", en: "250 g · assorted varieties" }, price: 69.9, image: "assets/products/duru-bulgur.jpg", bg: "#f2e8df" },
    { id: "kovil-sabun", name: { tr: "Kovil Sıvı Sabun Çeşitleri", en: "Kovil Liquid Soap, Assorted" }, category: "household", unit: { tr: "400 ml", en: "400 ml" }, price: 29.9, image: "assets/products/kovil-liquid-soap.jpg", bg: "#e5eee7" },
    { id: "danablu", name: { tr: "Castello Danablu", en: "Castello Danablu Cheese" }, category: "dairy", unit: { tr: "100 g", en: "100 g" }, price: 139.9, image: "assets/products/castello-danablu.jpg", bg: "#f5ebd6" },
    { id: "seftali", name: { tr: "Şeftali", en: "Peaches" }, category: "produce", unit: { tr: "Birim belirtilmemiş", en: "Unit not specified" }, price: 84.9, image: "assets/products/peaches.jpg", bg: "#f6e5df" },
    { id: "kavun", name: { tr: "Kavun", en: "Melon" }, category: "produce", unit: { tr: "Birim belirtilmemiş", en: "Unit not specified" }, price: 34.9, image: "assets/products/honeydew-melon.jpg", bg: "#e8efdf" },
  ];

  window.SengunCatalog = { categories, products };
})();
