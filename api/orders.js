const { randomUUID } = require("node:crypto");

const ORDER_RECIPIENT = "905391168536";
const DELIVERY_FEE_KURUS = 2990;
const FREE_DELIVERY_THRESHOLD_KURUS = 50000;
const PRODUCTS = {
  "dana-kiyma": { name: "Dana Kıyma", price: 889.9, unit: "1 kg" },
  "sultani-uzum": { name: "Sultani Üzüm", price: 99.9, unit: "1 kg" },
  "duru-bulgur": { name: "Duru Pratik Bulgur Pilavı", price: 69.9, unit: "250 g" },
  "kovil-sabun": { name: "Kovil Sıvı Sabun Çeşitleri", price: 29.9, unit: "400 ml" },
  danablu: { name: "Castello Danablu", price: 139.9, unit: "100 g" },
  seftali: { name: "Şeftali", price: 84.9, unit: "1 kg" },
  kavun: { name: "Kavun", price: 34.9, unit: "1 adet" },
  "domates-salkim": { name: "Salkım Domates", price: 54.9, unit: "1 kg" },
  "avokado-ithal": { name: "İthal Hass Avokado", price: 49.9, unit: "1 adet" },
  "tavuk-bonfile": { name: "Tavuk Bonfile Göğüs", price: 189.9, unit: "1 kg" },
  "kuzu-pirzola": { name: "Kuzu Kalem Pirzola", price: 489.9, unit: "500 g" },
  "kasap-sucuk": { name: "Geleneksel Kasap Sucuk", price: 329.9, unit: "400 g" },
  "ezine-peyniri": { name: "Ezine Klasik Beyaz Peynir", price: 219.9, unit: "500 g" },
  "organik-koy-yumurtasi": { name: "Organik Gezen Tavuk Yumurtası", price: 79.9, unit: "10'lu Paket" },
  "gunluk-taze-sut": { name: "Günlük Çiftlik Sütü %3.5 Yağlı", price: 44.5, unit: "1 L" },
  "tereyagi-trabzon": { name: "Trabzon Yayık Tereyağı", price: 239.9, unit: "500 g" },
  "eksi-maya-koy-ekmegi": { name: "Ekşi Mayalı Köy Ekmeği", price: 48.0, unit: "750 g" },
  "tereyagli-simit": { name: "Çıtır Sokak Simidi", price: 15.0, unit: "1 adet" },
  "boyoz-izmir": { name: "Fırın İzmir Boyozu", price: 45.0, unit: "3'lü Paket" },
  "zeytinyagi-sizma": { name: "Soğuk Sıkım Naturel Sızma Zeytinyağı", price: 395.0, unit: "1 L" },
  "cay-karadeniz": { name: "Rize Çayı Gurme Harman", price: 139.9, unit: "1 kg" },
  "baldo-pirinc": { name: "Gönen Baldo Pirinç", price: 92.5, unit: "1 kg" },
  "taze-portakal-suyu": { name: "%100 Taze Sıkma Portakal Suyu", price: 65.0, unit: "500 ml" },
  "soda-dogal": { name: "Doğal Zengin Mineralli Maden Suyu", price: 42.0, unit: "6 x 200 ml" },
  "turk-kahvesi": { name: "Geleneksel Çekim Türk Kahvesi", price: 62.0, unit: "250 g" },
  "organik-bulasik-deterjani": { name: "Bitkisel Bulaşık Deterjanı", price: 64.9, unit: "750 ml" },
  "cam-temizleyici": { name: "Sirkeli Doğal Yüzey & Cam Spreyi", price: 46.5, unit: "500 ml" },
};

function cleanText(value, maxLength) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function validAddress(address) {
  if (!address || typeof address !== "object" || Array.isArray(address)) return false;
  const hasDetailedTextAddress = ["city", "district", "neighborhood", "street"].every((key) =>
    cleanText(address[key], 200).length > 0
  );
  const hasFlatTextAddress = cleanText(address.street, 180).length > 0;
  const hasLocation = validLocation(address.location);
  const locationIsValid = address.location === undefined || address.location === null || hasLocation;
  return cleanText(address.label, 35).length > 0 && locationIsValid &&
    (hasDetailedTextAddress || hasFlatTextAddress || hasLocation);
}

function validLocation(location) {
  return location && typeof location === "object" && !Array.isArray(location) &&
    Number.isFinite(location.latitude) && location.latitude >= -90 && location.latitude <= 90 &&
    Number.isFinite(location.longitude) && location.longitude >= -180 && location.longitude <= 180 &&
    (location.accuracy === undefined ||
      (Number.isFinite(location.accuracy) && location.accuracy >= 0 && location.accuracy <= 100000));
}

function formatPrice(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(value);
}

function getConfiguration() {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME, WHATSAPP_GRAPH_API_VERSION } = process.env;
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_TEMPLATE_NAME || !WHATSAPP_GRAPH_API_VERSION) {
    return null;
  }
  if (!/^\d+$/.test(WHATSAPP_PHONE_NUMBER_ID) ||
      !/^[a-z0-9_]{1,128}$/.test(WHATSAPP_TEMPLATE_NAME) ||
      !/^v\d+\.\d+$/.test(WHATSAPP_GRAPH_API_VERSION)) {
    return null;
  }
  return {
    recipient: ORDER_RECIPIENT,
    token: WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: WHATSAPP_PHONE_NUMBER_ID,
    templateName: WHATSAPP_TEMPLATE_NAME,
    graphApiVersion: WHATSAPP_GRAPH_API_VERSION,
    templateLanguage: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "tr",
  };
}

