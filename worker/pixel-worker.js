/**
 * sixxly / simplerandbetter tracking pixel Worker
 *
 * Replaces the 192.0.2.1 black-hole origin. Serves a real 1x1 transparent GIF
 * with HTTP 200 (no more 503s, no console errors) and records one datapoint
 * per hit to Workers Analytics Engine.
 *
 * Route:   track.<domain>/*
 * Binding: [[analytics_engine_datasets]] binding = "PIXEL"  (optional -
 *          if the binding is absent the Worker still serves the GIF)
 */

// 1x1 transparent GIF, 42 bytes, inlined so the Worker has no dependencies.
const GIF = Uint8Array.from(atob(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
), c => c.charCodeAt(0));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cf = request.cf || {};

    // ?p= tags the page that fired the pixel (e.g. p=404). Default "index".
    const page = (url.searchParams.get("p") || "index").slice(0, 64);

    let referrerHost = "";
    try {
      const ref = request.headers.get("referer");
      if (ref) referrerHost = new URL(ref).hostname.slice(0, 128);
    } catch { /* malformed referer - ignore */ }

    const ua = request.headers.get("user-agent") || "";
    // Coarse bot flag; deliberately not fingerprinting individuals.
    const isBot = /bot|crawl|spider|slurp|bing|preview|headless/i.test(ua);

    if (env.PIXEL) {
      try {
        env.PIXEL.writeDataPoint({
          blobs: [
            url.hostname,                  // blob1 - which track host
            page,                          // blob2 - ?p= tag
            referrerHost,                  // blob3 - referring hostname
            cf.country || "",              // blob4 - country
            cf.colo || "",                 // blob5 - Cloudflare edge
            isBot ? "bot" : "human",       // blob6
          ],
          doubles: [1],                    // double1 - hit count
          indexes: [url.hostname],         // sampling key
        });
      } catch { /* never let logging break the response */ }
    }

    return new Response(GIF, {
      status: 200,
      headers: {
        "content-type": "image/gif",
        "content-length": String(GIF.length),
        // Must not cache, or repeat visits never reach the Worker.
        "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
        "pragma": "no-cache",
        "expires": "0",
        "x-content-type-options": "nosniff",
        "access-control-allow-origin": "*",
        "timing-allow-origin": "*",
      },
    });
  },
};
