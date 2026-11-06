(() => {
  const staff = window.SengunStaff;
  const elements = {
    stats: document.querySelector("#staff-stats"),
    orderCount: document.querySelector("#staff-order-count"),
    orders: document.querySelector("#staff-order-list"),
  };
  const riderStatuses = ["accepted", "preparing", "ready_for_delivery", "out_for_delivery"];

  function render() {
    const orders = staff.loadOrders().filter((order) => riderStatuses.includes(order.status));
    const preparing = orders.filter((order) => ["accepted", "preparing"].includes(order.status)).length;
    const onTheWay = orders.filter((order) => ["ready_for_delivery", "out_for_delivery"].includes(order.status)).length;
    elements.stats.innerHTML = [
      ["activeOrders", orders.length],
      ["preparingOrders", preparing],
      ["onTheWay", onTheWay],
    ].map(([label, count]) => `
      <article class="staff-stat">
        <span>${staff.escapeHtml(staff.translate(label))}</span>
        <strong>${count}</strong>
      </article>
    `).join("");
    elements.orderCount.textContent = staff.translate("orderCount", { count: orders.length });
    elements.orders.innerHTML = orders.length
      ? orders.map((order) => staff.renderOrderCard(order, "rider")).join("")
      : `<p class="staff-empty">${staff.escapeHtml(staff.translate("emptyOrders"))}</p>`;
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
    if (!staff.updateOrderStatus(button.dataset.orderId, button.dataset.orderStatus, "rider")) {
      staff.showToast(staff.translate("storageError"));
      return;
    }
    render();
    staff.showToast(staff.translate("orderSaved"));
  });

  window.addEventListener("storage", (event) => {
    if (!event.key || event.key === staff.storageKeys.orders) render();
  });

  staff.applyLanguage();
  render();
})();
