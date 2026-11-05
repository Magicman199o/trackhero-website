# Track Hero website

The marketing site for Track Hero. Plain HTML, no build step.

- `index.html`: home page (the "Mirror" direction). It measures the visitor's own session in their browser only; nothing is sent anywhere.
- `product.html`: Product page: features, what makes Track Hero different, and the impact
- `security.html`: Security page: what is collected, what never is, and the controls
- `blog/`: blog index and posts. To publish a post: add `blog/<slug>.html` (copy an existing post), a cover in `blog/covers/`, and a card at the top of `blog/index.html`. A back office editor will replace this later.
- `site.css`, `site.js`: shared look and behaviour for the Product and Security pages
- `vercel.json`: clean URLs (`/product`), a redirect from the old `/how-it-works` and basic security headers

The app lives at https://track-hero.vercel.app (separate repo).

Preview locally:

```bash
npx serve .
```
