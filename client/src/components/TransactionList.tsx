import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useWallet, Transaction } from "@/context/WalletContext";
import { formatUSD, formatSats } from "@/lib/utils";
import { Download, Upload, RefreshCw, ChevronDown, ArrowRight, Clock, Zap, PiggyBank } from "lucide-react";

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return diffInHours === 0 
      ? 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
};

const getRandomTimestamp = () => {
  return Math.floor(Date.now() - Math.random() * 10000);
};

const TransactionItem = ({ transaction, index }: { transaction: Transaction; index: number }) => {
  const { type, amount, date, recipient, sender, category, note } = transaction;
  const [isExpanded, setIsExpanded] = useState(false);
  const [timestamp] = useState(getRandomTimestamp());
  
  // Icon components with enhanced styling
  const getIcon = () => {
    switch (type) {
      case 'receive':
        return (
          <motion.div
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Download className="text-accent h-5 w-5" />
          </motion.div>
        );
      case 'send':
        return (
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Upload className="text-error h-5 w-5" />
          </motion.div>
        );
      case 'swap':
        return (
          <motion.div
            animate={{ rotate: [0, 180] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          >
            <RefreshCw className="text-warning h-5 w-5" />
          </motion.div>
        );
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case 'receive':
        return `Received from ${sender || 'Unknown'}`;
      case 'send':
        return `Sent to ${recipient || 'Unknown'}`;
      case 'swap':
        return 'Auto DCA Purchase';
    }
  };

  const getCategoryIcon = () => {
    if (!category) return null;
    
    switch (category) {
      case 'food':
        return <i className="ri-restaurant-line text-gray-400"></i>;
      case 'shopping':
        return <i className="ri-shopping-bag-line text-gray-400"></i>;
      case 'tips':
        return <PiggyBank className="text-gray-400 h-4 w-4" />;
      case 'services':
        return <Zap className="text-gray-400 h-4 w-4" />;
      default:
        return <i className="ri-price-tag-3-line text-gray-400"></i>;
    }
  };
  
  return (
    <motion.div 
      layout
      className="mb-2 mx-2 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <motion.div 
        className={`
          relative p-4 rounded-xl cursor-pointer transition-all duration-300
          ${isExpanded ? 'neon-border' : 'border border-transparent'}
          ${type === 'receive' ? 'hover:bg-accent/5' : type === 'send' ? 'hover:bg-error/5' : 'hover:bg-warning/5'}
        `}
        whileHover={{ 
          backgroundColor: type === 'receive' 
            ? 'rgba(0, 255, 255, 0.05)'
            : type === 'send' 
              ? 'rgba(255, 0, 102, 0.05)' 
              : 'rgba(255, 204, 0, 0.05)',
          y: -2
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        {/* Background patterns for expanded state */}
        {isExpanded && (
          <div className="absolute inset-0 opacity-10 z-0 hexagon-grid rounded-xl overflow-hidden" />
        )}
        
        {/* Transaction ID hash-like display for expanded view */}
        {isExpanded && (
          <div className="absolute bottom-1 right-2 opacity-30 font-mono text-[9px]">
            tx:{timestamp.toString(16)}...{transaction.id.substring(0, 6)}
          </div>
        )}
        
        <div className="flex items-center z-10 relative">
          <div className={`
            w-12 h-12 rounded-xl glass flex items-center justify-center mr-4
            ${type === 'receive' 
              ? 'border-accent/40 text-accent'
              : type === 'send' 
                ? 'border-error/40 text-error'
                : 'border-warning/40 text-warning'
            }
          `}>
            {getIcon()}
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-base flex items-center">
              {getTitle()}
              {category && (
                <div className="flex items-center ml-2 px-2 py-0.5 bg-gray-800/40 rounded-full text-xs">
                  <span className="mr-1">{getCategoryIcon()}</span>
                  <span className="capitalize">{category}</span>
                </div>
              )}
            </h4>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(date)}</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <motion.p 
              className={`
                font-mono font-medium text-base
                ${type === 'receive' ? 'text-accent' : type === 'send' ? 'text-error' : 'text-warning'}
              `}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-1">{type === 'receive' ? '+' : type === 'send' ? '-' : ''}</span>
              {formatSats(amount)}
              <span className="ml-1 text-xs opacity-70">sats</span>
            </motion.p>
            <p className="text-sm text-gray-400">{formatUSD(amount)}</p>
          </div>
          
          <motion.div 
            className="ml-2"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </motion.div>
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && note && (
            <motion.div 
              className="mt-3 pt-3 border-t border-gray-800 text-sm text-gray-300"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <span className="font-medium mr-2">Note:</span> 
                <span className="opacity-80">{note}</span>
              </div>
              
              {/* Transaction details button */}
              <motion.div 
                className="flex justify-end mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  className="flex items-center text-xs text-primary rounded-lg px-3 py-1 border border-primary/20 hover:bg-primary/10 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>View Details</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const TransactionList = () => {
  const { transactions } = useWallet();
  const [displayCount, setDisplayCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading more transactions
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(count => count + 5);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <motion.h3 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transaction History
        </motion.h3>
        
        <motion.div 
          className="flex items-center bg-black/40 rounded-full px-3 py-1 border border-primary/20 text-sm"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="font-medium text-primary mr-3">All</button>
          <button className="text-gray-400 hover:text-white transition-colors mr-3">Sent</button>
          <button className="text-gray-400 hover:text-white transition-colors">Received</button>
        </motion.div>
      </div>
      
      <motion.div 
        className="cyberpunk-card p-2 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header row with subtle gradient */}
        <div className="p-3 mb-1 text-xs font-medium text-gray-400 border-b border-gray-800 flex">
          <div className="w-1/3">TRANSACTION</div>
          <div className="w-1/3 text-center">DATE & TIME</div>
          <div className="w-1/3 text-right pr-8">AMOUNT</div>
        </div>
        
        {/* Animated scan line */}
        <div className="absolute inset-0 animate-scan-line pointer-events-none"></div>
        
        {/* Transaction items */}
        <div className="divide-y divide-gray-800/30">
          <AnimatePresence>
            {transactions.slice(0, displayCount).map((transaction, index) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                index={index} 
              />
            ))}
          </AnimatePresence>
          
          {transactions.length === 0 && (
            <motion.div 
              className="flex flex-col items-center justify-center py-12 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <i className="ri-inbox-line text-5xl mb-4 opacity-40"></i>
              <p className="text-lg">No transactions yet</p>
              <p className="text-sm mt-2 opacity-70">Your transaction history will appear here</p>
            </motion.div>
          )}
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </motion.div>
      
      {transactions.length > displayCount && (
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button 
            className="px-8 py-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-primary/30 text-sm font-medium text-primary relative overflow-hidden group"
            onClick={loadMore}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)"
            }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
          >
            {/* Button background effect */}
            <motion.div 
              className="absolute inset-0 bg-primary/10 w-full transform -translate-x-full"
              animate={isLoading ? { translateX: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <motion.div 
                    className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading...
                </>
              ) : (
                <>
                  View More 
                  <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default TransactionList;
