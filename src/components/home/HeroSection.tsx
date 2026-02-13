import { memo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import groppiLogo from '@/assets/groppi-logo.png';

/**
 * Portfolio videos used in the scrolling strip.
 * 8 local MP4s → duplicated for seamless infinite loop.
 */
const STRIP_VIDEOS = [
  '/videos/portfolio/il-fuoco-promo.mp4',
  '/videos/portfolio/lebanon-promo-1.mp4',
  '/videos/portfolio/lebanon-promo-2.mp4',
  '/videos/portfolio/lebanon-social-1.mp4',
  '/videos/portfolio/lebanon-social-2.mp4',
  '/videos/portfolio/lebanon-social-3.mp4',
  '/videos/portfolio/lebanon-social-4.mp4',
  '/videos/portfolio/lebanon-social-5.mp4',
];

const VideoCard = memo(({ src }: { src: string }) => (
  <div className="groppi-card flex-shrink-0">
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
));
VideoCard.displayName = 'VideoCard';

const HeroSection = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="groppi-hero80 relative overflow-hidden"
      aria-label="GROPPI Hero"
    >
      {/* Subtle luxury background */}
      <div className="absolute inset-0 z-0 groppi-hero-bg" />

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 z-[5] opacity-95 drop-shadow-[0_0_22px_hsl(43_76%_52%/0.28)]"
        style={{ top: '16%' }}
      >
        <img
          src={groppiLogo}
          alt="GROPPI"
          className="w-[min(520px,70vw)] h-auto"
        />
      </div>

      {/* Scrolling video strip */}
      <div
        className="absolute left-0 right-0 z-[4] px-[4vw]"
        style={{
          bottom: '12%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        ref={stripRef}
      >
        <div
          className={`flex gap-[22px] w-max ${
            prefersReducedMotion ? '' : 'animate-groppi-drift'
          }`}
          style={{
            animationPlayState: 'running',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {/* Set A */}
          {STRIP_VIDEOS.map((src, i) => (
            <VideoCard key={`a-${i}`} src={src} />
          ))}
          {/* Set B (duplicate for seamless loop) */}
          {STRIP_VIDEOS.map((src, i) => (
            <VideoCard key={`b-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
