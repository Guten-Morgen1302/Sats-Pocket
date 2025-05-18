import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CyberpunkCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
  withHeader?: boolean;
  headerIcon?: ReactNode;
  headerAction?: ReactNode;
  withGrid?: boolean;
  neonAccent?: boolean;
}

const CyberpunkCard = forwardRef<HTMLDivElement, CyberpunkCardProps>(
  ({ 
    children, 
    title, 
    variant = 'primary',
    size = 'md',
    bordered = true,
    hoverable = false,
    withHeader = false,
    headerIcon,
    headerAction,
    withGrid = false,
    neonAccent = true,
    className,
    ...props 
  }, ref) => {
    const getBorderColor = () => {
      switch (variant) {
        case 'primary': return 'border-primary/50';
        case 'secondary': return 'border-secondary/50';
        case 'accent': return 'border-accent/50';
        case 'subtle': return 'border-white/20';
        default: return 'border-primary/50';
      }
    };

    const getGlowColor = () => {
      switch (variant) {
        case 'primary': return 'after:shadow-[0_0_10px_rgba(255,0,255,0.7)]';
        case 'secondary': return 'after:shadow-[0_0_10px_rgba(255,0,136,0.7)]';
        case 'accent': return 'after:shadow-[0_0_10px_rgba(0,255,255,0.7)]';
        case 'subtle': return 'after:shadow-[0_0_5px_rgba(255,255,255,0.3)]';
        default: return 'after:shadow-[0_0_10px_rgba(255,0,255,0.7)]';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm': return 'p-3';
        case 'md': return 'p-4';
        case 'lg': return 'p-6';
        default: return 'p-4';
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'bg-card/80 backdrop-blur-sm rounded-md relative overflow-hidden',
          'animate-fadeIn',
          bordered && `border ${getBorderColor()}`,
          withGrid && 'hexagon-bg',
          hoverable && 'hover:-translate-y-1 transition-transform duration-300',
          getSizeClasses(),
          neonAccent && 'before:absolute before:top-0 before:left-0 before:w-full before:h-[2px]',
          neonAccent && 'before:bg-gradient-to-r before:from-transparent before:via-primary/80 before:to-transparent',
          className
        )}
        {...props}
      >
        {withHeader && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              {headerIcon && <span className="text-primary">{headerIcon}</span>}
              {title && (
                <h3 className={cn(
                  'font-mono text-sm uppercase tracking-wider',
                  variant === 'primary' && 'text-primary',
                  variant === 'secondary' && 'text-secondary',
                  variant === 'accent' && 'text-accent',
                  variant === 'subtle' && 'text-white'
                )}>
                  {title}
                </h3>
              )}
            </div>
            {headerAction && (
              <div className="flex items-center">
                {headerAction}
              </div>
            )}
          </div>
        )}
        {!withHeader && title && (
          <h3 className={cn(
            'font-mono text-sm uppercase tracking-wider mb-3',
            variant === 'primary' && 'text-primary',
            variant === 'secondary' && 'text-secondary',
            variant === 'accent' && 'text-accent',
            variant === 'subtle' && 'text-white'
          )}>
            {title}
          </h3>
        )}
        {children}
      </div>
    );
  }
);

CyberpunkCard.displayName = 'CyberpunkCard';

export default CyberpunkCard;