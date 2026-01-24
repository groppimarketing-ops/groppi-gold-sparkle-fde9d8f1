import { motion } from 'framer-motion';

const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="neural-lines" />
      
      {/* Central Glow */}
      <div className="neural-bg" />
      
      {/* Animated Light Rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{
            width: '100%',
            top: `${20 + i * 15}%`,
            left: 0,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear',
          }}
        />
      ))}

      {/* Radial Gradient Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(43 100% 50% / 0.08) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Corner Glows */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
          bottom: '-10%',
          left: '-10%',
        }}
      />

      {/* Neural Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(43 100% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(43 100% 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(43 100% 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,200 Q400,100 800,200 T1600,200"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.path
          d="M0,400 Q400,300 800,400 T1600,400"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

export default NeuralBackground;
