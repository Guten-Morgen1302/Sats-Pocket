import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Wallet, ArrowUpRight, Activity, Zap, Settings, ChevronRight, ChevronLeft, Download, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';

import CyberpunkCard from '@/components/CyberpunkCard';
import NeonText from '@/components/NeonText';
import NeonButton from '@/components/NeonButton';
import CircularProgress from '@/components/CircularProgress';
import DataDisplay from '@/components/DataDisplay';
import HexPanel from '@/components/HexPanel';

import { formatSats, formatUSD } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

// Mock data for charts
const activityData = [
  { name: '1h', value: 2300 },
  { name: '2h', value: 1800 },
  { name: '3h', value: 3100 },
  { name: '4h', value: 2700 },
  { name: '5h', value: 5800 },
  { name: '6h', value: 4500 },
  { name: '7h', value: 7200 },
  { name: '8h', value: 6100 },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-primary/30 text-xs font-mono">
        <p className="text-white">{`${label}: ${payload[0].value} sats`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { balance, addTransaction } = useWallet();
  const { toast } = useToast();
  const [time, setTime] = useState('');
  const [liftupReady, setLiftupReady] = useState(78);
  const [currentAction, setCurrentAction] = useState('INITIALIZING SYSTEM');
  const [featureIndex, setFeatureIndex] = useState(0);
  
  // Mock feature data sets for the bar chart
  const allFeatureData = [
    [
      { name: 'Txs', value: 42 },
      { name: 'Swaps', value: 28 },
      { name: 'Lightning', value: 65 },
      { name: 'Staking', value: 15 },
    ],
    [
      { name: 'Fees', value: 12 },
      { name: 'DCA', value: 38 },
      { name: 'Splits', value: 27 },
      { name: 'Tips', value: 45 },
    ],
    [
      { name: 'Cold', value: 55 },
      { name: 'Hot', value: 33 },
      { name: 'DeFi', value: 18 },
      { name: 'NFT', value: 22 },
    ]
  ];
  
  // Toast notifications for button clicks
  const showToast = (title: string, description: string, variant: "default" | "destructive" | null = "default") => {
    toast({
      title,
      description,
      variant
    });
  };
  
  // Handle activation button 
  const handleActivate = () => {
    setLiftupReady(100);
    setCurrentAction('SYSTEM ACTIVATED');
    showToast("Activation Successful", "Bitcoin system fully activated and ready for operation.", "default");
  };
  
  // Handle config button
  const handleConfig = () => {
    showToast("Configuration Mode", "System configuration panel initialized", "default");
  };
  
  // Handle enhance button
  const handleEnhance = () => {
    showToast("Enhancement Active", "Cyberpunk enhancements enabled. Performance boosted.", "default");
  };
  
  // Handle send transaction
  const handleSend = () => {
    addTransaction({
      type: 'send',
      amount: 25000,
      recipient: 'Cyberpunk Corp',
      note: 'System upgrade payment',
      category: 'services'
    });
    showToast("Transaction Sent", "25,000 sats sent to Cyberpunk Corp", "default");
  };
  
  // Handle receive transaction
  const handleReceive = () => {
    addTransaction({
      type: 'receive',
      amount: 42000, 
      sender: 'Anonymous',
      note: 'Payment received',
      category: 'services'
    });
    showToast("Payment Received", "42,000 sats received from Anonymous", "default");
  };
  
  // Handle swap
  const handleSwap = () => {
    addTransaction({
      type: 'swap',
      amount: 15000,
      note: 'Swapped to USD',
    });
    showToast("Swap Completed", "15,000 sats swapped to USD", "default");
  };
  
  // Handle navigation through feature charts
  const handleNextFeature = () => {
    setFeatureIndex((featureIndex + 1) % allFeatureData.length);
    showToast("Chart Updated", "Viewing next data set", "default");
  };
  
  const handlePrevFeature = () => {
    setFeatureIndex((featureIndex - 1 + allFeatureData.length) % allFeatureData.length);
    showToast("Chart Updated", "Viewing previous data set", "default");
  };

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simulate changing action text
  useEffect(() => {
    const actions = [
      'SYSTEM READY',
      'SCANNING NETWORK',
      'MONITORING TRANSACTIONS',
      'UPDATING BALANCE',
      'CHECKING LIGHTNING CHANNELS'
    ];
    
    let index = 0;
    const changeAction = () => {
      setCurrentAction(actions[index % actions.length]);
      index++;
    };
    
    const timer = setInterval(changeAction, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A14] bg-opacity-95 relative overflow-hidden -mt-[52px] pt-[52px]">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      
      {/* Glowing orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow animation-delay-1000 z-0"></div>
      
      {/* Hex patterns */}
      <div className="absolute top-10 right-10 hex-pattern w-96 h-96 opacity-10 z-0"></div>
      <div className="absolute bottom-10 left-10 hex-pattern w-96 h-96 opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-1">
        {/* Header section */}
        <motion.div 
          className="mb-5 border-b border-primary/20 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end">
            <div className="mr-5 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow">
              <Wallet className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
                SATS CONTROL
              </h1>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <p className="text-gray-300 font-mono tracking-wider text-sm">
                  SYSTEM ONLINE • {time} • NETWORK SECURE
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-xs font-mono text-gray-400 mt-5">
            <div>NODE: ACTIVE</div>
            <div>MEMPOOL: SYNCED</div>
            <div>NETWORK: MAINNET</div>
            <div className="text-right">SECURITY: MAXIMUM</div>
          </div>
        </motion.div>
        
        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Time and status card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <CyberpunkCard className="h-full" withHeader title="SYSTEM STATUS" headerIcon={<Clock size={16} />}>
              <div className="flex flex-col">
                <NeonText color="accent" size="xl" weight="bold" mono={true} className="mb-4">
                  {time}
                </NeonText>
                <div className="flex items-center mb-4 bg-primary/10 p-2 rounded">
                  <div className="h-3 w-3 rounded-full bg-accent mr-2 animate-pulse"></div>
                  <span className="text-xs text-white font-mono">NETWORK ACTIVE</span>
                </div>
                <div className="mt-1 border-t border-primary/30 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">CURRENT PROCESS:</span>
                  </div>
                  <NeonText color="primary" size="sm" mono={true} className="mt-1">
                    {currentAction}
                  </NeonText>
                </div>
              </div>
            </CyberpunkCard>
          </motion.div>
          
          {/* System boost card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CyberpunkCard className="h-full" title="SYSTEM BOOST" withHeader headerIcon={<Zap size={16} />}>
              <div className="flex justify-center items-center">
                <CircularProgress 
                  value={liftupReady} 
                  max={100} 
                  color="accent" 
                  size={130} 
                  valueLabel="READY"
                  animated
                />
              </div>
              <div className="flex justify-center mt-4">
                <NeonButton variant="primary" size="sm" onClick={handleActivate} neonPulse>
                  ACTIVATE
                </NeonButton>
              </div>
            </CyberpunkCard>
          </motion.div>
          
          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-1 md:col-span-2"
          >
            <CyberpunkCard className="h-full" title="SATS BALANCE" withHeader headerIcon={<Wallet size={16} />}>
              <div className="relative">
                <div className="absolute -top-5 -right-5 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                <div className="flex items-baseline mb-5">
                  <NeonText color="primary" size="2xl" weight="bold" mono glowIntensity="high">
                    {formatSats(balance)}
                  </NeonText>
                  <span className="text-xs text-gray-400 ml-2 font-mono">≈ {formatUSD(balance)}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <NeonButton variant="primary" size="sm" icon={<ArrowUpRight size={14} />} onClick={handleSend}>
                    SEND
                  </NeonButton>
                  <NeonButton variant="accent" size="sm" onClick={handleReceive}>
                    RECEIVE
                  </NeonButton>
                  <NeonButton variant="outline" size="sm" onClick={handleSwap}>
                    SWAP
                  </NeonButton>
                </div>
                
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-300">Last Transaction:</span>
                    </div>
                    <span className="text-xs font-mono text-accent">+12,500 sats (2m ago)</span>
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          </motion.div>
          
          {/* System customizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="col-span-1 md:col-span-2"
          >
            <HexPanel className="h-full" title="SYSTEM CUSTOMIZR" headerIcon={<Settings size={16} />}>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <RefreshCw size={14} className="text-primary mr-1" />
                    <span className="text-xs text-white font-mono">SYSTEM SETT</span>
                  </div>
                  <NeonText color="primary" size="xl" weight="bold" mono={true} className="mb-1">
                    271
                  </NeonText>
                  <div className="w-full bg-gray-800 h-1 mb-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">OPTIMIZING...</span>
                </div>
                
                <div className="bg-accent/5 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Download size={14} className="text-accent mr-1" />
                    <span className="text-xs text-white font-mono">TANG HOLDINGS</span>
                  </div>
                  <NeonText color="accent" size="xl" weight="bold" mono={true} className="mb-1">
                    77,557
                  </NeonText>
                  <div className="w-full bg-gray-800 h-1 mb-2 rounded-full overflow-hidden">
                    <div className="bg-accent h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">PEAK CAPACITY</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <NeonButton variant="accent" size="sm" fullWidth onClick={handleConfig}>
                  CONFIG
                </NeonButton>
                <NeonButton variant="primary" size="sm" fullWidth onClick={handleEnhance}>
                  ENHANCE
                </NeonButton>
              </div>
            </HexPanel>
          </motion.div>
          
          {/* Activity chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <CyberpunkCard className="h-full" title="ACTIVITY TRACE" withHeader headerIcon={<Activity size={16} />}>
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} 
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="rgba(0, 255, 255, 0.8)" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 4, fill: '#0A0A14', stroke: 'rgba(0, 255, 255, 0.8)' }}
                      activeDot={{ r: 6, fill: '#0A0A14', stroke: 'rgba(0, 255, 255, 1)', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-400 font-mono">
                <span>1 HOUR AGO</span>
                <span>CURRENT</span>
              </div>
            </CyberpunkCard>
          </motion.div>
          
          {/* Feature usage chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <CyberpunkCard className="h-full" title="PERFORMANCE METRICS" withHeader>
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allFeatureData[featureIndex]}>
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} 
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill="rgba(255, 0, 255, 0.7)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-3 space-x-3">
                <NeonButton variant="outline" size="sm" icon={<ChevronLeft size={14} />} onClick={handlePrevFeature}>
                  Prev
                </NeonButton>
                <NeonButton variant="outline" size="sm" icon={<ChevronRight size={14} />} onClick={handleNextFeature}>
                  Next
                </NeonButton>
              </div>
            </CyberpunkCard>
          </motion.div>
          
          {/* Bottom navigation panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="col-span-1 md:col-span-4"
          >
            <CyberpunkCard className="mt-4" withHeader={false}>
              <div className="flex flex-wrap justify-center gap-4 py-3">
                <Link href="/wallet">
                  <NeonButton variant="primary" neonPulse>
                    WALLET
                  </NeonButton>
                </Link>
                <NeonButton 
                  variant="outline"
                  onClick={() => showToast("Transactions", "Viewing your transaction history", "default")}
                >
                  TRANSACTIONS
                </NeonButton>
                <NeonButton 
                  variant="outline"
                  onClick={() => showToast("Settings", "System settings panel opened", "default")}
                >
                  SETTINGS
                </NeonButton>
                <NeonButton 
                  variant="accent"
                  onClick={() => showToast("Lightning Network", "Connecting to Lightning Network nodes...", "default")}
                >
                  LIGHTNING
                </NeonButton>
              </div>
            </CyberpunkCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;