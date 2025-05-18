import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "gradient" | "glow";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  glowIntensity?: "low" | "medium" | "high";
  gradientType?: "purple" | "blue";
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      ripple = true,
      glowIntensity = "medium",
      gradientType = "purple",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "rounded-full font-medium focus:outline-none transition-all";

    // Size styles
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3",
      lg: "px-8 py-4 text-lg"
    };

    // Variant styles
    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border border-primary bg-transparent text-foreground hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-primary/10",
      link: "bg-transparent text-primary underline-offset-4 hover:underline",
      gradient: gradientType === "purple" 
        ? "bg-gradient-to-br from-primary to-secondary text-white"
        : "bg-gradient-to-br from-accent to-blue-500 text-white",
      glow: "glass glow-border text-white"
    };

    // Glow intensity styles
    const glowStyles = {
      low: "hover:shadow-[0_0_10px_rgba(138,43,226,0.5)]",
      medium: "hover:shadow-[0_0_15px_rgba(138,43,226,0.7)]",
      high: "hover:shadow-[0_0_20px_rgba(138,43,226,0.9)]"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          variant === "glow" && glowStyles[glowIntensity],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {ripple ? (
          <motion.span
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0.3, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
