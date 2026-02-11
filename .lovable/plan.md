

# Complete i18n Translations: Remaining 9 Languages

## Current Status

| Language | File | Lines | Coverage | Missing |
|----------|------|-------|----------|---------|
| Spanish | es.json | 828 | ~30% | ~2000 lines |
| German | de.json | 1025 | ~37% | ~1800 lines |
| Polish | pl.json | 847 | ~30% | ~2000 lines |
| Russian | ru.json | 680 | ~24% | ~2100 lines |
| Bengali | bn.json | 594 | ~21% | ~2200 lines |
| Hindi | hi.json | 593 | ~21% | ~2200 lines |
| Urdu | ur.json | 677 | ~24% | ~2100 lines |
| Chinese | zh.json | 676 | ~24% | ~2100 lines |
| Portuguese | pt.json | 1164 | ~41% | ~1650 lines |

**Already completed:** nl.json (100%), en.json (100%), fr.json (100%), it.json (100%), ar.json (100%), tr.json (100%)

## What's Missing (Common Across All 9 Files)

The service cards on /services and service detail pages are the most visible problem. Here are ALL missing sections:

### Service Page Keys (why cards don't translate)
- `services.card.watchVideo`, `buildPlan`, `calculatorHint`
- `services.badges.monthly`, `oneTime`, `custom`, `mostChosen`
- `services.goalEntry.*` -- goal-based entry cards
- `services.wizard.*` -- guided wizard steps
- `services.simpleExplanation.*` -- one-line explanations per service
- `services.guidedEntry.*` -- guided entry section
- `services.microGuidance.*` -- micro guidance tooltips
- `services.videoModal.*` -- video modal with bullets per service
- `services.ads.*` -- full ads budget framework (goals, transparency, salesFlow, faq)
- `services.items.onePage`, `mobileApp` and deep `packages` sub-keys

### Service Detail Pages (11 full pages)
- `servicePage.socialMedia.*`
- `servicePage.adsManagement.*`
- `servicePage.contentProduction.*`
- `servicePage.seo.*`
- `servicePage.businessWebsite.*`
- `servicePage.onePageWebsite.*`
- `servicePage.ecommerceWebsite.*`
- `servicePage.branding.*`
- `servicePage.mobileAppDevelopment.*`
- `servicePage.reputation.*`
- `servicePage.dataSync.*`
- `servicePage.calculator.*` (businessTypes, goals, packages, addons, whatsappTemplate)
- `servicePage.faq.*`, `servicePage.finalCTA.*`, `servicePage.pricingFAQ.*`, `servicePage.generalFAQ.*`, `servicePage.servicesFAQ.*`

### Other Major Sections
- `home.serviceMap.*` -- 4-column service overview
- `home.clientLogoMarquee.*` -- client logos + testimonials
- `home.trustSectors.*` -- sector trust section with 10 sectors
- `home.trustedBelgium.*` -- trusted Belgium section with countries
- `planBuilder.*` -- full social media plan builder (channels, frequency, addons, summary, FAQ)
- `partner.*` -- full partner/franchise page (hero, clarity, forWho, value, howItWorks, FAQ, apply, booking)
- `caseStudy.*` -- labels + 8 case study translations
- `social.*` -- WhatsApp, call, email, follow links
- `about` deep keys -- hero, whoWeAre, approach, valuesSection, cta
- `footer.planCall`, `footer.newsletter` expansion
- `forms.*` -- form labels
- `common` expansion (cancel, save, delete, etc.)
- `validation.phone`, `validation.invalidUrl`

## Implementation Plan

Due to the massive scope (~18,000 lines total), this will be done in batches of 1-2 languages per message:

### Batch 3: Spanish (es.json)
Add all missing sections listed above. Spanish already has partial `about`, `services.items`, `blog`, `portfolio.items`, `contact`, `footer`, `calculator` -- needs all `servicePage.*`, `planBuilder`, `partner`, `caseStudy`, `social`, `home.serviceMap`, `home.trustSectors`, `home.trustedBelgium`, `home.clientLogoMarquee`, and deep `services` keys.

### Batch 4: German (de.json)
Same scope. German has partial coverage similar to Spanish.

### Batch 5: Polish (pl.json)
Same scope.

### Batch 6: Russian (ru.json)
Same scope.

### Batch 7: Bengali (bn.json) + Hindi (hi.json)
These are the smallest files. Will need nearly all sections added.

### Batch 8: Urdu (ur.json) + Chinese (zh.json)
Same scope. Urdu is RTL like Arabic.

### Batch 9: Portuguese (pt.json)
Portuguese is the most complete of the remaining files at 41%. Still needs servicePage, planBuilder, partner, caseStudy, home.serviceMap, home.trustSectors, etc.

## Technical Notes

- No code changes needed -- all components already use `t()` correctly
- The service cards use keys like `services.simpleExplanation.social_media`, `services.card.watchVideo`, `services.badges.monthly` -- these are missing in all 9 files
- Service detail pages use `servicePage.socialMedia.title`, `servicePage.socialMedia.benefits.1`, etc. -- completely missing
- The fallback to Dutch/English is why untranslated text appears
- Each file will be rewritten with full parity to nl.json's 2806 lines

