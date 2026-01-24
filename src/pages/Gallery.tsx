import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Play, Sparkles } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');

  const galleryItems = [
    { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Luxury Interior', category: 'Interior' },
    { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', title: 'Premium Products', category: 'Products' },
    { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', title: 'Modern Architecture', category: 'Architecture' },
    { id: '4', type: 'video', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', title: 'Brand Story', category: 'Video' },
    { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', title: 'Craftsmanship', category: 'Craft' },
    { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800', title: 'Global Presence', category: 'Events' },
    { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', title: 'Elegant Design', category: 'Design' },
    { id: '8', type: 'image', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', title: 'Premium Quality', category: 'Quality' },
    { id: '9', type: 'video', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', title: 'Behind the Scenes', category: 'Video' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'images') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'images', label: 'Images' },
    { key: 'videos', label: 'Videos' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('gallery.subtitle')}
            title={t('gallery.title')}
            description={t('gallery.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-3">
            {filters.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key as 'all' | 'images' | 'videos')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'luxury-button text-primary-foreground gold-glow'
                    : 'glass-card hover:border-primary/40'
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl glass-card !p-0 ${
                    index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(item.url)}
                >
                  <div className="aspect-square">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4"
                    initial={false}
                  >
                    <h3 className="text-foreground font-bold text-lg">{item.title}</h3>
                    <p className="text-primary text-sm">{item.category}</p>
                  </motion.div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.type === 'video' ? (
                      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center gold-glow">
                        <Play className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center gold-glow">
                        <ZoomIn className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'hsl(0 0% 4% / 0.95)', backdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 w-14 h-14 rounded-full glass-card flex items-center justify-center gold-glow"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 text-primary" />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl glass-card !p-2"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Gallery;
