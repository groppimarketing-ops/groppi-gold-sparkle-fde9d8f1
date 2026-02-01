
# Social Media Plan Builder Implementation Plan

## Overview
Create an interactive multi-step pricing calculator for the Social Media Management service. This calculator will be integrated as a new tab ("Plan samenstellen") within the ServiceDetailModal specifically for the `social-media` service.

---

## Architecture

```text
+---------------------------+
| ServiceDetailModal.tsx    |
+---------------------------+
      |
      +-- Tab: Plan Builder (NEW)
           |
           +-- PlanBuilderSocial.tsx (NEW COMPONENT)
                |
                +-- Step 1: Channel Selection (multi-select)
                +-- Step 2: Post Frequency (single-select)
                +-- Step 3: Paid Campaigns (single-select)
                +-- Step 4: Add-ons (multi-select with units)
                +-- Summary Panel (sticky on desktop)
                +-- FAQ Accordion
```

---

## Files to Create

### 1. `src/components/services/PlanBuilderSocial.tsx`
Main component for the pricing calculator featuring:
- Two-column layout (steps on left, summary on right)
- Progress indicator showing current step
- State management for all selections
- Real-time price calculation
- Mobile-responsive design (summary becomes bottom sheet)
- RTL support for Arabic

### 2. `src/types/planBuilder.ts`
TypeScript interfaces for:
- Channel options
- Frequency options
- Paid campaign options
- Add-on options (with per-unit and fixed pricing)
- Calculator state

---

## Files to Modify

### 1. `src/components/services/ServiceDetailModal.tsx`
Changes:
- Import the new PlanBuilderSocial component
- Add conditional tab trigger for `social-media` service
- Add TabsContent rendering the PlanBuilderSocial component
- Adjust grid columns for 4 tabs when showing plan builder

### 2. `src/utils/tracking.ts`
Changes:
- Add new tracking event types:
  - `planbuilder_social_channels`
  - `planbuilder_social_frequency`
  - `planbuilder_social_ads_budget`
  - `planbuilder_social_addons`
  - `planbuilder_social_cta_custom_offer`
  - `planbuilder_social_cta_save_plan`

### 3. `src/i18n/locales/nl.json`
Add new namespace `services.planBuilder` with:
- Title and subtitle
- Step titles (channels, frequency, campaigns, addons)
- All option labels
- Pricing labels
- Summary labels
- Disclaimer texts
- FAQ items
- CTA button labels

### 4. `src/i18n/locales/en.json`
English translations for the plan builder

### 5. `src/i18n/locales/ar.json`
Arabic translations for the plan builder (RTL support)

---

## Component Implementation Details

### Step 1: Channel Selection
- Multi-select with checkboxes
- Options: Facebook, Instagram, LinkedIn, TikTok, YouTube, Google Business, Pinterest, X (Twitter)
- Validation: minimum 1 channel required
- Visual: Glass cards with platform icons and gold selection states

### Step 2: Post Frequency
- Single-select radio options
- Options: 2/month, 1/week, 2/week, 3/week, 4/week, 5/week
- Default: 2 posts per month

### Step 3: Paid Campaigns (Optional)
- Single-select radio options
- Options: None, 100/month, 250/month, 500/month, 1000/month
- Note about direct platform payment displayed
- Default: No paid campaigns

### Step 4: Add-ons
- Multi-select with optional quantity input for per-unit items
- Fixed pricing items:
  - Google Review Management (89/month)
  - Email Marketing Campaigns (199/month)
  - Social Media Posts 10-pack (150/month)
  - Advanced Analytics Dashboard (149/month)
- Per-unit pricing items:
  - Extra Product Photos (25/photo)
  - Content Writing (50/hour)

---

## Pricing Calculation Logic

```text
Base Management Fee: 400 EUR (minimum)

Additional Channels: (selected_count - 1) * 60 EUR
  - First channel is included in base fee

Frequency Fee:
  - 2/month: +0 EUR (included)
  - 1/week: +120 EUR
  - 2/week: +250 EUR
  - 3/week: +380 EUR
  - 4/week: +520 EUR
  - 5/week: +650 EUR

Add-ons Total:
  - Sum of all selected fixed-price add-ons
  - Sum of (unit_count * unit_price) for per-unit add-ons

Management Total: MAX(400, 400 + channel_fee + frequency_fee + addons_total)

Ad Budget: Displayed separately (paid directly to platforms)
```

---

## Summary Panel Features

Display the following lines:
1. Estimated Management Fee (calculated total)
2. Channels breakdown (X channels at 60/channel from 2nd)
3. Post Frequency fee
4. Add-ons subtotal
5. Ad Budget (separate line - paid directly)
6. **Monthly Total** (management only, excl. VAT)

Notes displayed:
- "excl. btw" (VAT notice)
- Ad budget disclaimer
- Pause/stop flexibility note

CTA Buttons:
1. Primary: "Vraag een voorstel op maat aan" (opens Contact page with pre-filled service)
2. Secondary: "Plan opslaan" (saves to localStorage for later)

---

## Tracking Events

| Action | Event Name | Parameters |
|--------|------------|------------|
| Channel selection change | planbuilder_social_channels | channels_count, channels_list |
| Frequency selection | planbuilder_social_frequency | frequency_id |
| Ads budget selection | planbuilder_social_ads_budget | budget_amount |
| Add-on toggle | planbuilder_social_addons | addon_id, action (add/remove) |
| Request Custom Offer | planbuilder_social_cta_custom_offer | total_estimate, channels, frequency |
| Save Plan | planbuilder_social_cta_save_plan | total_estimate |

---

## UI/UX Design

- **Theme**: Dark background with gold accents (groopy-dark-gold)
- **Cards**: Glassmorphism styling matching existing components
- **Progress**: Step indicators with completed/current/upcoming states
- **Selection States**: Gold border glow on selected options
- **Animations**: Framer Motion for step transitions and selections
- **Mobile**: Summary panel collapses to bottom sticky bar
- **RTL**: Full RTL support for Arabic with mirrored layout

---

## FAQ Section

Accordion with 3 questions:
1. "Kan ik mijn plan later aanpassen?" / "هل أقدر أعدل الخطة لاحقًا؟"
2. "Is er een opstartkost?" / "هل في تكلفة إعداد؟"
3. "Is advertentiebudget inbegrepen?" / "هل ميزانية الإعلانات مشمولة؟"

---

## Technical Notes

- Uses existing UI components: Checkbox, RadioGroup, Accordion, Button, Badge
- State stored in local component state (React useState)
- Optional localStorage persistence for "Save Plan" feature
- No backend/database integration required
- No checkout flow - leads to contact form only
- Pricing is indicative only - disclaimer always visible
