import { forwardRef, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowIntensity?: 'low' | 'medium' | 'high';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  neonPulse?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      glowIntensity = 'medium',
      icon,
      iconPosition = 'left',
      className,
      fullWidth = false,
      neonPulse = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10';
        case 'secondary':
          return 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10';
        case 'accent':
          return 'bg-transparent border-2 border-accent text-accent hover:bg-accent/10';
        case 'outline':
          return 'bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5';
        default:
          return 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10';
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return 'text-xs py-1 px-3';
        case 'md':
          return 'text-sm py-2 px-4';
        case 'lg':
          return 'text-base py-3 px-6';
        default:
          return 'text-sm py-2 px-4';
      }
    };

    const getGlowStyles = () => {
      const color = variant === 'primary' 
        ? 'rgba(255, 0, 255, $opacity)' 
        : variant === 'secondary' 
          ? 'rgba(255, 0, 136, $opacity)' 
          : variant === 'accent' 
            ? 'rgba(0, 255, 255, $opacity)' 
            : 'rgba(255, 255, 255, $opacity)';
      
      let boxShadow = '';
      switch (glowIntensity) {
        case 'low':
          boxShadow = `0 0 5px ${color.replace('$opacity', '0.3')}`;
          break;
        case 'medium':
          boxShadow = `0 0 10px ${color.replace('$opacity', '0.5')}`;
          break;
        case 'high':
          boxShadow = `0 0 15px ${color.replace('$opacity', '0.7')}`;
          break;
        default:
          boxShadow = `0 0 10px ${color.replace('$opacity', '0.5')}`;
      }
      
      return { boxShadow } as CSSProperties;
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'font-mono relative overflow-hidden rounded-sm transition-all duration-200',
          'transform hover:scale-[1.03] active:scale-[0.97]',
          getVariantStyles(),
          getSizeStyles(),
          fullWidth ? 'w-full' : '',
          neonPulse ? 'animate-neon-pulse' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        style={!disabled ? getGlowStyles() : undefined}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </span>
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;