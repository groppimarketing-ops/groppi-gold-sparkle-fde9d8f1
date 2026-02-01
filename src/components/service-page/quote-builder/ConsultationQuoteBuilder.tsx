import { memo, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Sparkles } from 'lucide-react';
import QuoteBuilderSelectors from './QuoteBuilderSelectors';
import QuoteSummaryCard from './QuoteSummaryCard';
import { useEstimateId } from './useEstimateId';
import { usePromoCountdown } from './usePromoCountdown';
import { TierKey, EstimatePayload, DISCOUNT_PERCENTAGE } from './types';

interface ConsultationQuoteBuilderProps {
  serviceKey: string;
}

// Pricing configuration per service
// PRICING LOCK: Only contentProduction has explicit prices
// All other services show "Offerte op maat"
const SERVICE_PRICING: Record<string, {
  base: Record<TierKey, { min: number; max: number }> | null;
  setup: Record<TierKey, number>;
  options: Record<string, number>;
  showAdBudget: boolean;
  adBudgetModifier: Record<string, number>;
  hasExplicitPricing: boolean;
}> = {
  contentProduction: {
    base: null, // Content production uses item-based pricing, not tier-based
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {
      // Fixed prices as provided
      posterAI: 25,           // €25 (AI-generated)
      posterEdit: 200,        // €200 (client footage, we edit + branding)
      posterShoot: 250,       // €250 (we shoot on-location)
      reelAI: 150,            // €150 (AI-generated)
      reelEdit: 200,          // €200 (client footage, we edit + branding)
      reelShoot: 250,         // €250 (we shoot on-location)
      video1Min: 250,         // €250 (1 minute video)
      article600Words: 99,    // vanaf €99 (600 words article)
    },
    showAdBudget: false,
    adBudgetModifier: {},
    hasExplicitPricing: true,
  },
  // All other services: Offerte op maat (no explicit pricing)
  socialMedia: {
    base: null,
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {},
    showAdBudget: false,
    adBudgetModifier: {},
    hasExplicitPricing: false,
  },
  adsManagement: {
    base: null,
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {},
    showAdBudget: true,
    adBudgetModifier: {},
    hasExplicitPricing: false,
  },
  seo: {
    base: null,
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {},
    showAdBudget: false,
    adBudgetModifier: {},
    hasExplicitPricing: false,
  },
  businessWebsite: {
    base: null,
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {},
    showAdBudget: false,
    adBudgetModifier: {},
    hasExplicitPricing: false,
  },
  ecommerceWebsite: {
    base: null,
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {},
    showAdBudget: false,
    adBudgetModifier: {},
    hasExplicitPricing: false,
  },
};

// Default for unknown services: Offerte op maat
const DEFAULT_PRICING = {
  base: null,
  setup: { starter: 0, growth: 0, pro: 0 },
  options: {},
  showAdBudget: false,
  adBudgetModifier: {},
  hasExplicitPricing: false,
};

