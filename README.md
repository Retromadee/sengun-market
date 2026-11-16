# Şengün Süpermarket web demo

Mobile-first Turkish grocery shopping demo built with plain HTML, CSS, and JavaScript. The product catalog uses items, prices, and local image copies from publicly visible posts on [@supermarketsengun](https://www.instagram.com/supermarketsengun/).

## Run locally

From this directory, start a static web server:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). Use `localhost` for local Firebase sign-in; Firebase's authorized-domain form may reject the loopback IP `127.0.0.1`.

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import `Retromadee/sengun-market`.
2. Select **Other** as the framework preset.
3. Leave the build and install commands empty; this project is served as static files from the repository root.
4. Deploy. Vercel serves `index.html` and the relative CSS, JavaScript, and image assets directly.

No environment variables or build step are required. Google sign-in is optional and requires the Firebase setup below.

## Optional Google sign-in

The app uses Firebase Authentication's Google provider. To enable it:

1. In the Firebase Console for the configured project, open **Authentication → Sign-in method** and enable **Google**. Set a support email if prompted.
2. In **Authentication → Settings → Authorized domains**, make sure `localhost` is listed for local development and add the exact domain used by the deployed site.
3. Serve the app over HTTP or HTTPS, then use **Continue with Google**. Users still need to enter their phone number and door address before continuing.

The browser Firebase configuration in `firebase-config.js` (including its API key) is public client configuration, not a password or server secret. Keep access control in Firebase Security Rules and restrict the API key as appropriate. Google sign-in currently stores the signed-in user's name, email, and Firebase UID with the browser-local profile; the app does not send Firebase ID tokens to its order API, so this is not server-side authorization.

## Stakeholder Demo Features

- **🎯 Stakeholder Demo Hub**: Top quick-access toolbar with 1-click demo bundles (Kahvaltı, Akşam Yemeği, Ücretsiz Teslimat Sepeti) and direct links to the Admin and Rider delivery consoles.
- **⚡ Fast Stakeholder Onboarding**: 1-click "Stakeholder Demosu ile Hızlı Başla" button on the welcome screen to bypass typing during presentations.
- **🛒 Inline Quantity Steppers**: Product cards feature direct `[ - ] [ count ] [ + ]` controls for rapid cart building, matching modern delivery apps (Getir, Instacart).
- **📦 Expanded 27-Product Catalog**: 7 categories including fresh produce, artisan butcher cuts, deli & dairy, stone oven bakery, gourmet pantry, fresh beverages, and eco household essentials.
- **🛵 Express & Scheduled Delivery**: Choose between ⚡ Express Delivery (30-45 min) and scheduled evening windows, with real-time zone indicator (Kadıköy / Moda).
- **📍 Interactive Live Delivery Simulation**: Post-checkout 5-stage order and courier tracking simulator with manual "Next Stage ▶" and 4-second "Auto-Play ⚡" modes, showing live courier contact, scooter details, and simulated distance.
- **🔄 Multi-View Real-Time Sync**: Advancing order stages in the customer confirmation screen synchronizes directly with the Admin (`admin.html`) and Delivery Rider (`delivery.html`) panels in real time.

## Run tests

Run the complete automated test suite (18 tests covering API validation, catalog schema, pricing, WhatsApp receipts, and staff role transitions):

```sh
node --test tests/
```

## Demo scope

- Browse, search, and filter seven products across five categories.
- Add products to a persistent browser-local cart and adjust quantities.
- Review TRY totals, a demo delivery fee, and the free-delivery threshold.
- Complete a demo checkout with an address and delivery window.
- See a confirmation and delivery-status timeline.

The displayed prices are transcribed from the dated Instagram post images linked on each product card. They are historical post prices, not a live price feed; some promotions have expired. Units are marked as unspecified where the post image does not state them. Verify current prices, units, inventory, and delivery coverage with the market before using this as a real ordering service.

Product images and the profile avatar are local copies of the market's Instagram images, so the demo does not depend on expiring Instagram CDN URLs. Each product links back to its source post. No payment is collected and no real order or delivery is created.

## Instagram post price snapshots

| Product | Price shown | Post date |
| --- | ---: | --- |
| Dana kıyma | ₺889,90 | 29 Oct 2026 |
| Sultani üzüm | ₺99,90 | 17 Oct 2026 |
| Duru Pratik Bulgur Pilavı | ₺69,90 | 17 Oct 2026 |
| Kovil sıvı sabun, 400 ml | ₺29,90 | 23 Oct 2026 |
| Castello Danablu, 100 g | ₺139,90 | 25 Sep 2026 |
| Şeftali | ₺84,90 | 18 Sep 2026 |
| Kavun | ₺34,90 | 12 Sep 2026 |

These are prices read from posts—not store-confirmed current prices. The Instagram account is [@supermarketsengun](https://www.instagram.com/supermarketsengun/).
