

# Website Structure & Pricing Verification Plan

## Current Assessment

After thorough exploration of the codebase, I've verified that **the website architecture is correctly structured**:

| Page | Status | Current State |
|------|--------|---------------|
| Homepage (/) | Correct | HeroSection → PostHeroTrust → LaunchDiscountSection → HomeTrustedBelgium → HomeTrustSectors → HomePortfolioGrid → HomeCaseStudies → HomeClientLogoMarquee → HomeQuickChoice → HomeServicesGrid → HomeTrustSection → HomeFinalCTA |
| Services (/services) | Correct | Clean grid listing with category filters, no homepage elements |
| Service Detail (/services/:slug) | Correct | Video right + text left hero → Sticky tabs → Why section → Process → Packages → Quote Builder → FAQ → CTA |

**The sections are NOT being moved between pages.** The structure follows the documented architecture.

---

## Issue Identified: Pricing Lock Violations

The **HomeServicesGrid** component on the homepage still contains invented price ranges that violate the pricing lock rule:

### Current (Incorrect) State in HomeServicesGrid:
```text
priceMin: 500, priceMax: 5000    ❌ Ads Management
priceMin: 300, priceMax: 2000    ❌ SEO
priceMin: 400, priceMax: 3000    ❌ Social Media
priceMin: 1500, priceMax: 8000   ❌ Business Website
priceMin: 3000, priceMax: 25000  ❌ E-commerce
```

### Required (Correct) Pricing:
| Service | Display |
|---------|---------|
| Content Production | Vanaf €25 (eenmalig) |
| All Other Services | Offerte op maat |

---

## Technical Changes Required

### 1. Fix HomeServicesGrid Pricing (homepage)

**File:** `src/components/home/HomeServicesGrid.tsx`

**Changes:**
- Remove all `priceMin` and `priceMax` values except for Content Production (€25)
- Update price display logic to show "Offerte op maat" when no price provided
- Content Production keeps: `priceMin: 25, pricingType: 'one_time'`

### 2. Fix Quote Builder Price Ranges

**File:** `src/components/service-page/quote-builder/ConsultationQuoteBuilder.tsx`

**Changes:**
- For services without explicit pricing, show "Offerte op maat" instead of calculated ranges
- Content Production keeps specific prices: €25 (poster AI), €99 (article), €150 (reel AI), €200 (edit), €250 (shoot/video)
- All other services: hide numeric pricing, show custom quote CTA only

### 3. Ensure Discount Logic Remains Correct

**Already Correct:**
- 20% discount applies ONLY to one-time fees
- Monthly subscriptions have ZERO discounts
- Discount valid for 10 days only

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/home/HomeServicesGrid.tsx` | Remove invented price ranges, apply pricing lock |
| `src/components/service-page/quote-builder/ConsultationQuoteBuilder.tsx` | Show "Offerte op maat" for services without explicit pricing |
| `src/i18n/locales/nl.json` | Verify "Offerte op maat" translation exists |
| `src/i18n/locales/en.json` | Verify "Request quote" translation exists |

---

## Summary

**No section reordering is needed.** The homepage and services pages are correctly structured.

**Action Required:** Enforce the pricing lock by:
1. Removing invented price ranges from the homepage services grid
2. Showing "Offerte op maat" for all services except Content Production
3. Keeping Content Production with fixed prices (€25-€250)

This will ensure consistency with the pricing lock rule: **only show prices that were explicitly provided**.

