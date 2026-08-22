# sixxly.com

A simple static site for **sixxly.com**, built to be hosted for free on GitHub Pages.

Everything in this folder is the complete site — no build step, no dependencies.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The landing page (all CSS inlined, no build step) |
| `404.html` | Custom not-found page |
| `CNAME` | Tells GitHub Pages to serve the site at `sixxly.com` |
| `.nojekyll` | Disables Jekyll processing (faster, predictable deploys) |
| `robots.txt` / `sitemap.xml` | Basic SEO plumbing |
| `assets/pixel.png` | 1×1 transparent PNG used as the hidden tracking pixel |

## Going live (one-time setup, ~5 minutes, $0/month)

1. **Create the repository.** On GitHub, create a new **public** repo called `sixxly`
   under the `simplerandbetter` account (public is required for free GitHub Pages).
2. **Add these files.** Copy the contents of this folder to the root of that repo's
   `main` branch (upload via the GitHub web UI, or ask Claude to push them once the
   repo exists).
3. **Enable Pages.** In the repo: Settings → Pages → Source: *Deploy from a branch* →
   Branch: `main`, folder `/ (root)` → Save. The `CNAME` file sets the custom domain
   automatically; tick **Enforce HTTPS** once the certificate is issued (can take a
   few minutes).
4. **Point DNS at GitHub Pages.** At the registrar for sixxly.com, add:

   | Type | Name | Value |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `simplerandbetter.github.io` |

   This is the same setup already used for simplerandbetter.com. DNS can take up to
   an hour to propagate; HTTPS certificates are issued automatically after that.

## Tracking pixel

Both pages load a hidden 1×1 image from `https://track.sixxly.com/assets/pixel.png`
(the 404 page appends `?p=404` so the two can be told apart in logs), following the
same pattern as simplerandbetter.com. For it to actually record visits, point the
`track` subdomain at whatever host/service logs requests for you — the same place
`track.simplerandbetter.com` points at. If your tracking endpoint lives at a
different URL, just change the `src` of the `<img>` at the bottom of `index.html`
and `404.html`.

## Editing

Edit `index.html` and push — GitHub Pages redeploys automatically within a minute or two.
