import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/context/WalletContext";
import { formatSats, formatUSD } from "@/lib/utils";

interface SendModalProps {
  onClose: () => void;
}

const SendModal = ({ onClose }: SendModalProps) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [slidePosition, setSlidePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { addTransaction, balance } = useWallet();
  const { toast } = useToast();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleMax = () => {
    setAmount(String(balance)); // Use actual wallet balance
  };

  const handleSlideComplete = () => {
    if (slidePosition >= 90) {
      if (!address || !amount) {
        toast({
          title: "Missing information",
          description: "Please enter an address and amount",
          variant: "destructive",
        });
        resetSlider();
        return;
      }

      // Add the transaction to the wallet context
      addTransaction({
        type: "send",
        amount: parseInt(amount),
        recipient: address,
        note: note,
        category: "other",
      });

      toast({
        title: "Transaction sent!",
        description: `${formatSats(parseInt(amount))} sats sent successfully.`,
      });

      // Play sound effect
      const audio = new Audio("https://cdn.freesound.org/previews/521/521645_7948117-lq.mp3");
      audio.play().catch(() => {
        // Silently fail if audio can't be played (e.g., user hasn't interacted with the page)
      });

      onClose();
    } else {
      resetSlider();
    }
  };

  const resetSlider = () => {
    setSlidePosition(0);
    setIsDragging(false);
  };

  const handleDrag = (_: any, info: any) => {
    const newPosition = (info.offset.x / (window.innerWidth * 0.8 - 40)) * 100;
    setSlidePosition(Math.min(Math.max(0, newPosition), 100));
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
          
          <h3 className="text-xl font-semibold mb-6 text-center">Send Bitcoin</h3>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium mb-2">Recipient Address</label>
            <input 
              type="text" 
              className="w-full p-3 bg-dark border border-gray-700 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
              placeholder="Enter Bitcoin address or Lightning invoice"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-2">Amount</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full p-3 bg-dark border border-gray-700 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pr-16 text-white"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm font-mono">sats</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>≈ {amount ? formatUSD(parseInt(amount)) : "$0.00"}</span>
              <button 
                className="text-primary hover:underline"
                onClick={handleMax}
              >
                MAX
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-2">Note (optional)</label>
            <input 
              type="text" 
              className="w-full p-3 bg-dark border border-gray-700 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-white"
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="relative rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-purple rounded-xl p-px">
              <div className="w-full bg-dark rounded-xl relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-purple opacity-30"
                  style={{ width: `${slidePosition}%` }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-full flex items-center"
                  style={{ x: `${slidePosition}%` }}
                  drag="x"
                  dragConstraints={{ left: 0, right: window.innerWidth * 0.8 - 40 }}
                  dragElastic={0}
                  onDrag={handleDrag}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleSlideComplete}
                  whileDrag={{ scale: 1.1 }}
                >
                  <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center -ml-5 shadow-lg">
                    <i className="ri-arrow-right-line text-white"></i>
                  </div>
                </motion.div>
                <div className="py-3 px-4 text-center font-medium">
                  {isDragging ? "Release to send" : "Slide to Send →"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SendModal;
