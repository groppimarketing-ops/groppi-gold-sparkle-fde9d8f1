import { motion } from 'framer-motion';

const GlassPillars = () => {
  const pillars = [
    { left: '15%', delay: 0, height: '65%', width: '60px' },
    { left: '50%', delay: 0.2, height: '85%', width: '80px' },
    { left: '85%', delay: 0.4, height: '55%', width: '50px' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pillars.map((pillar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{
            duration: 1.5,
            delay: pillar.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            left: pillar.left,
            height: pillar.height,
            width: pillar.width,
          }}
          className="absolute bottom-0 -translate-x-1/2 origin-bottom"
        >
          {/* Glass Pillar Container */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px hsl(43 100% 50% / 0.2), inset 0 0 30px hsl(43 100% 50% / 0.05)',
                '0 0 50px hsl(43 100% 50% / 0.4), inset 0 0 40px hsl(43 100% 50% / 0.1)',
                '0 0 30px hsl(43 100% 50% / 0.2), inset 0 0 30px hsl(43 100% 50% / 0.05)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            className="w-full h-full rounded-t-full overflow-hidden relative"
            style={{
              background: `linear-gradient(
                180deg,
                hsl(45 100% 75% / 0.15) 0%,
                hsl(43 100% 55% / 0.25) 30%,
                hsl(43 100% 50% / 0.35) 50%,
                hsl(40 100% 45% / 0.25) 70%,
                hsl(38 100% 40% / 0.1) 100%
              )`,
              backdropFilter: 'blur(10px)',
              border: '1px solid hsl(43 100% 50% / 0.3)',
            }}
          >
            {/* Inner Glass Reflection */}
            <div 
              className="absolute inset-0 rounded-t-full"
              style={{
                background: `linear-gradient(
                  135deg,
                  hsl(0 0% 100% / 0.15) 0%,
                  transparent 50%,
                  hsl(0 0% 0% / 0.1) 100%
                )`,
              }}
            />

            {/* Shimmer Effect */}
            <motion.div
              animate={{
                y: ['100%', '-100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
                ease: 'linear',
              }}
              className="absolute inset-x-0 h-1/3"
              style={{
                background: 'linear-gradient(180deg, transparent, hsl(0 0% 100% / 0.2), transparent)',
              }}
            />

            {/* Top Glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8 rounded-t-full"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(43 100% 60% / 0.4) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
          
          {/* Base Glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[150%] h-8"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(43 100% 50% / 0.4) 0%, transparent 70%)',
              filter: 'blur(15px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GlassPillars;
