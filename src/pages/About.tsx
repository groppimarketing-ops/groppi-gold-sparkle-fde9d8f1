import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Clock, Sparkles, TrendingUp, Globe, Zap } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const values = [
    { icon: Award, title: 'Excellence', titleAr: 'التميز', description: 'We strive for perfection in everything we do.', color: 'from-amber-500/20 to-orange-500/20' },
    { icon: Heart, title: 'Integrity', titleAr: 'النزاهة', description: 'Honesty and transparency guide our actions.', color: 'from-pink-500/20 to-rose-500/20' },
    { icon: Zap, title: 'Innovation', titleAr: 'الابتكار', description: 'Constantly evolving to meet modern demands.', color: 'from-purple-500/20 to-blue-500/20' },
    { icon: Users, title: 'Customer Focus', titleAr: 'التركيز على العميل', description: 'Your satisfaction is our top priority.', color: 'from-cyan-500/20 to-teal-500/20' },
  ];

  const stats = [
    { value: '130+', label: isRtl ? 'سنة من التميز' : 'Years of Excellence', icon: Clock },
    { value: '50K+', label: isRtl ? 'عميل سعيد' : 'Happy Customers', icon: Users },
    { value: '100+', label: isRtl ? 'فريق خبراء' : 'Expert Team', icon: Award },
    { value: '25+', label: isRtl ? 'دولة' : 'Countries', icon: Globe },
  ];

  const timeline = [
    { year: '1891', title: 'Foundation', titleAr: 'التأسيس', description: 'Groppi was founded with a vision of excellence.' },
    { year: '1920', title: 'Expansion', titleAr: 'التوسع', description: 'Expanded operations across the Middle East.' },
    { year: '1960', title: 'Innovation', titleAr: 'الابتكار', description: 'Introduced modern techniques while preserving tradition.' },
    { year: '2000', title: 'Global Reach', titleAr: 'الانتشار العالمي', description: 'Became an internationally recognized brand.' },
    { year: '2024', title: 'AI Era', titleAr: 'عصر الذكاء الاصطناعي', description: 'Embracing AI technology to serve customers worldwide.' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('about.subtitle')}
            title={t('about.title')}
            description={t('about.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-8"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <stat.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold gold-shimmer-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6"
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                    '0 0 40px hsl(43 100% 50% / 0.4)',
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient-text">
                {t('about.mission')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </GlassCard>

            <GlassCard
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6"
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                    '0 0 40px hsl(43 100% 50% / 0.4)',
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Eye className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient-text">
                {t('about.vision')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.visionText')}
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={isRtl ? 'رحلتنا' : 'Our Journey'}
            title={isRtl ? 'التاريخ والإنجازات' : 'History & Milestones'}
            showSparkle
          />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent -translate-x-1/2" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <GlassCard className="inline-block p-6">
                    <div className="text-2xl font-bold gold-gradient-text mb-2">
                      {item.year}
                    </div>
                    <h4 className="font-semibold text-lg mb-1">
                      {isRtl ? item.titleAr : item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </GlassCard>
                </div>
                
                <motion.div 
                  className="w-4 h-4 rounded-full bg-primary shrink-0 z-10 gold-glow"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={isRtl ? 'ما نؤمن به' : 'What We Stand For'}
            title={t('about.values')}
            showSparkle
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <motion.div 
                  className="relative w-12 h-12 rounded-xl glass-card flex items-center justify-center mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <value.icon className="w-6 h-6 text-primary" />
                </motion.div>
                
                <h4 className="relative font-bold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {isRtl ? value.titleAr : value.title}
                </h4>
                
                <p className="relative text-muted-foreground text-sm">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
