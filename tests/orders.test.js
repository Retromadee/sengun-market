const assert = require("node:assert/strict");
const { after, beforeEach, test } = require("node:test");
const handler = require("../api/orders");

const configKeys = [
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_TEMPLATE_NAME",
  "WHATSAPP_GRAPH_API_VERSION",
  "WHATSAPP_TEMPLATE_LANGUAGE",
];
const originalEnv = Object.fromEntries(configKeys.map((key) => [key, process.env[key]]));
const originalFetch = global.fetch;

const validOrder = {
  customer: { name: "Test Customer", phone: "+90 555 123 4567" },
  address: {
    label: "Home",
    city: "Istanbul",
    district: "Kadikoy",
    neighborhood: "Moda",
    street: "Test Street 1",
    note: "",
  },
  deliveryPreference: "soon",
  items: [{ id: "duru-bulgur", quantity: 1 }],
};

function createResponse() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

beforeEach(() => {
  process.env.WHATSAPP_ACCESS_TOKEN = "test-token";
  process.env.WHATSAPP_PHONE_NUMBER_ID = "1234567890";
  process.env.WHATSAPP_TEMPLATE_NAME = "order_receipt";
  process.env.WHATSAPP_GRAPH_API_VERSION = "v99.0";
  process.env.WHATSAPP_TEMPLATE_LANGUAGE = "tr";
});

after(() => {
  for (const key of configKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  global.fetch = originalFetch;
});

test("rejects methods other than POST", async () => {
  const response = createResponse();
  await handler({ method: "GET" }, response);

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, "POST");
  assert.deepEqual(response.body, { error: "method_not_allowed" });
});

test("reports missing WhatsApp configuration without making a request", async () => {
  delete process.env.WHATSAPP_ACCESS_TOKEN;
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error("Unexpected network request");
  };
  const response = createResponse();

  await handler({ method: "POST", body: validOrder }, response);

  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.body, { error: "service_not_configured" });
  assert.equal(fetchCalled, false);
});

test("rejects malformed, unknown, and duplicate cart items before sending", async () => {
  const invalidOrders = [
    { ...validOrder, customer: { ...validOrder.customer, phone: "call me" } },
    { ...validOrder, customer: { ...validOrder.customer, email: "not-an-email" } },
    { ...validOrder, address: { ...validOrder.address, street: "" } },
    { ...validOrder, deliveryPreference: "tomorrow" },
    { ...validOrder, items: [{ id: "not-a-product", quantity: 1 }] },
    { ...validOrder, items: [{ id: "duru-bulgur", quantity: 0 }] },
    { ...validOrder, items: [{ id: "duru-bulgur", quantity: 100 }] },
    { ...validOrder, items: [{ id: "duru-bulgur", quantity: 1 }, { id: "duru-bulgur", quantity: 2 }] },
  ];
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error("Unexpected network request");
  };

  for (const body of invalidOrders) {
    const response = createResponse();
    await handler({ method: "POST", body }, response);
    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, { error: "invalid_order" });
  }
  assert.equal(fetchCalled, false);
});

test("rejects oversized receipts before making a request", async () => {
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error("Unexpected network request");
  };
  const response = createResponse();
  const body = {
    ...validOrder,
    address: {
      label: "L".repeat(35),
      city: "C".repeat(50),
      district: "D".repeat(50),
      neighborhood: "N".repeat(70),
      street: "S".repeat(180),
      note: "N".repeat(120),
    },
    items: [
      { id: "dana-kiyma", quantity: 99 },
      { id: "sultani-uzum", quantity: 99 },
      { id: "duru-bulgur", quantity: 99 },
      { id: "kovil-sabun", quantity: 99 },
      { id: "danablu", quantity: 99 },
      { id: "seftali", quantity: 99 },
      { id: "kavun", quantity: 99 },
    ],
  };

  await handler({ method: "POST", body }, response);

  assert.equal(response.statusCode, 413);
  assert.deepEqual(response.body, { error: "order_too_large" });
  assert.equal(fetchCalled, false);
});