function buildOrder(body) {
  const customer = body?.customer;
  const address = body?.address;
  const items = body?.items;
  const name = cleanText(customer?.name, 80);
  const phone = cleanText(customer?.phone, 24);
  const email = cleanText(customer?.email, 254);
  if (!name || !/^[+\d\s().-]{7,24}$/.test(phone) ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      !validAddress(address) ||
      !Array.isArray(items) || items.length < 1 || items.length > Object.keys(PRODUCTS).length ||
      !["soon", "schedule"].includes(body.deliveryPreference)) {
    return null;
  }

  const seen = new Set();
  const orderItems = [];
  for (const item of items) {
    if (!item || typeof item.id !== "string" || !PRODUCTS[item.id] ||
        !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 ||
        seen.has(item.id)) {
      return null;
    }
    seen.add(item.id);
    orderItems.push({ id: item.id, ...PRODUCTS[item.id], quantity: item.quantity });
  }

  const safeAddress = {
    label: cleanText(address.label, 35),
    city: cleanText(address.city, 50),
    district: cleanText(address.district, 50),
    neighborhood: cleanText(address.neighborhood, 70),
    street: cleanText(address.street, 180),
    note: cleanText(address.note, 120),
    location: validLocation(address.location) ? {
      latitude: Math.round(address.location.latitude * 1_000_000) / 1_000_000,
      longitude: Math.round(address.location.longitude * 1_000_000) / 1_000_000,
      ...(Number.isFinite(address.location.accuracy)
        ? { accuracy: Math.round(address.location.accuracy) }
        : {}),
    } : null,
  };
  const hasTextAddress = safeAddress.street && (
    (safeAddress.city && safeAddress.district && safeAddress.neighborhood) ||
    (!safeAddress.city && !safeAddress.district && !safeAddress.neighborhood)
  );
  if (!safeAddress.label || (!hasTextAddress && !safeAddress.location)) {
    return null;
  }

  const subtotalKurus = orderItems.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0,
  );
  const deliveryFeeKurus = subtotalKurus >= FREE_DELIVERY_THRESHOLD_KURUS ? 0 : DELIVERY_FEE_KURUS;
  const subtotal = subtotalKurus / 100;
  const deliveryFee = deliveryFeeKurus / 100;
  const total = (subtotalKurus + deliveryFeeKurus) / 100;
  const orderNumber = `SG-${randomUUID().slice(0, 8).toUpperCase()}`;
  const addressText = [
    safeAddress.label,
    safeAddress.neighborhood,
    safeAddress.street,
    [safeAddress.district, safeAddress.city].filter(Boolean).join("/"),
    safeAddress.note && `Not: ${safeAddress.note}`,
    safeAddress.location && `Harita konumu: https://maps.google.com/?q=${safeAddress.location.latitude},${safeAddress.location.longitude}`,
    safeAddress.location?.accuracy !== undefined && `Konum doğruluğu: yaklaşık ±${safeAddress.location.accuracy} m`,
  ].filter(Boolean).join(", ");
  const message = [
    "ŞENGÜN SÜPERMARKET | SİPARİŞ ÖN FİŞİ",
    `Sipariş no: ${orderNumber} · ${new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Europe/Istanbul",
    }).format(new Date())}`,
    "",
    `Müşteri: ${name} · ${phone}${email ? ` · ${email}` : ""}`,
    `Teslimat adresi: ${addressText}`,
    `Teslimat tercihi: ${body.deliveryPreference === "soon" ? "Mağazayla teyitleş" : "Saat tercihi için müşteriyle iletişime geç"}`,
    "",
    "Ürünler:",
    ...orderItems.map((item) => {
      const unit = item.unit === "Fiyat mağazada teyit edilecek" ? "" : ` (${item.unit})`;
      const lineTotalKurus = Math.round(item.price * 100) * item.quantity;
      return `• ${item.name}${unit} × ${item.quantity} @ ${formatPrice(item.price)} = ${formatPrice(lineTotalKurus / 100)}`;
    }),
    "",
    `Ara toplam: ${formatPrice(subtotal)}`,
    `Teslimat ücreti: ${deliveryFee ? formatPrice(deliveryFee) : "Ücretsiz"}`,
    `TAHMİNİ TOPLAM: ${formatPrice(total)}`,
    "",
    "Not: Fiyat ve stok mağaza teyidine tabidir; bu sipariş talebi onay bekliyor.",
  ].join("\n");

  if (message.length > 1024) return { tooLarge: true };
  return { orderNumber, name, phone, email, address: safeAddress, items: orderItems, subtotal, deliveryFee, total, message };
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const config = getConfiguration();
  if (!config) return res.status(503).json({ error: "service_not_configured" });

  const order = buildOrder(req.body);
  if (!order) return res.status(400).json({ error: "invalid_order" });
  if (order.tooLarge) return res.status(413).json({ error: "order_too_large" });

  const templateLanguage = config.templateLanguage;
  if (!/^[a-z]{2}(?:_[A-Z]{2})?$/.test(templateLanguage)) {
    return res.status(503).json({ error: "service_not_configured" });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${config.graphApiVersion}/${config.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: config.recipient,
          type: "template",
          template: {
            name: config.templateName,
            language: { code: templateLanguage },
            components: [{
              type: "body",
              parameters: [{ type: "text", text: order.message }],
            }],
          },
        }),
      },
    );
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.messages?.[0]?.id) {
      console.error("WhatsApp API rejected the order", {
        status: response.status,
        code: result.error?.code,
        type: result.error?.type,
      });
      return res.status(502).json({ error: "send_failed" });
    }

    return res.status(201).json({
      orderNumber: order.orderNumber,
      email: order.email,
      address: order.address,
      items: order.items.map(({ id, quantity, price }) => ({ id, quantity, price })),
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
    });
  } catch (error) {
    console.error("WhatsApp API request failed", error);
    return res.status(502).json({ error: "send_failed" });
  }
};
