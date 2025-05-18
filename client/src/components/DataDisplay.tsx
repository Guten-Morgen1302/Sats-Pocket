import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import NeonText from './NeonText';

interface DataDisplayProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  animated?: boolean;
  className?: string;
}

const DataDisplay = forwardRef<HTMLDivElement, DataDisplayProps>(
  ({
    label,
    value,
    icon,
    color = 'primary',
    size = 'md',
    trend,
    trendValue,
    animated = false,
    className,
    ...props
  }, ref) => {
    const getTrendIcon = () => {
      if (!trend) return null;
      
      const trendClass = cn(
        'inline-flex items-center text-xs font-mono ml-2',
        trend === 'up' ? 'text-green-400' : 
        trend === 'down' ? 'text-red-400' : 
        'text-gray-400'
      );
      
      return (
        <span className={trendClass}>
          {trend === 'up' && <span className="mr-1">↑</span>}
          {trend === 'down' && <span className="mr-1">↓</span>}
          {trend === 'neutral' && <span className="mr-1">→</span>}
          {trendValue}
        </span>
      );
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm': 
          return { 
            container: 'gap-1',
            label: 'text-xs',
            value: 'text-lg',
          };
        case 'md': 
          return {
            container: 'gap-2',
            label: 'text-sm',
            value: 'text-2xl',
          };
        case 'lg': 
          return {
            container: 'gap-3',
            label: 'text-base',
            value: 'text-3xl',
          };
        default: 
          return {
            container: 'gap-2',
            label: 'text-sm',
            value: 'text-2xl',
          };
      }
    };

    const sizeClasses = getSizeClasses();
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col', 
          sizeClasses.container,
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && <span className={`text-${color}`}>{icon}</span>}
          <NeonText 
            color="white" 
            size="xs" 
            mono={true} 
            uppercase={true}
            glowIntensity="low"
            className="opacity-70 tracking-wider"
          >
            {label}
          </NeonText>
        </div>
        
        <div className="flex items-baseline">
          <NeonText
            color={color}
            size={size === 'sm' ? 'lg' : size === 'md' ? 'xl' : '2xl'}
            mono={true}
            weight="bold"
            glowIntensity="medium"
            animated={animated}
          >
            {value}
          </NeonText>
          {getTrendIcon()}
        </div>
      </div>
    );
  }
);

DataDisplay.displayName = 'DataDisplay';

export default DataDisplay;