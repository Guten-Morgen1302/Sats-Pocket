import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { generateQRCode, generateRandomAddress, shortenAddress } from "@/lib/utils";

interface QRModalProps {
  onClose: () => void;
}

const QRModal = ({ onClose }: QRModalProps) => {
  const [address, setAddress] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random Bitcoin address
    setAddress(generateRandomAddress());
    
    // Generate QR code
    generateQRCode().then(url => {
      setQrCode(url);
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Bitcoin address copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Bitcoin Address",
          text: `Here's my Bitcoin address: ${address}`,
        });
        toast({
          title: "Shared successfully!",
          description: "Your Bitcoin address has been shared.",
        });
      } catch (err) {
        toast({
          title: "Failed to share",
          description: "Please try again or share manually.",
          variant: "destructive",
        });
      }
    } else {
      handleCopy();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 500 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="glass-dark rounded-2xl p-6 max-w-md w-full mx-4 relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={onClose}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          
          <h3 className="text-xl font-semibold mb-6 text-center">Receive Bitcoin</h3>
          
          <motion.div 
            className="bg-white p-4 rounded-xl mb-6 mx-auto w-64 h-64 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {qrCode ? (
              <img src={qrCode} alt="Bitcoin receiving QR code" className="w-full h-full" />
            ) : (
              <div className="animate-pulse w-full h-full bg-gray-200 rounded"></div>
            )}
          </motion.div>
          
          <motion.div 
            className="glass rounded-lg p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-mono text-sm break-all select-all">{address}</p>
          </motion.div>
          
          <div className="flex space-x-4">
            <motion.button 
              className="flex-1 px-4 py-3 rounded-xl glass hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center"
              onClick={handleCopy}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} mr-2`}></i> 
              {copied ? 'Copied' : 'Copy'}
            </motion.button>
            <motion.button 
              className="flex-1 px-4 py-3 rounded-xl glass hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center"
              onClick={handleShare}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="ri-share-line mr-2"></i> Share
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRModal;
