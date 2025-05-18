import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import NeonText from './NeonText';

interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'primary' | 'secondary' | 'accent';
  showValue?: boolean;
  valueLabel?: string;
  className?: string;
  label?: ReactNode;
  animated?: boolean;
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    color = 'primary',
    showValue = true,
    valueLabel,
    className,
    label,
    animated = true,
    ...props
  }, ref) => {
    const normalizedValue = Math.min(Math.max(value, 0), max);
    const percentage = (normalizedValue / max) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getStrokeColor = () => {
      switch (color) {
        case 'primary': return 'hsl(var(--primary))';
        case 'secondary': return 'hsl(var(--secondary))';
        case 'accent': return 'hsl(var(--accent))';
        default: return 'hsl(var(--primary))';
      }
    };

    const getGlowFilter = () => {
      switch (color) {
        case 'primary': return 'drop-shadow(0 0 5px rgba(255, 0, 255, 0.7))';
        case 'secondary': return 'drop-shadow(0 0 5px rgba(255, 0, 136, 0.7))';
        case 'accent': return 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))';
        default: return 'drop-shadow(0 0 5px rgba(255, 0, 255, 0.7))';
      }
    };

    const centerX = size / 2;
    const centerY = size / 2;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex flex-col items-center justify-center', className)}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn('transform -rotate-90', animated && 'animate-neon-pulse')}
          style={{ filter: getGlowFilter() }}
        >
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
            strokeLinecap="round"
          />
        </svg>
        
        {showValue && (
          <div className="absolute flex flex-col items-center justify-center">
            <NeonText 
              color={color} 
              size="xl" 
              weight="bold" 
              mono={true}
              glowIntensity="high"
            >
              {normalizedValue}
            </NeonText>
            {valueLabel && (
              <NeonText 
                color="white" 
                size="xs" 
                mono={true} 
                uppercase={true}
                className="mt-1 opacity-70"
              >
                {valueLabel}
              </NeonText>
            )}
          </div>
        )}
        
        {label && (
          <div className="mt-2">
            {label}
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export default CircularProgress;