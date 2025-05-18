import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import GlassmorphicCard from "./shared/GlassmorphicCard";
import AnimatedButton from "./AnimatedButton";
import QRModal from "./QRModal";
import SendModal from "./SendModal";
import AnimatedSats from "./shared/AnimatedSats";
import { useWallet } from "@/context/WalletContext";
import { formatSats, formatUSD } from "@/lib/utils";

const WalletCard = () => {
  const { balance } = useWallet();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -8, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return (
    <>
      <motion.div
        className="cyberpunk-card h-full relative z-10 animate-glow-border"
        style={{ 
          borderRadius: "16px", 
          backgroundImage: "radial-gradient(circle at 30% 107%, rgba(32, 16, 43, 0.8) 0%, rgba(8, 5, 13, 0.8) 80%)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-xl">
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-blue rounded-full opacity-10 blur-xl -mr-32 -mt-32"
            animate={controls}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-purple rounded-full opacity-10 blur-xl -ml-24 -mb-24"
            animate={{
              y: [0, 10, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
            }}
          ></motion.div>

          {/* Grid overlay */}
          <div className="absolute inset-0 hexagon-grid opacity-30"></div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 animate-scan-line"></div>
        </div>
        
        <div className="relative z-10 flex flex-col h-full p-6">
          <div className="flex justify-between items-start mb-12">
            <div>
              <motion.h3 
                className="text-xl font-medium text-gray-200 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative">
                  Current Balance
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-[1px]"
                    style={{ 
                      background: "linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.7) 50%, transparent 100%)" 
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </motion.h3>
              
              <div className="flex items-baseline mt-2 relative">
                <AnimatedSats />
                <motion.span 
                  className="font-mono text-5xl md:text-6xl font-bold holo-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {formatSats(balance)}
                </motion.span>
                
                <motion.span 
                  className="ml-2 text-lg font-medium text-gray-300 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  sats
                </motion.span>
              </div>
              
              <motion.p 
                className="text-xl text-gray-400 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                ≈ {formatUSD(balance)}
              </motion.p>
              
              <motion.div 
                className="h-1 w-24 mt-3"
                style={{ 
                  background: "linear-gradient(to right, rgba(255, 0, 255, 0.7), rgba(0, 255, 255, 0.7))" 
                }}
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
            
            <motion.div 
              className="rounded-full p-4 holographic overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)",
                border: "1px solid rgba(255, 0, 255, 0.3)"
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.i 
                className="ri-bit-coin-line text-white text-3xl"
                animate={{ 
                  rotate: isHovering ? [0, 360] : 0 
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full sm:w-1/2"
            >
              <AnimatedButton 
                onClick={() => setShowQRModal(true)}
                className="w-full px-6 py-4 rounded-xl text-lg font-medium"
                variant="gradient"
                gradientType="blue"
                ripple
              >
                <i className="ri-qr-code-line mr-2"></i> Receive
              </AnimatedButton>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full sm:w-1/2"
            >
              <AnimatedButton 
                onClick={() => setShowSendModal(true)}
                className="w-full px-6 py-4 rounded-xl text-lg font-medium"
                variant="gradient"
                gradientType="purple"
                ripple
              >
                <i className="ri-send-plane-line mr-2"></i> Send
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {showQRModal && <QRModal onClose={() => setShowQRModal(false)} />}
      {showSendModal && <SendModal onClose={() => setShowSendModal(false)} />}
    </>
  );
};

export default WalletCard;
