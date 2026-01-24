import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, CreditCard, MessageSquare, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface ServiceData {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  gradient: string;
  pricingType: 'one_time' | 'monthly' | 'custom';
  priceMin?: number;
  priceMax?: number;
  videoUrl?: string;
  imageUrl?: string;
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

  const getPricingBadge = () => {
    switch (service.pricingType) {
      case 'monthly':
        return (
          <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
            <Calendar className="w-3 h-3" />
            {t('services.monthly')}
          </Badge>
        );
      case 'one_time':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 gap-1">
            <CreditCard className="w-3 h-3" />
            {t('services.oneTime')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1">
            <MessageSquare className="w-3 h-3" />
            {t('services.customQuote')}
          </Badge>
        );
    }
  };

  const getPriceRange = () => {
    if (service.pricingType === 'custom') {
      return t('services.requestQuote');
    }
    if (service.priceMin && service.priceMax) {
      return `€${service.priceMin.toLocaleString()} - €${service.priceMax.toLocaleString()}`;
    }
    if (service.priceMin) {
      return `${t('services.startingFrom')} €${service.priceMin.toLocaleString()}`;
    }
    return t('services.requestQuote');
  };

  return (
    <GlassCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden flex flex-col h-full"
    >
      {/* Gradient Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
      />

      {/* Image/Video Section */}
      {(service.imageUrl || service.videoUrl) && (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-video overflow-hidden rounded-t-2xl">
          {showVideo && service.videoUrl ? (
            <video
              src={service.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src={service.imageUrl || '/placeholder.svg'}
                alt={t(service.titleKey)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {service.videoUrl && (
                <motion.button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary fill-primary" />
                  </div>
                </motion.button>
              )}
            </>
          )}
        </div>
      )}

      {/* Pricing Badge */}
      <div className="relative flex items-center justify-between mb-4">
        {getPricingBadge()}
        <span className="text-sm font-semibold text-primary">
          {getPriceRange()}
        </span>
      </div>

      {/* Icon */}
      <motion.div 
        className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4 icon-3d"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <service.icon className="w-7 h-7 text-primary" />
      </motion.div>
      
      {/* Title */}
      <h3 className="relative text-xl font-bold mb-3 group-hover:gold-gradient-text transition-all duration-300">
        {t(service.titleKey)}
      </h3>
      
      {/* Description */}
      <p className="relative text-muted-foreground mb-4 text-sm leading-relaxed">
        {t(service.descriptionKey)}
      </p>
      
      {/* Features */}
      <ul className="relative space-y-2 mb-6 flex-grow">
        {service.features.map((featureKey, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow flex-shrink-0" />
            {t(featureKey)}
          </li>
        ))}
      </ul>
      
      {/* CTA Button */}
      <Button
        asChild
        className="relative w-full luxury-button mt-auto"
      >
        <Link to={`/contact?service=${service.id}`}>
          {t('services.getQuote')}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </GlassCard>
  );
};

export default ServiceCard;
