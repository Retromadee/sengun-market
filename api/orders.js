const { randomUUID } = require("node:crypto");

const DELIVERY_FEE = 29.9;
const FREE_DELIVERY_THRESHOLD = 500;
const PRODUCTS = {
  "dana-kiyma": { name: "Dana Kıyma", price: 889.9, unit: "Fiyat mağazada teyit edilecek" },
  "sultani-uzum": { name: "Sultani Üzüm", price: 99.9, unit: "Fiyat mağazada teyit edilecek" },
  "duru-bulgur": { name: "Duru Pratik Bulgur Pilavı", price: 69.9, unit: "250 g" },
  "kovil-sabun": { name: "Kovil Sıvı Sabun Çeşitleri", price: 29.9, unit: "400 ml" },
  danablu: { name: "Castello Danablu", price: 139.9, unit: "100 g" },
  seftali: { name: "Şeftali", price: 84.9, unit: "Fiyat mağazada teyit edilecek" },
  kavun: { name: "Kavun", price: 34.9, unit: "Fiyat mağazada teyit edilecek" },
};

function cleanText(value, maxLength) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function validAddress(address) {
  if (!address || typeof address !== "object" || Array.isArray(address)) return false;
  return ["label", "city", "district", "neighborhood", "street"].every((key) =>
    cleanText(address[key], 200).length > 0
  );
}

function formatPrice(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(value);
}

function getConfiguration() {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME, WHATSAPP_GRAPH_API_VERSION, WHATSAPP_RECIPIENT } = process.env;
  const recipient = WHATSAPP_RECIPIENT;
  if (!recipient || !WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_TEMPLATE_NAME || !WHATSAPP_GRAPH_API_VERSION) {
    return null;
  }
  if (!/^\d{10,15}$/.test(recipient) ||
      !/^\d+$/.test(WHATSAPP_PHONE_NUMBER_ID) ||
      !/^[a-z0-9_]{1,128}$/.test(WHATSAPP_TEMPLATE_NAME) ||
      !/^v\d+\.\d+$/.test(WHATSAPP_GRAPH_API_VERSION)) {
    return null;
  }
  return {
    recipient,
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
  if (!name || !/^[+\d\s().-]{7,24}$/.test(phone) || !validAddress(address) ||
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
  };
  if (!safeAddress.label || !safeAddress.city || !safeAddress.district ||
      !safeAddress.neighborhood || !safeAddress.street) {
    return null;
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const orderNumber = `SG-${randomUUID().slice(0, 8).toUpperCase()}`;
  const addressText = [
    safeAddress.label,
    safeAddress.neighborhood,
    safeAddress.street,
    safeAddress.district,
    safeAddress.city,
    safeAddress.note && `Tarif: ${safeAddress.note}`,
  ].filter(Boolean).join(", ");
  const message = [
    "Yeni Şengün Süpermarket siparişi",
    `Sipariş no: ${orderNumber}`,
    `Müşteri: ${name}`,
    `Telefon: ${phone}`,
    `Adres: ${addressText}`,
    `Teslimat: ${body.deliveryPreference === "soon" ? "Mağazayla teyitleş" : "Saat tercihi için müşteriyle iletişime geç"}`,
    "Ürünler:",
    ...orderItems.map((item) => `- ${item.name} (${item.unit}) × ${item.quantity}: ${formatPrice(item.price * item.quantity)}`),
    `Ara toplam: ${formatPrice(subtotal)}`,
    `Tahmini teslimat: ${deliveryFee ? formatPrice(deliveryFee) : "Ücretsiz"}`,
    `Tahmini toplam: ${formatPrice(subtotal + deliveryFee)}`,
    "Fiyat, stok ve teslimat uygunluğunu müşteriyle teyit edin.",
  ].join("\n");

  if (message.length > 1024) return { tooLarge: true };
  return { orderNumber, name, phone, address: safeAddress, items: orderItems, subtotal, deliveryFee, total: subtotal + deliveryFee, message };
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
