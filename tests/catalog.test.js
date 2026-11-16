const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test, beforeEach, after } = require("node:test");
const vm = require("node:vm");
const handler = require("../api/orders");

const catalogSource = fs.readFileSync(path.join(__dirname, "..", "catalog-data.js"), "utf8");

function loadCatalog() {
  const window = {};
  const context = vm.createContext({ window });
  vm.runInContext(catalogSource, context);
  return window.SengunCatalog;
}

const configKeys = [
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_TEMPLATE_NAME",
  "WHATSAPP_GRAPH_API_VERSION",
  "WHATSAPP_TEMPLATE_LANGUAGE",
];
const originalEnv = Object.fromEntries(configKeys.map((key) => [key, process.env[key]]));
const originalFetch = global.fetch;

function createResponse() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
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

test("catalog defines 7 categories with English and Turkish names", () => {
  const { categories } = loadCatalog();
  assert.equal(categories.length, 7);
  const categoryIds = categories.map((c) => c.id);
  assert.ok(categoryIds.includes("produce"));
  assert.ok(categoryIds.includes("butcher"));
  assert.ok(categoryIds.includes("dairy"));
  assert.ok(categoryIds.includes("bakery"));
  assert.ok(categoryIds.includes("pantry"));
  assert.ok(categoryIds.includes("beverages"));
  assert.ok(categoryIds.includes("household"));

  for (const cat of categories) {
    assert.ok(typeof cat.tr === "string" && cat.tr.length > 0);
    assert.ok(typeof cat.en === "string" && cat.en.length > 0);
  }
});

test("all expanded products have valid schema and category references", () => {
  const { categories, products } = loadCatalog();
  const categoryIds = new Set(categories.map((c) => c.id));

  assert.ok(products.length >= 25, `Expected >= 25 products, found ${products.length}`);

  for (const p of products) {
    assert.ok(/^[a-z0-9-]+$/.test(p.id), `Invalid product ID: ${p.id}`);
    assert.ok(typeof p.name.tr === "string" && p.name.tr.length > 0);
    assert.ok(typeof p.name.en === "string" && p.name.en.length > 0);
    assert.ok(categoryIds.has(p.category), `Product ${p.id} references invalid category ${p.category}`);
    assert.ok(typeof p.price === "number" && p.price > 0 && p.price < 50000);
    assert.ok(typeof p.image === "string" && p.image.startsWith("assets/products/"));
  }
});

test("server API accepts orders containing newly added bakery and beverage items", async () => {
  let capturedPayload;
  global.fetch = async (_url, options) => {
    capturedPayload = JSON.parse(options.body);
    return { ok: true, json: async () => ({ messages: [{ id: "wamid.new_products_test" }] }) };
  };

  const response = createResponse();
  const body = {
    customer: { name: "Stakeholder Demo", phone: "+90 532 555 1923" },
    address: {
      label: "Ev",
      street: "Moda Cad. No: 42, Kadikoy",
      district: "Kadikoy",
      city: "Istanbul",
      neighborhood: "Moda",
    },
    deliveryPreference: "soon",
    items: [
      { id: "tereyagli-simit", quantity: 4 }, // 4 * 15 = 60
      { id: "taze-portakal-suyu", quantity: 2 }, // 2 * 65 = 130
      { id: "ezine-peyniri", quantity: 1 }, // 1 * 219.9 = 219.9
    ],
  };

  await handler({ method: "POST", body }, response);

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.items.length, 3);
  assert.equal(response.body.subtotal, 409.9);
  assert.equal(response.body.deliveryFee, 29.9);
  assert.equal(response.body.total, 439.8);
  assert.ok(capturedPayload.template.components[0].parameters[0].text.includes("Çıtır Sokak Simidi"));
});
