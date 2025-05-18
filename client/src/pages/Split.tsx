import { useState } from "react";
import { motion } from "framer-motion";
import GlassmorphicCard from "@/components/shared/GlassmorphicCard";
import AnimatedButton from "@/components/AnimatedButton";
import FriendSelector from "@/components/FriendSelector";
import { useWallet, Friend } from "@/context/WalletContext";
import { formatSats, formatUSD } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Split = () => {
  const { friends } = useWallet();
  const [billAmount, setBillAmount] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [splitType, setSplitType] = useState<"equal" | "custom" | "percentage">("equal");
  const { toast } = useToast();

  const handleFriendToggle = (friend: Friend) => {
    if (selectedFriends.some(f => f.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const getSplitAmount = () => {
    if (!billAmount || isNaN(Number(billAmount))) return 0;
    const amount = Number(billAmount);
    const splitCount = selectedFriends.length + 1; // +1 for you
    return Math.floor(amount / splitCount);
  };

  const handleGeneratePaymentLinks = () => {
    if (!billAmount || selectedFriends.length === 0) {
      toast({
        title: "Missing information",
        description: "Please enter a bill amount and select at least one friend.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment links generated!",
      description: `Links sent to ${selectedFriends.map(f => f.name).join(', ')}.`,
    });
  };

  const splitAmount = getSplitAmount();

  // SVG for bill splitting illustration
  const renderSplitIllustration = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 240 240" className="mx-auto mb-6">
      <circle cx="120" cy="120" r="116" fill="none" stroke="#FF00FF" strokeWidth="2" opacity="0.3" />
      <circle cx="120" cy="120" r="100" fill="none" stroke="#FF00FF" strokeWidth="1" opacity="0.2" />
      
      {/* Paper bill with neon edges */}
      <rect x="70" y="80" width="100" height="80" rx="4" fill="#1E1E2E" stroke="#FF00FF" strokeWidth="2" />
      <rect x="80" y="90" width="80" height="10" rx="2" fill="#2D2D42" />
      <rect x="80" y="110" width="80" height="5" rx="1" fill="#2D2D42" />
      <rect x="80" y="120" width="60" height="5" rx="1" fill="#2D2D42" />
      <rect x="80" y="130" width="40" height="5" rx="1" fill="#2D2D42" />
      
      {/* Bitcoin symbol */}
      <circle cx="150" cy="140" r="15" fill="#FF00FF" opacity="0.2" />
      <path d="M150 125 L150 155 M140 130 L160 130 M140 150 L160 150 M145 125 L145 130 M155 125 L155 130 M145 150 L145 155 M155 150 L155 155" 
            stroke="#FF00FF" strokeWidth="2" />
      
      {/* Split animation lines */}
      <path d="M120 40 L120 70" stroke="#00FFFF" strokeWidth="1" strokeDasharray="5,5" />
      <path d="M40 120 L70 120" stroke="#00FFFF" strokeWidth="1" strokeDasharray="5,5" />
      <path d="M170 120 L200 120" stroke="#00FFFF" strokeWidth="1" strokeDasharray="5,5" />
      <path d="M120 170 L120 200" stroke="#00FFFF" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* People icons */}
      <circle cx="120" cy="40" r="15" fill="#00FFFF" opacity="0.2" />
      <circle cx="40" cy="120" r="15" fill="#00FFFF" opacity="0.2" />
      <circle cx="200" cy="120" r="15" fill="#00FFFF" opacity="0.2" />
      <circle cx="120" cy="200" r="15" fill="#00FFFF" opacity="0.2" />
      
      {/* Simple person icons */}
      <circle cx="120" cy="35" r="5" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      <path d="M115 45 L125 45 L123 55 L117 55 Z" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      
      <circle cx="40" cy="115" r="5" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      <path d="M35 125 L45 125 L43 135 L37 135 Z" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      
      <circle cx="200" cy="115" r="5" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      <path d="M195 125 L205 125 L203 135 L197 135 Z" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      
      <circle cx="120" cy="195" r="5" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
      <path d="M115 205 L125 205 L123 215 L117 215 Z" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
    </svg>
  );

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-purple"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Split Bills with Friends
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderSplitIllustration()}
        </motion.div>
        
        <GlassmorphicCard className="max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-blue rounded-full opacity-10 blur-xl -mr-32 -mt-32"></div>
          
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">Enter Bill Amount</label>
            <div className="relative">
              <motion.input 
                type="text" 
                className="w-full p-4 bg-dark border border-gray-700 rounded-xl focus:border-primary focus:outline-none text-xl font-mono text-white"
                placeholder="0"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value.replace(/[^0-9]/g, ''))}
                whileFocus={{ boxShadow: "0 0 0 2px rgba(138, 43, 226, 0.5)" }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-lg font-mono">sats</span>
              </div>
            </div>
            <div className="mt-2 text-sm opacity-70">
              ≈ {billAmount ? formatUSD(Number(billAmount)) : "$0.00"}
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">Select Friends</label>
            <FriendSelector
              friends={friends}
              selectedFriends={selectedFriends}
              onToggle={handleFriendToggle}
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-lg font-medium mb-4">How to Split? 🍕💸👯</label>
            <div className="flex items-center justify-center space-x-6 mb-4">
              <motion.button 
                className={`glass p-4 rounded-lg flex flex-col items-center transition-colors duration-300 border ${splitType === 'equal' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSplitType("equal")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl mb-2">🔄</span>
                <span className="text-sm">Equal</span>
              </motion.button>
              
              <motion.button 
                className={`glass p-4 rounded-lg flex flex-col items-center transition-colors duration-300 border ${splitType === 'custom' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSplitType("custom")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl mb-2">📊</span>
                <span className="text-sm">Custom</span>
              </motion.button>
              
              <motion.button 
                className={`glass p-4 rounded-lg flex flex-col items-center transition-colors duration-300 border ${splitType === 'percentage' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSplitType("percentage")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl mb-2">🎯</span>
                <span className="text-sm">Percentage</span>
              </motion.button>
            </div>
            
            <motion.div 
              className="glass p-4 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={`${splitType}-${selectedFriends.length}-${billAmount}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span>You</span>
                <span className="font-mono">{formatSats(splitAmount)} sats</span>
              </div>
              {selectedFriends.map((friend) => (
                <div key={friend.id} className="flex justify-between items-center mb-2">
                  <span>{friend.name}</span>
                  <span className="font-mono">{formatSats(splitAmount)} sats</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="text-center">
            <AnimatedButton
              variant="gradient"
              className="rounded-full"
              onClick={handleGeneratePaymentLinks}
            >
              Generate Payment Links
            </AnimatedButton>
          </div>
        </GlassmorphicCard>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">How Splitting Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassmorphicCard className="text-center" animation="slide" delay={0.1}>
              <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">1</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Enter Amount</h4>
              <p className="opacity-70">Input the total bill amount in sats or USD</p>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="text-center" animation="slide" delay={0.2}>
              <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">2</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Add Friends</h4>
              <p className="opacity-70">Select who's splitting the bill with you</p>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="text-center" animation="slide" delay={0.3}>
              <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">3</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Share Links</h4>
              <p className="opacity-70">Send payment requests directly to friends</p>
            </GlassmorphicCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Split;
