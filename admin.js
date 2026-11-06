(() => {
  const staff = window.SengunStaff;
  const elements = {
    stats: document.querySelector("#staff-stats"),
    orderCount: document.querySelector("#staff-order-count"),
    orders: document.querySelector("#staff-order-list"),
    products: document.querySelector("#staff-product-list"),
    productForm: document.querySelector("#staff-product-form"),
    category: document.querySelector('[name="category"]'),
    image: document.querySelector('[name="image"]'),
  };
  let products = staff.loadProducts();

  function renderStats(orders) {
    const activeProducts = products.filter((product) => product.active !== false).length;
    const waiting = orders.filter((order) => order.status === "new").length;
    const delivery = orders.filter((order) =>
      ["ready_for_delivery", "out_for_delivery"].includes(order.status)
    ).length;
    elements.stats.innerHTML = [
      ["totalOrders", orders.length],
      ["needsAcceptance", waiting],
      ["inDelivery", delivery],
      ["activeProducts", activeProducts],
    ].map(([label, count]) => `
      <article class="staff-stat">
        <span>${staff.escapeHtml(staff.translate(label))}</span>
        <strong>${count}</strong>
      </article>
    `).join("");
  }

  function renderOrders() {
    const orders = staff.loadOrders();
    elements.orderCount.textContent = staff.translate("orderCount", { count: orders.length });
    elements.orders.innerHTML = orders.length
      ? orders.map((order) => staff.renderOrderCard(order, "admin")).join("")
      : `<p class="staff-empty">${staff.escapeHtml(staff.translate("emptyOrders"))}</p>`;
    renderStats(orders);
  }

  function renderProducts() {
    elements.products.innerHTML = products.map((product) => {
      const escapedId = staff.escapeHtml(product.id);
      return `
        <form class="staff-product-card" data-product-id="${escapedId}">
          <div class="staff-product-card__top">
            <div>
              <strong>${staff.escapeHtml(product.name[staff.language])}</strong>
              <small>${escapedId}${product.demoOnly ? ` · ${staff.escapeHtml(staff.translate("productDemoOnly"))}` : ""}</small>
            </div>
            <label class="staff-product-active">
              <input type="checkbox" name="active" ${product.active !== false ? "checked" : ""} />
              <span>${staff.escapeHtml(staff.translate("productActive"))}</span>
            </label>
          </div>
          <div class="staff-product-form__grid">
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productNameTr"))}</span><input name="nameTr" value="${staff.escapeHtml(product.name.tr)}" required maxlength="80" /></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productNameEn"))}</span><input name="nameEn" value="${staff.escapeHtml(product.name.en)}" required maxlength="80" /></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productPrice"))}</span><input name="price" type="number" min="0.01" max="100000" step="0.01" value="${product.price}" required /></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productCategory"))}</span><select name="category" required>${staff.optionsForCategories(product.category)}</select></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productUnitTr"))}</span><input name="unitTr" value="${staff.escapeHtml(product.unit.tr)}" required maxlength="40" /></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productUnitEn"))}</span><input name="unitEn" value="${staff.escapeHtml(product.unit.en)}" required maxlength="40" /></label>
            <label class="form-field"><span>${staff.escapeHtml(staff.translate("productImage"))}</span><select name="image" required>${staff.optionsForImages(product.image)}</select></label>
          </div>
          <button class="button button--outline" type="submit">${staff.escapeHtml(staff.translate("saveProduct"))}</button>
        </form>
      `;
    }).join("");
  }

  function render() {
    elements.category.innerHTML = staff.optionsForCategories();
    elements.image.innerHTML = staff.optionsForImages();
    renderOrders();
    renderProducts();
  }

  function readProduct(form, existing, id) {
    const data = new FormData(form);
    return {
      ...existing,
      id,
      name: { tr: String(data.get("nameTr")).trim(), en: String(data.get("nameEn")).trim() },
      unit: { tr: String(data.get("unitTr")).trim(), en: String(data.get("unitEn")).trim() },
      price: Math.round(Number(data.get("price")) * 100) / 100,
      category: String(data.get("category")),
      image: String(data.get("image")),
      active: !form.querySelector('[name="active"]') || data.get("active") === "on",
      demoOnly: true,
    };
  }

  document.querySelectorAll("[data-toggle-language]").forEach((button) => {
    button.addEventListener("click", () => {
      staff.switchLanguage();
      render();
    });
  });

  elements.orders.addEventListener("click", (event) => {
    const button = event.target.closest("[data-order-status]");
    if (!button) return;
    if (!staff.updateOrderStatus(button.dataset.orderId, button.dataset.orderStatus, "admin")) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    renderOrders();
    staff.showToast(staff.translate("orderSaved"));
  });

  elements.productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!elements.productForm.reportValidity()) return;
    const data = new FormData(elements.productForm);
    const product = readProduct(elements.productForm, {}, staff.makeProductId(String(data.get("nameTr")), products));
    product.demoOnly = true;
    if (!staff.isValidProduct(product)) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    const nextProducts = [...products, product];
    if (!staff.saveProducts(nextProducts)) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    products = nextProducts;
    elements.productForm.reset();
    render();
    staff.showToast(staff.translate("productAdded"));
  });

  elements.products.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-product-id]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const index = products.findIndex((product) => product.id === form.dataset.productId);
    if (index < 0) return;
    const updated = readProduct(form, products[index], products[index].id);
    if (!staff.isValidProduct(updated)) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    const nextProducts = products.slice();
    nextProducts[index] = updated;
    if (!staff.saveProducts(nextProducts)) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    products = nextProducts;
    render();
    staff.showToast(staff.translate("productSaved"));
  });

  document.querySelector("#reset-catalog").addEventListener("click", () => {
    try {
      localStorage.removeItem("sengun-demo-staff-products-v1");
    } catch (error) {
      console.error("Staff demo catalog could not be reset:", error);
      staff.showToast(staff.translate("storageError"));
      return;
    }
    products = staff.defaultProducts.map(staff.copyProduct);
    render();
    staff.showToast(staff.translate("catalogReset"));
  });

  window.addEventListener("storage", (event) => {
    if (!event.key || [staff.storageKeys.orders, staff.storageKeys.products].includes(event.key)) {
      products = staff.loadProducts();
      render();
    }
  });

  staff.applyLanguage();
  render();
})();
