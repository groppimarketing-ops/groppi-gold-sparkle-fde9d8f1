import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Target, Building2, Users, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ServiceGuidedWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendationSelect: (serviceId: string) => void;
}

type WizardStep = 'goal' | 'size' | 'team' | 'result';

interface WizardState {
  goal: 'visibility' | 'leads' | 'sales' | null;
  size: 'starter' | 'growing' | 'established' | null;
  team: 'yes' | 'no' | null;
}

const ServiceGuidedWizard = ({
  isOpen,
  onClose,
  onRecommendationSelect,
}: ServiceGuidedWizardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  
  const [currentStep, setCurrentStep] = useState<WizardStep>('goal');
  const [state, setState] = useState<WizardState>({
    goal: null,
    size: null,
    team: null,
  });

  const steps: WizardStep[] = ['goal', 'size', 'team', 'result'];
  const currentStepIndex = steps.indexOf(currentStep);

  // Recommendation logic based on answers
  const recommendedService = useMemo(() => {
    if (state.goal === 'visibility') {
      if (state.size === 'starter') return 'social-media';
      if (state.size === 'growing') return 'content-production';
      return 'seo';
    }
    if (state.goal === 'leads') {
      if (state.team === 'no') return 'social-media';
      return 'ads-management';
    }
    if (state.goal === 'sales') {
      if (state.size === 'starter') return 'one-page-website';
      if (state.size === 'growing') return 'business-website';
      return 'ecommerce-website';
    }
    return 'social-media';
  }, [state]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleClose = () => {
    setCurrentStep('goal');
    setState({ goal: null, size: null, team: null });
    onClose();
  };

  const handleViewRecommendation = () => {
    onRecommendationSelect(recommendedService);
    handleClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'goal':
        return state.goal !== null;
      case 'size':
        return state.size !== null;
      case 'team':
        return state.team !== null;
      default:
        return true;
    }
  };

  const getServiceTitle = (id: string): string => {
    const titleMap: Record<string, string> = {
      'social-media': 'services.items.social.title',
      'content-production': 'services.items.contentProduction.title',
      'seo': 'services.items.seo.title',
      'ads-management': 'services.items.ads.title',
      'one-page-website': 'services.items.onePage.title',
      'business-website': 'services.items.businessWebsite.title',
      'ecommerce-website': 'services.items.ecommerce.title',
    };
    return t(titleMap[id] || titleMap['social-media']);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-2xl border border-primary/20 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background) / 0.98), hsl(var(--background) / 0.95))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px hsl(var(--primary) / 0.15), inset 0 0 80px hsl(var(--primary) / 0.03)',
          }}
        >
          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Progress Indicator */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-center gap-2">
              {steps.slice(0, -1).map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      index < currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : index === currentStepIndex
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                    initial={false}
                    animate={{
                      scale: index === currentStepIndex ? 1.1 : 1,
                    }}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  {index < steps.length - 2 && (
                    <div className={`w-8 h-0.5 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted/30'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Goal */}
              {currentStep === 'goal' && (
                <motion.div
                  key="goal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t('services.wizard.goal.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.wizard.goal.subtitle')}</p>
                  </div>

                  <RadioGroup
                    value={state.goal || ''}
                    onValueChange={(value) => setState({ ...state, goal: value as WizardState['goal'] })}
                    className="space-y-3"
                  >
                    {['visibility', 'leads', 'sales'].map((option) => (
                      <motion.div
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Label
                          htmlFor={option}
                          className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            state.goal === option
                              ? 'glass-card border-2 border-primary bg-primary/5'
                              : 'glass-card border border-transparent hover:border-primary/30'
                          }`}
                        >
                          <RadioGroupItem value={option} id={option} />
                          <span className="font-medium">{t(`services.wizard.goal.options.${option}`)}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 2: Company Size */}
              {currentStep === 'size' && (
                <motion.div
                  key="size"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t('services.wizard.size.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.wizard.size.subtitle')}</p>
                  </div>

                  <RadioGroup
                    value={state.size || ''}
                    onValueChange={(value) => setState({ ...state, size: value as WizardState['size'] })}
                    className="space-y-3"
                  >
                    {['starter', 'growing', 'established'].map((option) => (
                      <motion.div
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Label
                          htmlFor={option}
                          className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            state.size === option
                              ? 'glass-card border-2 border-primary bg-primary/5'
                              : 'glass-card border border-transparent hover:border-primary/30'
                          }`}
                        >
                          <RadioGroupItem value={option} id={option} />
                          <span className="font-medium">{t(`services.wizard.size.options.${option}`)}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 3: Marketing Team */}
              {currentStep === 'team' && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t('services.wizard.team.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.wizard.team.subtitle')}</p>
                  </div>

                  <RadioGroup
                    value={state.team || ''}
                    onValueChange={(value) => setState({ ...state, team: value as WizardState['team'] })}
                    className="space-y-3"
                  >
                    {['yes', 'no'].map((option) => (
                      <motion.div
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Label
                          htmlFor={option}
                          className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            state.team === option
                              ? 'glass-card border-2 border-primary bg-primary/5'
                              : 'glass-card border border-transparent hover:border-primary/30'
                          }`}
                        >
                          <RadioGroupItem value={option} id={option} />
                          <span className="font-medium">{t(`services.wizard.team.options.${option}`)}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {/* Result */}
              {currentStep === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px hsl(var(--primary) / 0.2)',
                        '0 0 40px hsl(var(--primary) / 0.4)',
                        '0 0 20px hsl(var(--primary) / 0.2)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="w-8 h-8 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2">{t('services.wizard.result.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{t('services.wizard.result.subtitle')}</p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-xl border-2 border-primary/30 mb-6"
                    style={{
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.15)',
                    }}
                  >
                    <p className="text-sm text-muted-foreground mb-2">{t('services.wizard.result.recommendation')}</p>
                    <h4 className="text-2xl font-bold gold-shimmer-text">
                      {getServiceTitle(recommendedService)}
                    </h4>
                  </motion.div>

                  <Button
                    size="lg"
                    className="luxury-button w-full"
                    onClick={handleViewRecommendation}
                  >
                    {t('services.wizard.result.cta')}
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {currentStep !== 'result' && (
            <div className="px-6 pb-6 flex gap-3">
              {currentStep !== 'goal' && (
                <Button
                  variant="outline"
                  className="glass-button flex-1"
                  onClick={handleBack}
                >
                  <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                  {t('common.back')}
                </Button>
              )}
              <Button
                className={`luxury-button ${currentStep === 'goal' ? 'w-full' : 'flex-1'}`}
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {t('common.next')}
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceGuidedWizard;
