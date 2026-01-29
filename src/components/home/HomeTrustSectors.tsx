import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UtensilsCrossed, 
  Sofa, 
  Store, 
  ShoppingCart, 
  Building2, 
  Sparkles, 
  Wrench, 
  Rocket,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectorIcons = {
  restaurant: UtensilsCrossed,
  interior: Sofa,
  retail: Store,
  ecommerce: ShoppingCart,
  realEstate: Building2,
  health: Sparkles,
  services: Wrench,
  sme: Rocket,
};

const HomeTrustSectors = () => {
  const { t } = useTranslation();

  const sectors = [
    { key: 'restaurant', icon: sectorIcons.restaurant },
    { key: 'interior', icon: sectorIcons.interior },
    { key: 'retail', icon: sectorIcons.retail },
    { key: 'ecommerce', icon: sectorIcons.ecommerce },
    { key: 'realEstate', icon: sectorIcons.realEstate },
    { key: 'health', icon: sectorIcons.health },
    { key: 'services', icon: sectorIcons.services },
    { key: 'sme', icon: sectorIcons.sme },
  ];

  const proofPoints = [
    t('home.trustSectors.proofPoints.experience'),
    t('home.trustSectors.proofPoints.pricing'),
    t('home.trustSectors.proofPoints.system'),
    t('home.trustSectors.proofPoints.leads'),
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-grid');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 neural-bg opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-medium tracking-wider uppercase"
            >
              {t('home.trustSectors.eyebrow')}
            </motion.span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="gold-gradient-text">
                {t('home.trustSectors.headline')}
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t('home.trustSectors.subheadline')}
            </p>

            {/* Proof Points */}
            <ul className="space-y-4">
              {proofPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* NDA Note */}
            <p className="text-sm text-muted-foreground/70 italic">
              {t('home.trustSectors.note')}
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={scrollToServices}
                className="luxury-button text-primary-foreground px-8 py-6 text-base rounded-xl"
              >
                {t('home.trustSectors.cta')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Sector Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="group glass-card p-5 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.12)] transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:border-primary/40 transition-colors">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {t(`home.trustSectors.sectors.${sector.key}.title`)}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-muted-foreground">
                    {t(`home.trustSectors.sectors.${sector.key}.subtitle`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrustSectors;
