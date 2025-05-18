import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: 'blue' | 'purple';
  opacity: number;
}

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const particleCount = 50;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 20 + 10,
        color: Math.random() > 0.5 ? 'blue' : 'purple',
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="particles absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]"
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            background: particle.color === 'blue' 
              ? 'radial-gradient(circle, rgba(0,255,255,1) 0%, rgba(0,123,255,1) 100%)' 
              : 'radial-gradient(circle, rgba(138,43,226,1) 0%, rgba(255,20,147,1) 100%)',
            boxShadow: `0 0 ${particle.size * 2}px rgba(138, 43, 226, 0.5)`,
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
