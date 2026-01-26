import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MapPin,
  Twitter,
  Hash,
  Save,
  ArrowRight,
  Check,
  Plus,
  Minus,
  Info,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { trackEvent } from '@/utils/tracking';
import {
  PlanBuilderState,
  PricingCalculation,
  SelectedAddOn,
  PLAN_BUILDER_CONFIG,
  CHANNELS,
  FREQUENCIES,
  ADS_BUDGETS,
  ADD_ONS,
} from '@/types/planBuilder';

// Helper to get translation key - supports both nested services.planBuilder and root planBuilder
const getPBKey = (key: string) => `planBuilder.${key}`;

// Platform icons mapping
const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: Hash,
  youtube: Youtube,
  google_business: MapPin,
  pinterest: Hash,
  x_twitter: Twitter,
};

const PlanBuilderSocial = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // State
  const [state, setState] = useState<PlanBuilderState>({
    selectedChannels: [],
    selectedFrequency: PLAN_BUILDER_CONFIG.defaultFrequency,
    selectedAdsBudget: PLAN_BUILDER_CONFIG.defaultAdsBudget,
    selectedAddOns: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate pricing
  const pricing: PricingCalculation = useMemo(() => {
    const { selectedChannels, selectedFrequency, selectedAdsBudget, selectedAddOns } = state;

    // Channel fee
    const additionalChannels = Math.max(0, selectedChannels.length - PLAN_BUILDER_CONFIG.includedChannelsCount);
    const channelFee = additionalChannels * PLAN_BUILDER_CONFIG.additionalChannelFee;

    // Frequency fee
    const frequency = FREQUENCIES.find(f => f.id === selectedFrequency);
    const frequencyFee = frequency?.monthlyFee || 0;

    // Add-ons total
    let addOnsTotal = 0;
    selectedAddOns.forEach(selectedAddon => {
      const addon = ADD_ONS.find(a => a.id === selectedAddon.id);
      if (addon) {
        if (addon.pricing.type === 'monthly_fixed') {
          addOnsTotal += addon.pricing.price;
        } else if (addon.pricing.type === 'per_unit' && selectedAddon.units) {
          addOnsTotal += addon.pricing.unitPrice * selectedAddon.units;
        }
      }
    });

    // Management total
    const baseFee = PLAN_BUILDER_CONFIG.managementFeeMinimum;
    const managementTotal = Math.max(
      baseFee,
      baseFee + channelFee + frequencyFee + addOnsTotal
    );

    // Ads budget
    const adsBudgetOption = ADS_BUDGETS.find(a => a.id === selectedAdsBudget);
    const adsBudget = adsBudgetOption?.budgetAmount || 0;

    return {
      baseFee,
      channelFee,
      frequencyFee,
      addOnsTotal,
      managementTotal,
      adsBudget,
    };
  }, [state]);

  // Validation
  useEffect(() => {
    if (state.selectedChannels.length === 0 && currentStep > 1) {
      setValidationError(t('planBuilder.validation.minChannel'));
    } else {
      setValidationError(null);
    }
  }, [state.selectedChannels, currentStep, t]);

  // Handlers
  const handleChannelToggle = (channelId: string) => {
    setState(prev => {
      const newChannels = prev.selectedChannels.includes(channelId)
        ? prev.selectedChannels.filter(c => c !== channelId)
        : [...prev.selectedChannels, channelId];
      
      trackEvent({
        event: 'planbuilder_social_channels',
        location: 'plan_builder',
        label: `channels_${newChannels.length}`,
      });

      return { ...prev, selectedChannels: newChannels };
    });
  };

  const handleFrequencyChange = (frequencyId: string) => {
    setState(prev => ({ ...prev, selectedFrequency: frequencyId }));
    trackEvent({
      event: 'planbuilder_social_frequency',
      location: 'plan_builder',
      label: frequencyId,
    });
  };

  const handleAdsBudgetChange = (budgetId: string) => {
    const budget = ADS_BUDGETS.find(b => b.id === budgetId);
    setState(prev => ({ ...prev, selectedAdsBudget: budgetId }));
    trackEvent({
      event: 'planbuilder_social_ads_budget',
      location: 'plan_builder',
      label: `budget_${budget?.budgetAmount || 0}`,
    });
  };

  const handleAddonToggle = (addonId: string) => {
    setState(prev => {
      const existingIndex = prev.selectedAddOns.findIndex(a => a.id === addonId);
      let newAddOns: SelectedAddOn[];
      
      if (existingIndex >= 0) {
        newAddOns = prev.selectedAddOns.filter(a => a.id !== addonId);
        trackEvent({
          event: 'planbuilder_social_addons',
          location: 'plan_builder',
          label: `removed_${addonId}`,
        });
      } else {
        const addon = ADD_ONS.find(a => a.id === addonId);
        const defaultUnits = addon?.pricing.type === 'per_unit' ? 1 : undefined;
        newAddOns = [...prev.selectedAddOns, { id: addonId, units: defaultUnits }];
        trackEvent({
          event: 'planbuilder_social_addons',
          location: 'plan_builder',
          label: `added_${addonId}`,
        });
      }

      return { ...prev, selectedAddOns: newAddOns };
    });
  };

  const handleAddonUnitsChange = (addonId: string, units: number) => {
    setState(prev => {
      const newAddOns = prev.selectedAddOns.map(a => 
        a.id === addonId ? { ...a, units: Math.max(0, units) } : a
      );
      return { ...prev, selectedAddOns: newAddOns };
    });
  };

  const handleSavePlan = () => {
    const planData = {
      ...state,
      pricing,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('groppi_social_plan', JSON.stringify(planData));
    trackEvent({
      event: 'planbuilder_social_cta_save_plan',
      location: 'plan_builder',
      label: `total_${pricing.managementTotal}`,
    });
  };

  const handleRequestOffer = () => {
    trackEvent({
      event: 'planbuilder_social_cta_custom_offer',
      location: 'plan_builder',
      label: `total_${pricing.managementTotal}_channels_${state.selectedChannels.length}`,
    });
  };

  // Steps config
  const steps = [
    { id: 1, titleKey: 'planBuilder.steps.channels' },
    { id: 2, titleKey: 'planBuilder.steps.frequency' },
    { id: 3, titleKey: 'planBuilder.steps.campaigns' },
    { id: 4, titleKey: 'planBuilder.steps.addons' },
  ];

  // Summary Panel Component
  const SummaryPanel = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold gold-gradient-text">
        {t('planBuilder.summary.title')}
      </h3>

      {/* Price Breakdown */}
      <div className="space-y-3">
        {/* Management Fee */}
        <div className="flex justify-between items-center py-2 border-b border-primary/10">
          <span className="text-muted-foreground text-sm">
            {t('planBuilder.summary.managementFee')}
          </span>
          <span className="font-semibold text-foreground">€{pricing.managementTotal}</span>
        </div>

        {/* Channels breakdown */}
        {state.selectedChannels.length > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {t('planBuilder.summary.channels')} ({state.selectedChannels.length})
            </span>
            <span className="text-muted-foreground">
              {pricing.channelFee > 0 ? `+€${pricing.channelFee}` : t('planBuilder.summary.included')}
            </span>
          </div>
        )}

        {/* Frequency */}
        {pricing.frequencyFee > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {t('planBuilder.summary.frequency')}
            </span>
            <span className="text-muted-foreground">+€{pricing.frequencyFee}</span>
          </div>
        )}

        {/* Add-ons */}
        {pricing.addOnsTotal > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {t('planBuilder.summary.addons')}
            </span>
            <span className="text-muted-foreground">+€{pricing.addOnsTotal}</span>
          </div>
        )}

        {/* Ads Budget (separate line) */}
        {pricing.adsBudget > 0 && (
          <div className="flex justify-between items-center py-2 border-t border-primary/10">
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              {t('planBuilder.summary.adsBudget')}
              <Info className="w-3 h-3" />
            </span>
            <span className="text-muted-foreground text-sm">€{pricing.adsBudget}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('planBuilder.summary.total')}</span>
          <span className="text-2xl font-bold text-primary">€{pricing.managementTotal}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t('planBuilder.vatNote')}
        </p>
      </div>

      {/* Disclaimers */}
      <div className="space-y-2 text-xs text-muted-foreground">
        <p>{t('planBuilder.disclaimer')}</p>
        {pricing.adsBudget > 0 && (
          <p>{t('planBuilder.adsBudgetDisclaimer')}</p>
        )}
        <p>{t('planBuilder.pauseNote')}</p>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-4">
        <Button 
          asChild 
          size="lg" 
          className="w-full luxury-button"
          onClick={handleRequestOffer}
        >
          <Link to="/contact?service=social-media">
            {t('planBuilder.cta.primary')}
            <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full glass-button"
          onClick={handleSavePlan}
        >
          <Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('planBuilder.cta.secondary')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold gold-gradient-text mb-2">
          {t('planBuilder.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('planBuilder.subtitle')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
              currentStep === step.id
                ? 'bg-primary text-primary-foreground'
                : currentStep > step.id
                ? 'bg-primary/20 text-primary'
                : 'bg-muted/30 text-muted-foreground'
            }`}
          >
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-current">
              {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
            </span>
            <span className="hidden sm:inline text-sm">{t(step.titleKey)}</span>
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Steps Column */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Channels */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</span>
                  {t('planBuilder.steps.channels')}
                </h3>

                {validationError && (
                  <p className="text-destructive text-sm mb-4">{validationError}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CHANNELS.map(channel => {
                    const Icon = PLATFORM_ICONS[channel.id] || Hash;
                    const isSelected = state.selectedChannels.includes(channel.id);

                    return (
                      <motion.button
                        key={channel.id}
                        onClick={() => handleChannelToggle(channel.id)}
                        className={`relative p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
                            : 'border-primary/10 bg-muted/10 hover:border-primary/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </motion.div>
                        )}
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium block ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {t(channel.labelKey)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => state.selectedChannels.length > 0 && setCurrentStep(2)}
                    disabled={state.selectedChannels.length === 0}
                    className="luxury-button"
                  >
                    {t('planBuilder.next')}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Frequency */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</span>
                  {t('planBuilder.steps.frequency')}
                </h3>

                <RadioGroup
                  value={state.selectedFrequency}
                  onValueChange={handleFrequencyChange}
                  className="space-y-3"
                >
                  {FREQUENCIES.map(freq => (
                    <Label
                      key={freq.id}
                      htmlFor={freq.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        state.selectedFrequency === freq.id
                          ? 'border-primary bg-primary/10'
                          : 'border-primary/10 bg-muted/10 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={freq.id} id={freq.id} />
                        <span className="font-medium">{t(freq.labelKey)}</span>
                      </div>
                      <Badge variant={freq.monthlyFee === 0 ? 'default' : 'secondary'}>
                        {freq.monthlyFee === 0 
                          ? t('planBuilder.included')
                          : `+€${freq.monthlyFee}`
                        }
                      </Badge>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="glass-button">
                    {t('planBuilder.back')}
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="luxury-button">
                    {t('planBuilder.next')}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Paid Campaigns */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">3</span>
                  {t('planBuilder.steps.campaigns')}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  {t('planBuilder.adsBudgetNote')}
                </p>

                <RadioGroup
                  value={state.selectedAdsBudget}
                  onValueChange={handleAdsBudgetChange}
                  className="space-y-3"
                >
                  {ADS_BUDGETS.map(budget => (
                    <Label
                      key={budget.id}
                      htmlFor={budget.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        state.selectedAdsBudget === budget.id
                          ? 'border-primary bg-primary/10'
                          : 'border-primary/10 bg-muted/10 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={budget.id} id={budget.id} />
                        <span className="font-medium">{t(budget.labelKey)}</span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="glass-button">
                    {t('planBuilder.back')}
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} className="luxury-button">
                    {t('planBuilder.next')}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Add-ons */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">4</span>
                  {t('planBuilder.steps.addons')}
                </h3>

                <div className="space-y-3">
                  {ADD_ONS.map(addon => {
                    const selectedAddon = state.selectedAddOns.find(a => a.id === addon.id);
                    const isSelected = !!selectedAddon;

                    return (
                      <div
                        key={addon.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-primary/10 bg-muted/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={addon.id}
                              checked={isSelected}
                              onCheckedChange={() => handleAddonToggle(addon.id)}
                            />
                            <Label htmlFor={addon.id} className="cursor-pointer">
                              <span className="font-medium">{t(addon.labelKey)}</span>
                            </Label>
                          </div>
                          <Badge variant="secondary">
                            {addon.pricing.type === 'monthly_fixed'
                              ? `€${addon.pricing.price}/m`
                              : `€${addon.pricing.unitPrice}/${t(addon.pricing.unitLabelKey)}`
                            }
                          </Badge>
                        </div>

                        {/* Per-unit quantity input */}
                        {isSelected && addon.pricing.type === 'per_unit' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 flex items-center gap-3"
                          >
                            <span className="text-sm text-muted-foreground">
                              {t('planBuilder.quantity')}:
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleAddonUnitsChange(addon.id, (selectedAddon?.units || 0) - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={selectedAddon?.units || 0}
                                onChange={(e) => handleAddonUnitsChange(addon.id, parseInt(e.target.value) || 0)}
                                className="w-16 text-center h-8"
                                min={addon.minUnits}
                                max={addon.maxUnits}
                              />
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleAddonUnitsChange(addon.id, (selectedAddon?.units || 0) + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              = €{(selectedAddon?.units || 0) * addon.pricing.unitPrice}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(3)} className="glass-button">
                    {t('planBuilder.back')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAQ Section */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">{t('planBuilder.faq.title')}</h3>
            <Accordion type="single" collapsible className="w-full">
              {['adjustLater', 'setupCost', 'adBudgetIncluded'].map((faqKey) => (
                <AccordionItem key={faqKey} value={faqKey} className="border-primary/10">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {t(`planBuilder.faq.${faqKey}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t(`planBuilder.faq.${faqKey}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Summary Column - Desktop */}
        {!isMobile && (
          <div className="hidden lg:block">
            <div className="glass-card p-6 rounded-xl sticky top-24">
              <SummaryPanel />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Summary Sheet */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-primary/20 lg:hidden z-40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">{t('planBuilder.summary.total')}</span>
            <span className="text-xl font-bold text-primary">€{pricing.managementTotal}/m</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full glass-button mb-2">
                {t('planBuilder.viewSummary')}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('planBuilder.summary.title')}</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <SummaryPanel />
              </div>
            </SheetContent>
          </Sheet>
          <Button asChild className="w-full luxury-button" onClick={handleRequestOffer}>
            <Link to="/contact?service=social-media">
              {t('planBuilder.cta.primary')}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanBuilderSocial;
