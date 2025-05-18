import { motion } from "framer-motion";
import WalletCard from "@/components/WalletCard";
import TransactionList from "@/components/TransactionList";
import GlassmorphicCard from "@/components/shared/GlassmorphicCard";
import { useWallet } from "@/context/WalletContext";

const Wallet = () => {
  const { friends } = useWallet();

  const quickActions = [
    { icon: "ri-exchange-line", label: "Swap" },
    { icon: "ri-secure-payment-line", label: "Auto-DCA" },
    { icon: "ri-group-line", label: "Split" },
    { icon: "ri-qr-code-line", label: "Scan" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-purple"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Pocket Wallet
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main balance card */}
          <div className="lg:col-span-2">
            <WalletCard />
          </div>
          
          {/* Quick actions card */}
          <GlassmorphicCard 
            className="relative overflow-hidden" 
            animation="slide" 
            delay={0.2}
          >
            <h3 className="text-xl font-medium mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.button 
                  key={index}
                  className="glass p-4 rounded-xl hover:bg-primary/20 transition-colors duration-300 flex flex-col items-center"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(138, 43, 226, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.i 
                    className={`${action.icon} text-2xl mb-2`}
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Favorites</h4>
              <div className="space-y-3">
                {friends.slice(0, 2).map((friend) => (
                  <motion.div 
                    key={friend.id}
                    className="glass p-3 rounded-lg flex items-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5, backgroundColor: "rgba(138, 43, 226, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">{friend.initials}</span>
                    </div>
                    <span>{friend.name}</span>
                    <motion.i 
                      className="ri-arrow-right-line ml-auto"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassmorphicCard>
        </div>
        
        {/* Recent transactions list */}
        <TransactionList />
      </div>
    </main>
  );
};

export default Wallet;