const ConsultationQuoteBuilder = memo(({ serviceKey }: ConsultationQuoteBuilderProps) => {
  const { t } = useTranslation();
  const { saveEstimate } = useEstimateId();
  const promoState = usePromoCountdown();

  // State
  const [tierKey, setTierKey] = useState<TierKey | null>('growth');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [adBudget, setAdBudget] = useState<string | null>(null);
  const [currentEstimate, setCurrentEstimate] = useState<EstimatePayload | null>(null);

  // Get pricing config for this service
  const pricingConfig = SERVICE_PRICING[serviceKey] || DEFAULT_PRICING;
  
  // Check if service has explicit pricing (only contentProduction does)
  const hasExplicitPricing = pricingConfig.hasExplicitPricing;

  // Calculate price - only for services with explicit pricing (contentProduction)
  const { priceMin, priceMax, setupFee } = useMemo(() => {
    // For services without explicit pricing, return 0s (we'll show "Offerte op maat")
    if (!hasExplicitPricing) {
      return { priceMin: 0, priceMax: 0, setupFee: 0 };
    }

    // For contentProduction: calculate based on selected items only
    let optionsTotal = 0;
    selectedOptions.forEach(opt => {
      optionsTotal += pricingConfig.options[opt] || 0;
    });

    return {
      priceMin: optionsTotal, // Total of selected items
      priceMax: optionsTotal, // Same for content production (fixed prices)
      setupFee: 0,
    };
  }, [selectedOptions, pricingConfig, hasExplicitPricing]);

  // Toggle option
  const toggleOption = useCallback((option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
    // Clear existing estimate when options change
    setCurrentEstimate(null);
  }, []);

  // Handle tier change
  const handleTierChange = useCallback((tier: TierKey) => {
    setTierKey(tier);
    setCurrentEstimate(null);
  }, []);

  // Handle ad budget change
  const handleAdBudgetChange = useCallback((budget: string) => {
    setAdBudget(budget);
    setCurrentEstimate(null);
  }, []);

  // Check if form is valid
  // For contentProduction: valid if at least one option selected
  // For other services: always valid (shows custom quote CTA)
  const isValid = hasExplicitPricing 
    ? selectedOptions.length > 0 
    : true;

  // Reserve price (create estimate) - only for services with explicit pricing
  const handleReservePrice = useCallback(() => {
    if (!hasExplicitPricing) return; // Should not happen - button won't show
    if (!isValid) return;

    // 20% discount applies ONLY to one-time fees (contentProduction is one-time)
    const discountApplied = promoState.isActive;
    const discountAmount = discountApplied 
      ? Math.round(priceMin * (DISCOUNT_PERCENTAGE / 100))
      : 0;

    const estimate = saveEstimate({
      serviceKey,
      tierKey: tierKey || 'custom',
      options: selectedOptions,
      adBudget,
      priceMin: discountApplied ? Math.round(priceMin * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMin,
      priceMax: discountApplied ? Math.round(priceMax * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMax,
      discountApplied,
      discountAmount,
    });

    setCurrentEstimate(estimate);

    // Scroll to summary on mobile
    const summaryElement = document.getElementById('quote-summary');
    if (summaryElement && window.innerWidth < 1024) {
      summaryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isValid, hasExplicitPricing, tierKey, selectedOptions, adBudget, priceMin, priceMax, promoState.isActive, serviceKey, saveEstimate]);

  return (
    <section id="opties-prijzen" className="relative py-16 lg:py-24 bg-background scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.04] to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary mb-4"
            >
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                {t('quoteBuilder.label')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text mb-3"
            >
              {t('quoteBuilder.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              {t('quoteBuilder.subtitle')}
            </motion.p>

            {/* Promo Badge */}
            {promoState.isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  {t('quoteBuilder.promoBadge', { percent: DISCOUNT_PERCENTAGE })} — nog {promoState.formatTimeRemaining()}
                </span>
              </motion.div>
            )}
          </div>

          {/* Main Content: Two Columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Left: Selectors (3 cols) */}
            <div className="lg:col-span-3 glass-card p-6 lg:p-8 rounded-2xl border-primary/20">
              <QuoteBuilderSelectors
                serviceKey={serviceKey}
                tierKey={tierKey}
                setTierKey={handleTierChange}
                selectedOptions={selectedOptions}
                toggleOption={toggleOption}
                adBudget={adBudget}
                setAdBudget={handleAdBudgetChange}
                showAdBudget={pricingConfig.showAdBudget}
                availableOptions={Object.keys(pricingConfig.options)}
              />
            </div>

            {/* Right: Summary Card (2 cols) */}
            <div id="quote-summary" className="lg:col-span-2">
              <QuoteSummaryCard
                serviceKey={serviceKey}
                tierKey={tierKey}
                selectedOptions={selectedOptions}
                adBudget={adBudget}
                priceMin={priceMin}
                priceMax={priceMax}
                setupFee={setupFee}
                isPromoActive={promoState.isActive}
                promoTimeRemaining={promoState.formatTimeRemaining()}
                currentEstimate={currentEstimate}
                onReservePrice={handleReservePrice}
                isValid={isValid}
                hasExplicitPricing={hasExplicitPricing}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ConsultationQuoteBuilder.displayName = 'ConsultationQuoteBuilder';

export default ConsultationQuoteBuilder;
