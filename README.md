# Track Hero website

The marketing site for Track Hero. Plain HTML, no build step.

- `index.html`: home page (the "Mirror" direction). It measures the visitor's own session in their browser only; nothing is sent anywhere.
- `product.html`: Product page (the "Instrument" direction)
- `vercel.json`: clean URLs (`/product`), a redirect from the old `/how-it-works` and basic security headers

The app lives at https://track-hero.vercel.app (separate repo).

Preview locally:

```bash
npx serve .
```
