import { motion } from "framer-motion";
import { useState } from "react";

type ThemeType = 'dark' | 'light' | 'sepia';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  const nextTheme = () => {
    setTheme(currentTheme => {
      switch (currentTheme) {
        case 'dark':
          return 'light';
        case 'light':
          return 'sepia';
        case 'sepia':
          return 'dark';
        default:
          return 'dark';
      }
    });
  };

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return <i className="ri-moon-line text-white text-lg"></i>;
      case 'light':
        return <i className="ri-sun-line text-black text-lg"></i>;
      case 'sepia':
        return <i className="ri-contrast-2-line text-[#3E2D14] text-lg"></i>;
    }
  };

  const iconVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -180 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.5, opacity: 0, rotate: 180 }
  };

  return (
    <motion.button
      className="p-2 rounded-full glass flex items-center justify-center"
      onClick={nextTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={iconVariants}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
