# Şengün Süpermarket web demo

Mobile-first Turkish grocery shopping demo built with plain HTML, CSS, and JavaScript. The product catalog uses items, prices, and local image copies from publicly visible posts on [@supermarketsengun](https://www.instagram.com/supermarketsengun/).

## Run locally

From this directory, start a static web server:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import `Retromadee/sengun-market`.
2. Select **Other** as the framework preset.
3. Leave the build and install commands empty; this project is served as static files from the repository root.
4. Deploy. Vercel serves `index.html` and the relative CSS, JavaScript, and image assets directly.

No environment variables or backend services are required for the demo.

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
