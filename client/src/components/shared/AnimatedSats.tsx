import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedSats = () => {
  const count = 5;
  const containerRef = useRef<HTMLDivElement>(null);

  // Create sparkles for the animated sats
  const renderSparkles = () => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 2 + 1;
      const left = Math.random() * 40;
      const top = Math.random() * 40;
      
      return (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/80"
          style={{ 
            width: size, 
            height: size,
            left: `${left}%`,
            top: `${top}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -10, -20],
            x: [0, Math.random() * 10 - 5]
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      );
    });
  };

  return (
    <div ref={containerRef} className="absolute -left-4 -top-2 w-12 h-12">
      {renderSparkles()}
    </div>
  );
};

export default AnimatedSats;
