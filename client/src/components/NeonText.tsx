import { HTMLAttributes, ReactNode, forwardRef, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface NeonTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'bold';
  glowIntensity?: 'none' | 'low' | 'medium' | 'high';
  mono?: boolean;
  uppercase?: boolean;
  animated?: boolean;
}

const NeonText = forwardRef<HTMLSpanElement, NeonTextProps>(
  ({ 
    children, 
    color = 'primary',
    size = 'md',
    weight = 'normal',
    glowIntensity = 'medium',
    mono = true,
    uppercase = false,
    animated = false,
    className,
    style,
    ...props 
  }, ref) => {
    const getColorClasses = () => {
      switch (color) {
        case 'primary': return 'text-primary';
        case 'secondary': return 'text-secondary';
        case 'accent': return 'text-accent';
        case 'white': return 'text-white';
        default: return 'text-primary';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-sm';
        case 'md': return 'text-base';
        case 'lg': return 'text-lg';
        case 'xl': return 'text-xl';
        case '2xl': return 'text-2xl';
        default: return 'text-base';
      }
    };

    const getWeightClasses = () => {
      switch (weight) {
        case 'normal': return 'font-normal';
        case 'medium': return 'font-medium';
        case 'bold': return 'font-bold';
        default: return 'font-normal';
      }
    };

    const getTextShadow = (): CSSProperties => {
      if (glowIntensity === 'none') return {};
      
      const glowColor = 
        color === 'primary' ? 'rgba(255, 0, 255, $opacity)' :
        color === 'secondary' ? 'rgba(255, 0, 136, $opacity)' :
        color === 'accent' ? 'rgba(0, 255, 255, $opacity)' :
        'rgba(255, 255, 255, $opacity)';
      
      let textShadow;
      switch (glowIntensity) {
        case 'low': 
          textShadow = `0 0 3px ${glowColor.replace('$opacity', '0.3')}`;
          break;
        case 'medium': 
          textShadow = `0 0 5px ${glowColor.replace('$opacity', '0.5')}`;
          break;
        case 'high': 
          textShadow = `0 0 10px ${glowColor.replace('$opacity', '0.7')}, 0 0 20px ${glowColor.replace('$opacity', '0.4')}`;
          break;
        default:
          textShadow = `0 0 5px ${glowColor.replace('$opacity', '0.5')}`;
      }
      
      return { textShadow };
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          getColorClasses(),
          getSizeClasses(),
          getWeightClasses(),
          mono && 'font-mono',
          uppercase && 'uppercase',
          animated && 'animate-pulse-neon',
          className
        )}
        style={{ ...getTextShadow(), ...style }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

NeonText.displayName = 'NeonText';

export default NeonText;