import { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "light" | "dark";
  hover?: boolean;
  animation?: "fade" | "slide" | "scale" | "none";
  delay?: number;
}

const GlassmorphicCard = ({
  children,
  className,
  variant = "dark",
  hover = false,
  animation = "fade",
  delay = 0,
  ...props
}: GlassmorphicCardProps) => {
  // Base styles for the card
  const baseStyles = cn(
    "rounded-2xl p-6 md:p-8 backdrop-blur-md border",
    variant === "dark"
      ? "glass-dark border-white/5 bg-black/60"
      : "glass border-white/15 bg-white/10",
    hover && "card-hover",
    className
  );

  // Animation variants
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, delay } }
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay } }
    },
    none: {
      hidden: {},
      visible: {}
    }
  };

  return (
    <motion.div
      className={baseStyles}
      initial={animation !== "none" ? "hidden" : undefined}
      animate={animation !== "none" ? "visible" : undefined}
      variants={animationVariants[animation]}
      whileHover={hover ? { y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
