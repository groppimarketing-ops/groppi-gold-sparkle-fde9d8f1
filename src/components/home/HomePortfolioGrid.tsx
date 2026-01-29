import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';

const HomePortfolioGrid = () => {
  const { t } = useTranslation();

  // 8 portfolio project placeholders
  const projects = [
    { id: 1, tags: ['website', 'branding'], metricKey: 'project1' },
    { id: 2, tags: ['ads', 'social'], metricKey: 'project2' },
    { id: 3, tags: ['ecommerce', 'ads'], metricKey: 'project3' },
    { id: 4, tags: ['website', 'seo'], metricKey: 'project4' },
    { id: 5, tags: ['social', 'content'], metricKey: 'project5' },
    { id: 6, tags: ['branding', 'website'], metricKey: 'project6' },
    { id: 7, tags: ['ads', 'ecommerce'], metricKey: 'project7' },
    { id: 8, tags: ['content', 'social'], metricKey: 'project8' },
  ];

  const tagLabels: Record<string, string> = {
    website: t('home.portfolio.tags.website'),
    branding: t('home.portfolio.tags.branding'),
    ads: t('home.portfolio.tags.ads'),
    social: t('home.portfolio.tags.social'),
    ecommerce: t('home.portfolio.tags.ecommerce'),
    seo: t('home.portfolio.tags.seo'),
    content: t('home.portfolio.tags.content'),
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle={t('home.portfolio.subtitle')}
          title={t('home.portfolio.title')}
          centered
        />

        {/* Projects Grid - 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {projects.map((project, index) => (
            <GlassCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-0 overflow-hidden hover:border-primary/40"
              hover3D={false}
              glowOnHover={false}
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground/40 text-sm">
                    {t('home.portfolio.thumbnailPlaceholder')}
                  </span>
                </div>
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {t(`home.portfolio.projects.${project.metricKey}.title`)}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 border-primary/30 text-primary/80"
                    >
                      {tagLabels[tag]}
                    </Badge>
                  ))}
                </div>

                {/* Result metric */}
                <p className="text-primary font-medium text-sm mb-4">
                  {t(`home.portfolio.projects.${project.metricKey}.metric`)}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-muted-foreground hover:text-primary group/btn"
                >
                  {t('home.portfolio.viewCase')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* View Full Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
          >
            <Link to="/gallery">
              {t('home.portfolio.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePortfolioGrid;
