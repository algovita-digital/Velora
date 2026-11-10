# Velora storefront

Next.js 14 (App Router), Tailwind CSS 3 and Lucide icons. Prices are in INR.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Catalog structure

Three departments, each split into styles:

| Department | Styles |
| --- | --- |
| Pants & Denims | Baggy fit, Bootcut jeans, Jorts, Wide leg, Trousers |
| Shirts | Linen shirts, Boxy printed shirts, Oversized shirts |
| T-Shirts | Heavyweight tees, Long sleeve tees, Graphic tees |

The top navigation (Pants & Denims, Shirts, T-Shirts, New Arrivals, Sale), the "Shop by category" cards, the footer links and the filters in the shop section all use the same shop state, so they stay in sync. Men / Young is a "For" filter in the shop section.

## Where things live

- `lib/products.ts`: departments, styles and every product. Edit titles, prices (`price`, `salePrice`) and sizes here.
- `lib/store.tsx`: cart (saved in localStorage) and the shop filters. `goTo({ department, category, audience, highlight })` jumps to any view.
- `lib/site.ts`: free shipping threshold and the optional hero photo.
- `components/Silhouette.tsx`: the placeholder garment artwork for every style.
- `components/`: Header, Hero, Categories, ProductGrid, ProductCard, CartDrawer, TrustStrip, Footer.

## Add a product

Add an entry to `products` in `lib/products.ts`. Use `WAIST` sizes for pants and `LETTER` sizes (S to XXL) for shirts and tees. Keep it to five sizes so the size picker stays on one row on phones.

## Add a new style or department

1. Add the id to `CategoryId` and an entry to `categories` in `lib/products.ts` (department, name, label, card colours).
2. Add a drawing for it in `components/Silhouette.tsx` (`PANTS` or `TOPS`).
3. For a whole new department, also add it to `Department` and `departments`; the nav list in `Header.tsx` and `Footer.tsx` is where its link goes.

## Add real photos

Pages show illustrated garments until you add photos, so nothing breaks in the meantime.

1. Put images in `public/images/` (for example `public/images/products/raw-indigo-baggy.jpg`).
2. Set the path on the product in `lib/products.ts`: `image: "/images/products/raw-indigo-baggy.jpg"`.
3. Same for category cards (`image` on each category) and the hero (`heroImage` in `lib/site.ts`).

Portrait 4:5 works best for products, 3:4 for category cards, and 4:5 for the hero.

## Before you launch

- Connect the Checkout button in `components/CartDrawer.tsx` to your payment or checkout provider.
- Connect the newsletter form in `components/Footer.tsx` to your mailing list.
- Replace the placeholder footer links and policy copy with your real pages.
- The account icon is a placeholder; wire it to your auth.

## Design tokens

Colours live in `tailwind.config.ts`: `denim` (raw indigo), `chalk`, `ink`, `wash` and `stitch` (copper topstitch accent). Fonts are Big Shoulders Display (headlines) and Manrope (body), loaded in `app/layout.tsx`.
