
# Website Launch Readiness Review - GROPPI.be

## What's Already Working Well

- **17 routes** all properly configured with lazy loading
- **SEO setup** complete: sitemap.xml, robots.txt, PageSEO component, JSON-LD structured data
- **Cookie consent** banner (EU compliant)
- **Contact form** with server-side validation, rate limiting, and spam detection
- **Newsletter** subscription via edge function
- **i18n** across 15 languages
- **Tracking** ready for GA4, GTM, TikTok Pixel, Meta Pixel
- **Privacy** and **Terms** pages in place
- **404 page** with SEO noindex
- **WhatsApp floating button** active
- **Admin panel** with protected routes

---

## Items to Address Before Going Live

### 1. Connect Your Custom Domain (groppi.be)
The site is not yet published. You need to:
- Click "Publish" in Lovable
- Go to Project Settings > Domains
- Connect `groppi.be` and `www.groppi.be`
- Add DNS records (A record pointing to `185.158.133.1` + TXT verification record) at your domain registrar
- Wait for SSL provisioning

### 2. Add Google Analytics / GTM Tracking Scripts
The tracking utility (`tracking.ts`) is ready and pushes events to `dataLayer`, `gtag`, `fbq`, and `ttq` -- but **no actual tracking scripts** (GTM snippet, GA4, etc.) are loaded in `index.html`. Without these, no data is collected.

**Action**: Add your GTM container snippet to `index.html` (respecting cookie consent -- only fire after `cookie_consent_accepted`).

### 3. Database Security (2 RLS Warnings)
The database linter found 2 tables with overly permissive RLS policies (`USING (true)` or `WITH CHECK (true)` on write operations). These should be tightened to restrict inserts/updates to authorized users only (e.g., admin roles for `contact_messages`, `newsletter_subscribers`).

### 4. Hero Section -- Video Cards Not Loading on Mobile
The mobile screenshot shows empty/blank video cards. The 9 Vimeo iframes all load simultaneously which is heavy on mobile. Consider:
- Reducing the number of iframes on mobile
- Or replacing them with static poster images on smaller screens

### 5. Hero Social Icons Bar -- Missing on Mobile
The large social icons pill at the bottom of the hero (`HeroSocialIcons`) is designed for desktop (wide `gap-16 px-16`) and likely overflows or is not visible on mobile. It needs responsive sizing.

### 6. No Google Search Console Verification
Add a Google Search Console verification meta tag to `index.html` so you can submit your sitemap and monitor indexing.

### 7. Missing `<lastmod>` in Sitemap
The sitemap.xml has `<changefreq>` and `<priority>` but no `<lastmod>` dates. Google prefers `<lastmod>` for crawl scheduling.

### 8. No Favicon Variants
Only `favicon.ico` exists. For modern browsers and mobile "Add to Home Screen", consider adding:
- `apple-touch-icon.png` (180x180)
- `favicon-32x32.png` and `favicon-16x16.png`
- A `site.webmanifest` file

### 9. Missing `lang` Attribute Synchronization
`index.html` has `lang="nl"` hardcoded but the site supports 15 languages. The `RTLHandler` updates `dir` but should also update `document.documentElement.lang` to match the active language for SEO and accessibility.

---

## Summary Priority Table

| # | Item | Priority | Effort |
|---|------|----------|--------|
| 1 | Publish + connect domain | Critical | Low |
| 2 | Add GTM/GA4 scripts | Critical | Low |
| 3 | Fix RLS policies | High | Low |
| 4 | Hero video performance on mobile | High | Medium |
| 5 | Hero social icons responsiveness | Medium | Low |
| 6 | Google Search Console verification | Medium | Low |
| 7 | Add lastmod to sitemap | Low | Low |
| 8 | Favicon variants + webmanifest | Low | Low |
| 9 | Sync `lang` attribute with i18n | Low | Low |

---

## Technical Implementation Notes

- **GTM integration**: Add the GTM snippet to `index.html` inside `<head>`, wrapped to fire only after cookie consent. The `CookieConsent` component already pushes `cookie_consent_accepted` to `dataLayer`.
- **RLS fix**: Update the permissive policies on `contact_messages` and `newsletter_subscribers` to allow anonymous INSERT (via edge functions using service role key -- which is already the case) but restrict direct client-side writes.
- **lang sync**: In `applyDocumentDirection()`, add `document.documentElement.lang = language` alongside the existing `dir` update.
- **Hero mobile**: Use a CSS media query to hide iframes and show poster images below `768px`, or reduce the video count to 3-4 on mobile.
