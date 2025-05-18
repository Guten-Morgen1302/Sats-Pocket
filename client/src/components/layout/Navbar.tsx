import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import ThemeToggle from "../ThemeToggle";
import NeonButton from "../NeonButton";
import NeonText from "../NeonText";
import { Zap, Activity, WalletCards, BarChart4, HelpCircle, Hexagon, Sparkles } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  // Handle scroll state for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Logo animation
  useEffect(() => {
    controls.start({
      filter: ["drop-shadow(0 0 5px rgba(255, 0, 255, 0.7))", "drop-shadow(0 0 15px rgba(255, 0, 255, 0.9))", "drop-shadow(0 0 5px rgba(255, 0, 255, 0.7))"],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    });
  }, [controls]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Refined link definitions with better icons
  const links = [
    { href: "/", label: "HOME", icon: <Sparkles size={14} className="text-accent" /> },
    { href: "/wallet", label: "WALLET", icon: <WalletCards size={14} className="text-accent" /> },
    { href: "/split", label: "SPLIT", icon: <Activity size={14} className="text-accent" /> },
    { href: "/insights", label: "INSIGHTS", icon: <BarChart4 size={14} className="text-accent" /> },
    { href: "/dashboard", label: "DASH", icon: <Hexagon size={14} className="text-accent" /> },
    { href: "/how-it-works", label: "GUIDE", icon: <HelpCircle size={14} className="text-accent" /> }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } }
  };

  // Link hover animations
  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-primary/30 py-1" 
          : "bg-black/40 backdrop-blur-md py-1"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Top highlight bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="h-11 w-11 relative rounded-md bg-black border border-primary flex items-center justify-center overflow-hidden"
                animate={controls}
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-black opacity-80"></div>
                
                {/* Animated gradient */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(45deg, rgba(255,0,255,0.5), rgba(0,255,255,0.5))",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                {/* Icon */}
                <motion.i 
                  className="ri-bit-coin-line text-primary text-2xl relative z-10"
                  animate={{ 
                    rotateY: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <div className="relative overflow-hidden">
                <NeonText 
                  color="primary" 
                  size="xl" 
                  weight="bold" 
                  glowIntensity="high"
                  className="tracking-wider"
                >
                  SATS POCKET
                </NeonText>
                
                {/* Animated underline */}
                <motion.div 
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-1 bg-black/40 backdrop-blur-sm p-1 rounded-xl border border-primary/20">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div 
                    className={`
                      group flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-lg
                      ${location === link.href 
                        ? 'bg-primary/20 neon-border-cyan' 
                        : 'hover:bg-primary/10 transition-colors duration-300'}
                    `}
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.span
                      animate={location === link.href ? { scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity }} : {}}
                    >
                      {link.icon}
                    </motion.span>
                    <span className={`
                      text-xs font-mono font-medium tracking-wider transition-all duration-200
                      ${location === link.href 
                        ? 'text-accent neon-text-cyan' 
                        : 'text-gray-300 group-hover:text-white'}
                    `}>
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link href="/dashboard">
              <div className="hidden md:block">
                <NeonButton 
                  variant="accent"
                  size="sm"
                  neonPulse
                  glowIntensity="high"
                  className="font-mono font-medium tracking-wider"
                >
                  ACTIVATE
                </NeonButton>
              </div>
            </Link>
            
            <motion.button 
              className="md:hidden text-primary p-2 rounded-full bg-black/30 border border-primary/30"
              whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with enhanced animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-b border-primary/20 py-4 px-6 circuit-bg overflow-hidden"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Animated highlight */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.7), transparent)" }}
              animate={{ 
                left: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <nav className="flex flex-col space-y-3">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, type: "spring", stiffness: 100 }}
                >
                  <Link href={link.href}>
                    <motion.div 
                      className={`
                        flex items-center gap-3 font-mono text-sm py-2 px-3 rounded-lg cursor-pointer 
                        ${location === link.href 
                          ? 'bg-primary/20 neon-border' 
                          : 'hover:bg-primary/10 transition-colors duration-300'}
                      `}
                      onClick={closeMobileMenu}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className={`
                        ${location === link.href 
                          ? 'text-primary neon-text' 
                          : 'text-gray-300'}
                      `}>
                        {link.label}
                      </span>
                      
                      {location === link.href && (
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary ml-auto"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1, type: "spring" }}
                className="pt-3"
              >
                <Link href="/dashboard">
                  <NeonButton 
                    variant="accent"
                    size="md"
                    fullWidth
                    neonPulse
                    glowIntensity="high"
                    onClick={closeMobileMenu}
                    className="font-mono tracking-wider mt-2"
                  >
                    <i className="ri-rocket-2-line mr-2"></i> ACTIVATE
                  </NeonButton>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;