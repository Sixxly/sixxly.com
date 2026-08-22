-- Workers Analytics Engine SQL API:
--   POST https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/analytics_engine/sql
--   Authorization: Bearer <API_TOKEN with "Account Analytics: Read">
--   Body: the raw SQL below.

-- Hits per day, per site, last 30 days
SELECT blob1 AS site, toDate(timestamp) AS day, SUM(_sample_interval) AS hits
FROM pixel_hits
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY site, day
ORDER BY day DESC;

-- index vs 404 traffic (this is what the ?p= tag buys you)
SELECT blob2 AS page, SUM(_sample_interval) AS hits
FROM pixel_hits
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY page ORDER BY hits DESC;

-- Where visitors come from
SELECT blob4 AS country, SUM(_sample_interval) AS hits
FROM pixel_hits
WHERE timestamp > NOW() - INTERVAL '7' DAY AND blob6 = 'human'
GROUP BY country ORDER BY hits DESC LIMIT 20;

-- Referrers (who is linking to you)
SELECT blob3 AS referrer, SUM(_sample_interval) AS hits
FROM pixel_hits
WHERE timestamp > NOW() - INTERVAL '30' DAY AND blob3 != ''
GROUP BY referrer ORDER BY hits DESC LIMIT 20;

-- Human vs bot split
SELECT blob6 AS kind, SUM(_sample_interval) AS hits
FROM pixel_hits
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY kind;
