import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import ServiceGuidedWizard from './ServiceGuidedWizard';

interface ServicesGuidedEntryProps {
  onRecommendationSelect: (serviceId: string) => void;
}

const ServicesGuidedEntry = ({ onRecommendationSelect }: ServicesGuidedEntryProps) => {
  const { t, i18n } = useTranslation();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <>
      <section className="relative py-16 overflow-hidden border-b border-primary/10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
        
        {/* Decorative gold line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6"
              style={{
                boxShadow: '0 0 30px hsl(var(--primary) / 0.15)',
              }}
            >
              <HelpCircle className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold mb-4 gold-shimmer-text"
            >
              {t('services.guidedEntry.title')}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-muted-foreground text-lg mb-8"
            >
              {t('services.guidedEntry.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="luxury-button group relative overflow-hidden"
                onClick={() => setIsWizardOpen(true)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t('services.guidedEntry.ctaPrimary')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="glass-button border-primary/30 hover:border-primary/50"
                onClick={() => {
                  const servicesGrid = document.getElementById('services-grid');
                  servicesGrid?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('services.guidedEntry.ctaSecondary')}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </section>

      {/* Wizard Modal */}
      <ServiceGuidedWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onRecommendationSelect={onRecommendationSelect}
      />
    </>
  );
};

export default ServicesGuidedEntry;
