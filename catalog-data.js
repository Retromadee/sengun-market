(() => {
  const categories = [
    { id: "produce", tr: "Meyve & Sebze", en: "Fruit & Vegetables" },
    { id: "butcher", tr: "Kasap", en: "Butcher" },
    { id: "dairy", tr: "Süt & Şarküteri", en: "Dairy & Deli" },
    { id: "bakery", tr: "Ekmek & Fırın", en: "Bakery" },
    { id: "pantry", tr: "Kuru Gıda", en: "Pantry" },
    { id: "beverages", tr: "İçecekler", en: "Beverages" },
    { id: "household", tr: "Ev & Temizlik", en: "Home & Cleaning" },
  ];

  const products = [
    // Original 7 items (Instagram verified snapshots)
    { id: "dana-kiyma", name: { tr: "Dana Kıyma", en: "Ground Beef" }, category: "butcher", unit: { tr: "1 kg", en: "1 kg" }, price: 889.9, image: "assets/products/dana-kiyma.jpg", bg: "#f4e5df", tag: { tr: "ÖNE ÇIKAN", en: "FEATURED" } },
    { id: "sultani-uzum", name: { tr: "Sultani Üzüm", en: "Sultani Grapes" }, category: "produce", unit: { tr: "1 kg", en: "1 kg" }, price: 99.9, image: "assets/products/sultani-uzum.jpg", bg: "#e9efdf" },
    { id: "duru-bulgur", name: { tr: "Duru Pratik Bulgur Pilavı", en: "Duru Quick Bulgur Pilaf" }, category: "pantry", unit: { tr: "250 g · farklı çeşitler", en: "250 g · assorted varieties" }, price: 69.9, image: "assets/products/duru-bulgur.jpg", bg: "#f2e8df" },
    { id: "kovil-sabun", name: { tr: "Kovil Sıvı Sabun Çeşitleri", en: "Kovil Liquid Soap, Assorted" }, category: "household", unit: { tr: "400 ml", en: "400 ml" }, price: 29.9, image: "assets/products/kovil-liquid-soap.jpg", bg: "#e5eee7" },
    { id: "danablu", name: { tr: "Castello Danablu", en: "Castello Danablu Cheese" }, category: "dairy", unit: { tr: "100 g", en: "100 g" }, price: 139.9, image: "assets/products/castello-danablu.jpg", bg: "#f5ebd6" },
    { id: "seftali", name: { tr: "Şeftali", en: "Peaches" }, category: "produce", unit: { tr: "1 kg", en: "1 kg" }, price: 84.9, image: "assets/products/peaches.jpg", bg: "#f6e5df" },
    { id: "kavun", name: { tr: "Kavun", en: "Melon" }, category: "produce", unit: { tr: "1 adet (~2.5 kg)", en: "1 piece (~2.5 kg)" }, price: 34.9, image: "assets/products/honeydew-melon.jpg", bg: "#e8efdf" },

    // Fresh Produce Additions
    { id: "domates-salkim", name: { tr: "Salkım Domates", en: "Vine Tomatoes" }, category: "produce", unit: { tr: "1 kg", en: "1 kg" }, price: 54.9, image: "assets/products/peaches.jpg", bg: "#fae8e6", tag: { tr: "TAZE", en: "FRESH" } },
    { id: "avokado-ithal", name: { tr: "İthal Hass Avokado", en: "Imported Hass Avocado" }, category: "produce", unit: { tr: "1 adet (Yemeye Hazır)", en: "1 piece (Ready to Eat)" }, price: 49.9, image: "assets/products/honeydew-melon.jpg", bg: "#e8f0e4" },

    // Butcher Additions
    { id: "tavuk-bonfile", name: { tr: "Tavuk Bonfile Göğüs", en: "Fresh Chicken Breast" }, category: "butcher", unit: { tr: "1 kg", en: "1 kg" }, price: 189.9, image: "assets/products/dana-kiyma.jpg", bg: "#f7ebe6" },
    { id: "kuzu-pirzola", name: { tr: "Kuzu Kalem Pirzola", en: "Prime Lamb Chops" }, category: "butcher", unit: { tr: "500 g", en: "500 g" }, price: 489.9, image: "assets/products/dana-kiyma.jpg", bg: "#f5e4dd", tag: { tr: "ÖZEL KESİM", en: "PRIME" } },
    { id: "kasap-sucuk", name: { tr: "Geleneksel Kasap Sucuk", en: "Artisan Beef Soujouk" }, category: "butcher", unit: { tr: "400 g", en: "400 g" }, price: 329.9, image: "assets/products/dana-kiyma.jpg", bg: "#f6e6e2" },

    // Dairy & Deli Additions
    { id: "ezine-peyniri", name: { tr: "Ezine Klasik Beyaz Peynir", en: "Traditional Ezine Aged Cheese" }, category: "dairy", unit: { tr: "500 g", en: "500 g" }, price: 219.9, image: "assets/products/castello-danablu.jpg", bg: "#fbf3e4", tag: { tr: "ÇOK SATAN", en: "BESTSELLER" } },
    { id: "organik-koy-yumurtasi", name: { tr: "Organik Gezen Tavuk Yumurtası", en: "Organic Free-Range Eggs" }, category: "dairy", unit: { tr: "10'lu Paket", en: "10-pack" }, price: 79.9, image: "assets/products/castello-danablu.jpg", bg: "#f8f1e2" },
    { id: "gunluk-taze-sut", name: { tr: "Günlük Çiftlik Sütü %3.5 Yağlı", en: "Fresh Whole Farm Milk" }, category: "dairy", unit: { tr: "1 L Cam Şişe", en: "1 L Glass Bottle" }, price: 44.5, image: "assets/products/castello-danablu.jpg", bg: "#f4f3ea" },
    { id: "tereyagi-trabzon", name: { tr: "Trabzon Yayık Tereyağı", en: "Traditional Churned Butter" }, category: "dairy", unit: { tr: "500 g", en: "500 g" }, price: 239.9, image: "assets/products/castello-danablu.jpg", bg: "#fbf5e6" },

    // Bakery
    { id: "eksi-maya-koy-ekmegi", name: { tr: "Ekşi Mayalı Köy Ekmeği", en: "Artisan Sourdough Loaf" }, category: "bakery", unit: { tr: "750 g", en: "750 g" }, price: 48.0, image: "assets/products/duru-bulgur.jpg", bg: "#f3ecde", tag: { tr: "FIRINDAN", en: "FRESH BAKE" } },
    { id: "tereyagli-simit", name: { tr: "Çıtır Sokak Simidi", en: "Sesame Bagel (Simit)" }, category: "bakery", unit: { tr: "1 adet", en: "1 piece" }, price: 15.0, image: "assets/products/duru-bulgur.jpg", bg: "#f5eee2" },
    { id: "boyoz-izmir", name: { tr: "Fırın İzmir Boyozu", en: "Traditional Boyoz (Pack of 3)" }, category: "bakery", unit: { tr: "3'lü Paket", en: "3-pack" }, price: 45.0, image: "assets/products/duru-bulgur.jpg", bg: "#f4ede0" },

    // Pantry Additions
    { id: "zeytinyagi-sizma", name: { tr: "Soğuk Sıkım Naturel Sızma Zeytinyağı", en: "Extra Virgin Cold Pressed Olive Oil" }, category: "pantry", unit: { tr: "1 L Teneke", en: "1 L Tin" }, price: 395.0, image: "assets/products/duru-bulgur.jpg", bg: "#f2ecdd", tag: { tr: "ERKEN HASAT", en: "EARLY HARVEST" } },
    { id: "cay-karadeniz", name: { tr: "Rize Çayı Gurme Harman", en: "Rize Gourmet Black Tea" }, category: "pantry", unit: { tr: "1 kg", en: "1 kg" }, price: 139.9, image: "assets/products/duru-bulgur.jpg", bg: "#eee8dd" },
    { id: "baldo-pirinc", name: { tr: "Gönen Baldo Pirinç", en: "Premium Baldo Rice" }, category: "pantry", unit: { tr: "1 kg", en: "1 kg" }, price: 92.5, image: "assets/products/duru-bulgur.jpg", bg: "#efe9de" },

    // Beverages
    { id: "taze-portakal-suyu", name: { tr: "%100 Taze Sıkma Portakal Suyu", en: "100% Fresh Orange Juice" }, category: "beverages", unit: { tr: "500 ml", en: "500 ml" }, price: 65.0, image: "assets/products/honeydew-melon.jpg", bg: "#fbeee0", tag: { tr: "GÜNLÜK", en: "DAILY" } },
    { id: "soda-dogal", name: { tr: "Doğal Zengin Mineralli Maden Suyu", en: "Natural Mineral Water (6-pack)" }, category: "beverages", unit: { tr: "6 x 200 ml", en: "6 x 200 ml" }, price: 42.0, image: "assets/products/kovil-liquid-soap.jpg", bg: "#e6f0ec" },
    { id: "turk-kahvesi", name: { tr: "Geleneksel Çekim Türk Kahvesi", en: "Classic Roasted Turkish Coffee" }, category: "beverages", unit: { tr: "250 g", en: "250 g" }, price: 62.0, image: "assets/products/duru-bulgur.jpg", bg: "#efe8dd" },

    // Household Additions
    { id: "organik-bulasik-deterjani", name: { tr: "Bitkisel Bulaşık Deterjanı (Limon)", en: "Plant-Based Dish Liquid (Lemon)" }, category: "household", unit: { tr: "750 ml", en: "750 ml" }, price: 64.9, image: "assets/products/kovil-liquid-soap.jpg", bg: "#e7f0e9" },
    { id: "cam-temizleyici", name: { tr: "Sirkeli Doğal Yüzey & Cam Spreyi", en: "Natural Surface & Glass Spray" }, category: "household", unit: { tr: "500 ml", en: "500 ml" }, price: 46.5, image: "assets/products/kovil-liquid-soap.jpg", bg: "#e4efe8" },
  ];

  window.SengunCatalog = { categories, products };
})();
