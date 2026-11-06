const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const staffSource = fs.readFileSync(path.join(__dirname, "..", "staff-common.js"), "utf8");
const catalogSource = fs.readFileSync(path.join(__dirname, "..", "catalog-data.js"), "utf8");

function createStaff() {
  const values = new Map();
  const localStorage = {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
  const window = {};
  const context = vm.createContext({ localStorage, console, window });
  vm.runInContext(catalogSource, context);
  vm.runInContext(staffSource, context);
  return { staff: window.SengunStaff, values };
}

test("admin only accepts or rejects new orders and cannot advance delivery states", () => {
  const { staff } = createStaff();

  assert.deepEqual(Array.from(staff.getTransitions("admin", "new")), ["accepted", "rejected"]);
  assert.deepEqual(Array.from(staff.getTransitions("admin", "accepted")), ["cancelled"]);
  assert.deepEqual(Array.from(staff.getTransitions("admin", "ready_for_delivery")), ["cancelled"]);
  assert.deepEqual(Array.from(staff.getTransitions("admin", "out_for_delivery")), []);
});

test("delivery role advances accepted orders through delivery but cannot accept new ones", () => {
  const { staff } = createStaff();

  assert.deepEqual(Array.from(staff.getTransitions("rider", "new")), []);
  assert.deepEqual(Array.from(staff.getTransitions("rider", "accepted")), ["preparing"]);
  assert.deepEqual(Array.from(staff.getTransitions("rider", "preparing")), ["ready_for_delivery"]);
  assert.deepEqual(Array.from(staff.getTransitions("rider", "ready_for_delivery")), ["out_for_delivery"]);
  assert.deepEqual(Array.from(staff.getTransitions("rider", "out_for_delivery")), ["delivered"]);
});

test("order status updates persist only allowed role transitions", () => {
  const { staff } = createStaff();
  const [sample] = staff.loadOrders();

  assert.equal(sample.status, "new");
  assert.equal(staff.updateOrderStatus(sample.id, "preparing", "rider"), false);
  assert.equal(staff.updateOrderStatus(sample.id, "accepted", "admin"), true);
  assert.equal(staff.loadOrders().find((order) => order.id === sample.id).status, "accepted");
  assert.equal(staff.updateOrderStatus(sample.id, "preparing", "admin"), false);
  assert.equal(staff.updateOrderStatus(sample.id, "preparing", "rider"), true);
});

test("product edits and additions persist as demo-only catalog entries", () => {
  const { staff } = createStaff();
  const products = staff.loadProducts();
  const edited = { ...products[0], price: 999, demoOnly: true };
  const added = {
    id: "local-product",
    name: { tr: "Yerel Ürün", en: "Local Product" },
    unit: { tr: "1 adet", en: "1 item" },
    category: "produce",
    price: 12.5,
    image: products[0].image,
    active: true,
    demoOnly: true,
  };

  assert.equal(staff.isValidProduct(added), true);
  assert.equal(staff.saveProducts([edited, ...products.slice(1), added]), true);
  const saved = staff.loadProducts();

  assert.equal(saved.find((product) => product.id === edited.id).price, 999);
  assert.equal(saved.find((product) => product.id === added.id).demoOnly, true);
  assert.equal(staff.isValidProduct({ ...added, image: "https://example.com/image.jpg" }), false);
});
