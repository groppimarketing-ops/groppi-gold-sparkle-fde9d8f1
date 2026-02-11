
# Full i18n Parity Fix: Complete All 15 Locale Files

## The Problem

Your `nl.json` base file has **2806 lines** of translations. Most other locale files are drastically incomplete:

| File | Lines | Coverage |
|------|-------|----------|
| nl.json | 2806 | 100% (base) |
| en.json | ~2800 | ~100% |
| fr.json | ~2800 | ~100% |
| it.json | ~2800 | ~100% |
| ar.json | 1990 | ~71% |
| tr.json | 1062 | ~38% |
| pl.json | 847 | ~30% |
| es.json | 828 | ~30% |
| de.json | ~800 | ~28% |
| ru.json | ~850 | ~30% |
| bn.json | ~850 | ~30% |
| hi.json | ~850 | ~30% |
| ur.json | ~850 | ~30% |
| zh.json | ~850 | ~30% |
| pt.json | ~850 | ~30% |

## What's Missing

The incomplete files only have translations for `nav`, `careers`, `home` (recently added), and some `services` basics. They are completely missing:

- **about** - Entire About Us page (hero, whoWeAre, approach, timeline, values, stats, CTA)
- **services** (deep keys) - items, modal, videoModal, wizard, guidedEntry, microGuidance, ads (budget framework), process, CTA
- **servicePage** - All 10+ service detail pages (socialMedia, adsManagement, contentProduction, SEO, businessWebsite, onePageWebsite, ecommerceWebsite, branding, mobileAppDevelopment, reputation, dataSync) with their benefits, deliverables, process steps, calculator, FAQ
- **contact** - Full contact form labels, placeholders, success/error messages
- **footer** - Description, links, newsletter section
- **blog** - Article titles, excerpts, full content, meta descriptions
- **gallery/portfolio** - Page-level keys, filters, modal labels
- **portfolio.items** - All 20+ project case studies (challenge, approach, results for each)
- **partner** - Full franchise/partner page (hero, clarity, forWho, value, howItWorks, FAQ, apply, booking)
- **caseStudy** - Labels and 8 case study translations
- **planBuilder** - Full social media plan builder (steps, channels, frequency, addons, summary, CTA, FAQ)
- **calculator** - Payment types, steps, business types, goals, packages, addons, WhatsApp templates
- **pricing** - From, VAT notes
- **common** - Additional utility strings
- **social** - WhatsApp, call, email, follow links
- **stats** - Years, clients, projects, team values
- **admin** - Dashboard, articles, media labels
- **validation** - Form validation messages
- **servicesHome** - Card labels, badges

## The Plan

Due to the massive scope (each incomplete file needs ~2000 lines of new translations), I will work through the files systematically in batches:

### Batch 1: Arabic (ar.json) - Complete remaining ~30%
Arabic is already at 71% and is the RTL language, making it high priority. Missing sections: `servicePage.*` (all 10 service pages), `planBuilder.*`, `calculator.*` deep keys, some `portfolio.items.*` entries.

### Batch 2: Turkish (tr.json) - Add ~62% missing content
Missing almost all sections beyond nav, careers, and home. Will add: about, services (deep), servicePage (all), contact, footer, blog, gallery, portfolio.items, partner, caseStudy, planBuilder, calculator, pricing, common, social, stats, admin, validation.

### Batch 3: Spanish (es.json) - Add ~70% missing content
Same scope as Turkish.

### Batch 4: German (de.json) - Add ~72% missing content
Same scope.

### Batch 5: Polish (pl.json) - Add ~70% missing content
Same scope.

### Batch 6: Russian (ru.json) - Add ~70% missing content
Same scope.

### Batch 7: Bengali (bn.json), Hindi (hi.json), Urdu (ur.json), Chinese (zh.json), Portuguese (pt.json)
Same scope for remaining 5 files.

### Quality Checks
- Every key in `nl.json` will have a corresponding key in all 14 other files
- No hardcoded text will remain -- all components already use `t()` calls
- RTL languages (ar, ur) will continue working with the existing RTL system
- The fallback chain (current lang -> nl -> en) will catch any edge cases

## Technical Notes

- The i18n config, language switcher, RTL handling, and `t()` usage in components are all already correct
- The ONLY issue is missing keys in the locale JSON files
- The `parseMissingKeyHandler` in `i18n/config.ts` falls back to English or Dutch, which is why you see Dutch text when switching languages -- the keys simply don't exist in those files
- No code changes needed outside the locale files

## Important Note on Scope

This is a very large task -- approximately **24,000+ lines of translations** need to be added across 12 files. I will need multiple messages to complete this. I recommend we proceed batch by batch, starting with the most important languages for your audience.
