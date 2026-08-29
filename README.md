# sixxly.com

The commercial site for **Sixxly**: [The Litigant's Command Pack](https://sixxly.com/#pack) —
case-management templates and plain-English guides for self-represented litigants — plus a free,
fully client-side [Court Deadline Calculator](https://sixxly.com/tools/deadline-calculator.html).

Static HTML on GitHub Pages. No build step, no dependencies, no analytics, no cookies.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing / sales page for the Command Pack |
| `tools/deadline-calculator.html` | Free deadline calculator (all logic in-browser) |
| `legal.html` | Terms, disclaimer & refunds |
| `404.html` | Not-found page (root-absolute links so it works at any path) |
| `assets/style.css` | The one shared stylesheet |
| `sitemap.xml` / `robots.txt` | SEO plumbing |
| `CNAME` | Custom domain (sixxly.com) — **do not edit** |
| `.nojekyll` | Disables Jekyll processing |

## How it makes money

Buy buttons point to Gumroad (`https://sixxly.gumroad.com/l/command-pack`), which handles
payment, delivery, taxes and refunds automatically. The product zip is uploaded to Gumroad,
not stored in this public repo.

## Editing

Edit, commit to `main`, and GitHub Pages redeploys within a minute or two. Nothing in this
repo touches DNS or email records — those live at the registrar.

`assets/pixel.png` is an unused leftover from the previous placeholder site.