test("uses server prices, calculates delivery, and sends a formatted receipt", async () => {
  let requestUrl;
  let requestOptions;
  global.fetch = async (url, options) => {
    requestUrl = url;
    requestOptions = options;
    return { ok: true, json: async () => ({ messages: [{ id: "wamid.test" }] }) };
  };
  const response = createResponse();

  await handler({
    method: "POST",
    body: { ...validOrder, items: [{ id: "duru-bulgur", quantity: 1, price: 0.01 }] },
  }, response);

  assert.equal(response.statusCode, 201);
  assert.equal(response.headers["Cache-Control"], "no-store");
  assert.equal(response.body.items[0].price, 69.9);
  assert.equal(response.body.subtotal, 69.9);
  assert.equal(response.body.deliveryFee, 29.9);
  assert.equal(response.body.total, 99.8);
  assert.match(response.body.orderNumber, /^SG-[A-F0-9]{8}$/);
  assert.equal(requestUrl, "https://graph.facebook.com/v99.0/1234567890/messages");

  const payload = JSON.parse(requestOptions.body);
  assert.equal(payload.messaging_product, "whatsapp");
  assert.equal(payload.to, "905391168536");
  assert.equal(payload.template.name, "order_receipt");
  assert.match(payload.template.components[0].parameters[0].text, /SİPARİŞ ÖN FİŞİ/);
  assert.match(payload.template.components[0].parameters[0].text, /₺69,90/);
});

test("accepts a single freeform address and includes the customer's email", async () => {
  let receipt;
  global.fetch = async (_url, options) => {
    receipt = JSON.parse(options.body).template.components[0].parameters[0].text;
    return { ok: true, json: async () => ({ messages: [{ id: "wamid.email" }] }) };
  };
  const response = createResponse();
  const body = {
    ...validOrder,
    customer: { phone: "+90 555 123 4567", email: "shopper@example.com" },
    address: {
      label: "Home",
      city: "",
      district: "",
      neighborhood: "",
      street: "12 Example Street, Apartment 3",
      note: "",
    },
  };

  await handler({ method: "POST", body }, response);

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.email, "shopper@example.com");
  assert.match(receipt, /shopper@example\.com/);
  assert.match(receipt, /12 Example Street, Apartment 3/);
});

test("sends a validated live location pin in the order receipt", async () => {
  let receipt;
  global.fetch = async (_url, options) => {
    receipt = JSON.parse(options.body).template.components[0].parameters[0].text;
    return { ok: true, json: async () => ({ messages: [{ id: "wamid.location" }] }) };
  };
  const response = createResponse();
  const address = {
    label: "Current location",
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    note: "",
    location: { latitude: 41.008237, longitude: 28.978359, accuracy: 18 },
  };

  await handler({
    method: "POST",
    body: { ...validOrder, address },
  }, response);

  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.body.address.location, address.location);
  assert.match(receipt, /https:\/\/maps\.google\.com\/\?q=41\.008237,28\.978359/);
  assert.match(receipt, /Konum doğruluğu: yaklaşık ±18 m/);
});

test("rejects malformed or out-of-range live location coordinates", async () => {
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    throw new Error("Unexpected network request");
  };
  const invalidLocations = [
    { latitude: 91, longitude: 28 },
    { latitude: 41, longitude: -181 },
    { latitude: "41.008", longitude: 28.978 },
    { latitude: 41, longitude: 28, accuracy: 100001 },
  ];

  for (const location of invalidLocations) {
    const response = createResponse();
    await handler({
      method: "POST",
      body: {
        ...validOrder,
        address: { ...validOrder.address, location },
      },
    }, response);
    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, { error: "invalid_order" });
  }
  assert.equal(fetchCalled, false);
});

test("waives delivery fee at the free-delivery threshold", async () => {
  global.fetch = async () => ({
    ok: true,
    json: async () => ({ messages: [{ id: "wamid.test" }] }),
  });
  const response = createResponse();

  await handler({
    method: "POST",
    body: { ...validOrder, items: [{ id: "sultani-uzum", quantity: 6 }] },
  }, response);

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.subtotal, 599.4);
  assert.equal(response.body.deliveryFee, 0);
  assert.equal(response.body.total, 599.4);
});

test("returns a visible error if WhatsApp rejects the message", async () => {
  global.fetch = async () => ({
    ok: false,
    status: 400,
    json: async () => ({ error: { code: 400, type: "test_error" } }),
  });
  const response = createResponse();
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    await handler({ method: "POST", body: validOrder }, response);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.body, { error: "send_failed" });
});

test("returns a visible error if the WhatsApp request fails", async () => {
  global.fetch = async () => {
    throw new Error("Simulated network failure");
  };
  const response = createResponse();
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    await handler({ method: "POST", body: validOrder }, response);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.body, { error: "send_failed" });
});
