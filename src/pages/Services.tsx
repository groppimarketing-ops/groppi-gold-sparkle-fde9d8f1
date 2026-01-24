import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Crown, Diamond, Star, Gem, Award, Zap, Brain, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const services = [
    {
      icon: Brain,
      title: 'AI Solutions',
      titleAr: 'حلول الذكاء الاصطناعي',
      description: 'Cutting-edge AI-powered solutions for your business transformation.',
      descriptionAr: 'حلول ذكاء اصطناعي متطورة لتحويل أعمالك.',
      features: ['Machine Learning', 'Neural Networks', 'Automation'],
      gradient: 'from-purple-500/20 to-blue-500/20',
    },
    {
      icon: Crown,
      title: 'Premium Consulting',
      titleAr: 'استشارات متميزة',
      description: 'Expert guidance for your business growth and development.',
      descriptionAr: 'إرشادات خبراء لنمو وتطوير أعمالك.',
      features: ['Strategic Planning', 'Market Analysis', 'Growth Strategy'],
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      icon: Diamond,
      title: 'Luxury Products',
      titleAr: 'منتجات فاخرة',
      description: 'Exclusive collection of premium quality products.',
      descriptionAr: 'مجموعة حصرية من المنتجات عالية الجودة.',
      features: ['Handcrafted Items', 'Premium Materials', 'Exclusive Designs'],
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    {
      icon: Rocket,
      title: 'Digital Innovation',
      titleAr: 'الابتكار الرقمي',
      description: 'Transform your digital presence with innovative solutions.',
      descriptionAr: 'حوّل تواجدك الرقمي بحلول مبتكرة.',
      features: ['Web Development', 'Mobile Apps', 'Cloud Solutions'],
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
    {
      icon: Star,
      title: 'VIP Experience',
      titleAr: 'تجربة VIP',
      description: 'Exclusive treatment and premium benefits for valued clients.',
      descriptionAr: 'معاملة حصرية ومزايا متميزة للعملاء الكرام.',
      features: ['Priority Access', 'Personal Concierge', 'Exclusive Events'],
      gradient: 'from-yellow-500/20 to-amber-500/20',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      titleAr: 'نشر سريع',
      description: 'Fast and efficient implementation of your projects.',
      descriptionAr: 'تنفيذ سريع وفعال لمشاريعك.',
      features: ['Quick Setup', 'Agile Methods', '24/7 Support'],
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('services.subtitle')}
            title={t('services.title')}
            description={t('services.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                />
                
                {/* Icon */}
                <motion.div 
                  className="relative w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6 icon-3d"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="relative text-xl font-bold mb-3 group-hover:gold-gradient-text transition-all duration-300">
                  {isRtl ? service.titleAr : service.title}
                </h3>
                
                <p className="relative text-muted-foreground mb-6">
                  {isRtl ? service.descriptionAr : service.description}
                </p>
                
                <ul className="relative space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="ghost"
                  className="relative group/btn text-primary hover:text-primary p-0"
                >
                  {t('blog.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="p-8 md:p-12 text-center">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 30px hsl(43 100% 50% / 0.2)',
                    '0 0 60px hsl(43 100% 50% / 0.4)',
                    '0 0 30px hsl(43 100% 50% / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-10 h-10 text-primary animate-glitch" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
                Powered by AI
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Experience the future of business with our AI-powered solutions. 
                We leverage cutting-edge technology to deliver exceptional results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="luxury-button">
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="glass-button">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
              Ready to Experience Excellence?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="luxury-button">
                <Link to="/contact">
                  {t('hero.ctaSecondary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="glass-button">
                <Link to="/franchise">
                  {t('nav.franchise')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
