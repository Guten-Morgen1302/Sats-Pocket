import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useAnimation } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Twitter, Github, Send, Zap, Lock, Globe, Shield, FileText, HelpCircle, 
  MapPin, MessageSquare, BookOpen, HeartPulse 
} from "lucide-react";
import NeonText from "../NeonText";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const lineControls = useAnimation();
  
  // Animate line effect
  useEffect(() => {
    const animate = async () => {
      while (true) {
        await lineControls.start({
          backgroundPosition: ['0% 0%', '100% 100%'],
          transition: { duration: 10, ease: "linear" }
        });
      }
    };
    
    animate();
  }, [lineControls]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed! 🚀",
        description: "You've been added to our newsletter.",
        className: "bg-gradient-purple text-white"
      });
      setEmail("");
    }
  };
  
  const handleEasterEgg = () => {
    const seedPhrase = "wagon galaxy tennis sugar merry hunt solution wisdom boat ticket worth robust";
    
    toast({
      title: "🔐 Never share your seed phrase!",
      description: seedPhrase,
      duration: 5000,
      className: "bg-gradient-purple text-white border border-red-500",
    });
  };
  
  // Animation variants
  const linkHoverVariants = {
    hover: { 
      x: 5, 
      color: "#ff00ff",
      textShadow: "0 0 8px rgba(255, 0, 255, 0.6)",
      transition: { duration: 0.2 } 
    }
  };
  
  const socialVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      filter: "drop-shadow(0 0 8px rgba(255, 0, 255, 0.8))" 
    },
    tap: { scale: 0.9 }
  };
  
  return (
    <footer className="relative border-t border-primary/30 pt-20 pb-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 circuit-bg opacity-30" />
      
      {/* Animated line effect */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ 
          background: "linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.8), rgba(0, 255, 255, 0.8), transparent)",
          backgroundSize: "200% 100%"
        }}
        animate={lineControls}
      />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-10 md:mb-0">
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 mb-6 cursor-pointer group"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="h-12 w-12 rounded-xl bg-black relative flex items-center justify-center overflow-hidden border border-primary animate-pulse-glow"
                  animate={{ 
                    boxShadow: ["0 0 10px rgba(255, 0, 255, 0.5)", "0 0 20px rgba(255, 0, 255, 0.8)", "0 0 10px rgba(255, 0, 255, 0.5)"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: "linear-gradient(45deg, rgba(255,0,255,0.8), rgba(0,255,255,0.8))",
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
                  
                  <motion.i 
                    className="ri-bit-coin-line text-white text-2xl relative z-10"
                    animate={{ 
                      rotateY: [0, 180, 360],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  />
                </motion.div>
                
                <NeonText 
                  color="primary" 
                  size="xl" 
                  weight="bold" 
                  glowIntensity="medium"
                  className="tracking-wider text-xl"
                >
                  SATS POCKET
                </NeonText>
              </motion.div>
            </Link>
            
            <motion.p 
              className="text-gray-300 max-w-md mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              A modern Bitcoin micro-wallet designed for daily use with stunning visuals, 
              advanced security features and seamless user experience.
            </motion.p>
            
            <div className="flex space-x-5">
              {[
                { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
                { icon: <Github className="h-5 w-5" />, href: "https://github.com" },
                { icon: <i className="ri-telegram-fill text-xl" />, href: "https://telegram.org" },
                { icon: <i className="ri-discord-fill text-xl" />, href: "https://discord.com" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full border border-gray-800 hover:border-primary/50 bg-black/30"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            <div>
              <h4 className="font-bold mb-5 text-white relative inline-block">
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-accent" />
                  Platform
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-primary to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", icon: <Zap className="h-3 w-3" /> },
                  { label: "Security", icon: <Shield className="h-3 w-3" /> },
                  { label: "Roadmap", icon: <MapPin className="h-3 w-3" /> },
                  { label: "Feedback", icon: <MessageSquare className="h-3 w-3" /> }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <motion.a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      variants={linkHoverVariants}
                      whileHover="hover"
                    >
                      <span className="mr-2 text-primary opacity-70 group-hover:opacity-100">{item.icon}</span>
                      {item.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-5 text-white relative inline-block">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-accent" />
                  Resources
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-primary to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Documentation", icon: <FileText className="h-3 w-3" /> },
                  { label: "API Reference", icon: <Globe className="h-3 w-3" /> },
                  { label: "Help Center", icon: <HelpCircle className="h-3 w-3" /> },
                  { label: "Community", icon: <HeartPulse className="h-3 w-3" /> }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <motion.a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      variants={linkHoverVariants}
                      whileHover="hover"
                    >
                      <span className="mr-2 text-accent opacity-70 group-hover:opacity-100">{item.icon}</span>
                      {item.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-bold mb-5 text-white relative inline-block">
                <span className="flex items-center">
                  <Send className="h-4 w-4 mr-2 text-accent" />
                  Newsletter
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-primary to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </h4>
              <motion.p 
                className="text-gray-400 mb-4 text-sm max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Subscribe to get updates on new features, security improvements, 
                and Bitcoin market insights.
              </motion.p>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="flex"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="satoshi@example.com" 
                    className="w-full px-4 py-3 rounded-l-xl bg-black/40 border border-gray-800 focus:border-primary focus:outline-none text-white pr-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {/* Animated scan line effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-l-xl">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
                      animate={{ 
                        y: ["-100%", "500%"],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />
                  </div>
                </div>
                
                <motion.button 
                  type="submit"
                  className="bg-gradient-purple text-white px-5 py-3 rounded-r-xl relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 15px rgba(255, 0, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-cyberpunk opacity-80"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <Send className="h-5 w-5 relative z-10" />
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="relative mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Top border with gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <p className="text-sm text-gray-400 mb-4 md:mb-0 font-mono">
            © {new Date().getFullYear()} SATS POCKET <span className="text-primary">|</span> ALL RIGHTS RESERVED
          </p>
          
          <div className="flex items-center space-x-6">
            {["Terms", "Privacy", "Legal"].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-sm text-gray-400 hover:text-white transition-colors font-mono"
                whileHover={{ 
                  color: "#ff00ff",
                  textShadow: "0 0 8px rgba(255, 0, 255, 0.6)" 
                }}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.div 
              className="text-gray-400 cursor-pointer group"
              whileHover={{ 
                scale: 1.1,
                color: "#ff00ff",
              }}
              whileTap={{ scale: 0.9 }}
              onTapStart={(e) => {
                const timer = setTimeout(() => {
                  handleEasterEgg();
                }, 1200);
                
                // Cleanup on tap end or cancel
                const cleanup = () => clearTimeout(timer);
                if (e.currentTarget) {
                  e.currentTarget.addEventListener('mouseup', cleanup, { once: true });
                  e.currentTarget.addEventListener('mouseleave', cleanup, { once: true });
                }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Lock className="h-4 w-4 group-hover:text-primary group-hover:filter group-hover:drop-shadow-glow" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
