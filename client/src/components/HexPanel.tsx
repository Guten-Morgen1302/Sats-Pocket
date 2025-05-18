import { HTMLAttributes, ReactNode, forwardRef, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export interface HexPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  headerIcon?: ReactNode;
  headerAction?: ReactNode;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const HexPanel = forwardRef<HTMLDivElement, HexPanelProps>(
  ({ 
    children, 
    title, 
    variant = 'primary',
    size = 'md',
    headerIcon,
    headerAction,
    glowIntensity = 'medium',
    className,
    style,
    ...props 
  }, ref) => {
    // Hex panel styling to create the hexagon shape with pseudo-elements
    const hexPanelStyle = {
      '--hex-bg': 'rgba(0, 0, 0, 0.2)',
      '--hex-border-color': 
        variant === 'primary' ? 'rgba(255, 0, 255, 0.7)' : 
        variant === 'secondary' ? 'rgba(255, 0, 136, 0.7)' : 
        'rgba(0, 255, 255, 0.7)',
      '--hex-glow': 
        glowIntensity === 'low' ? '0 0 5px' : 
        glowIntensity === 'medium' ? '0 0 10px' : 
        '0 0 15px'
    } as CSSProperties;

    const getTextColorClass = () => {
      switch (variant) {
        case 'primary': return 'text-primary';
        case 'secondary': return 'text-secondary';
        case 'accent': return 'text-accent';
        default: return 'text-primary';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm': return 'p-3';
        case 'md': return 'p-4';
        case 'lg': return 'p-5';
        default: return 'p-4';
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-card/90 backdrop-blur-sm',
          'border-2 border-t-0 border-primary/50',
          'animate-fadeIn',
          'before:absolute before:top-0 before:left-0 before:w-full before:h-1',
          'before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent',
          getSizeClasses(),
          className
        )}
        style={{ ...hexPanelStyle, ...style }}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              {headerIcon && <span className={getTextColorClass()}>{headerIcon}</span>}
              <h3 className={cn(
                'font-mono text-sm uppercase tracking-wider',
                getTextColorClass()
              )}>
                {title}
              </h3>
            </div>
            {headerAction && (
              <div className="flex items-center">
                {headerAction}
              </div>
            )}
          </div>
        )}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

HexPanel.displayName = 'HexPanel';

export default HexPanel;