import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChartCard from "@/components/ChartCard";
import GlassmorphicCard from "@/components/shared/GlassmorphicCard";
import { formatSats, formatUSD } from "@/lib/utils";

type PeriodType = "daily" | "weekly" | "monthly";

const Insights = () => {
  const [activePeriod, setActivePeriod] = useState<PeriodType>("daily");

  // Sample data for charts
  const transactionData = {
    daily: [
      { name: "Mon", value: 8500 },
      { name: "Tue", value: 12000 },
      { name: "Wed", value: 7500 },
      { name: "Thu", value: 15000 },
      { name: "Fri", value: 9800 },
      { name: "Sat", value: 20000 },
      { name: "Sun", value: 14300 }
    ],
    weekly: [
      { name: "Week 1", value: 45000 },
      { name: "Week 2", value: 57000 },
      { name: "Week 3", value: 32000 },
      { name: "Week 4", value: 68000 }
    ],
    monthly: [
      { name: "Jan", value: 180000 },
      { name: "Feb", value: 220000 },
      { name: "Mar", value: 175000 },
      { name: "Apr", value: 290000 },
      { name: "May", value: 310000 },
      { name: "Jun", value: 270000 }
    ]
  };

  const spendingCategories = [
    { name: "Food & Dining", icon: "ri-restaurant-line", percent: 28, amount: 4802, color: "purple" },
    { name: "Shopping", icon: "ri-shopping-bag-line", percent: 22, amount: 3773, color: "blue" },
    { name: "Tips & Gifts", icon: "ri-group-line", percent: 18, amount: 3087, color: "purple" },
    { name: "Services", icon: "ri-bank-line", percent: 32, amount: 5488, color: "blue" }
  ];

  const summaryData = {
    incoming: {
      amount: 35500,
      percentChange: 22
    },
    outgoing: {
      amount: 17150,
      percentChange: -5
    },
    netFlow: {
      amount: 18350,
      percentChange: 30
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-purple"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Bitcoin Insights
        </motion.h2>
        
        {/* Period selection tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-1 flex space-x-1">
            {(["daily", "weekly", "monthly"] as PeriodType[]).map(period => (
              <motion.button
                key={period}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${activePeriod === period ? 'bg-gradient-purple text-white' : 'hover:bg-primary/20'}`}
                onClick={() => setActivePeriod(period)}
                whileHover={activePeriod !== period ? { scale: 1.05 } : {}}
                whileTap={activePeriod !== period ? { scale: 0.95 } : {}}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassmorphicCard animation="slide" delay={0.1}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Incoming</h3>
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <i className="ri-arrow-down-line text-success"></i>
              </div>
            </div>
            <p className="font-mono text-2xl font-bold">+{formatSats(summaryData.incoming.amount)} sats</p>
            <p className="text-sm opacity-70">≈ {formatUSD(summaryData.incoming.amount)}</p>
            <p className="text-sm text-success mt-2">+{summaryData.incoming.percentChange}% from yesterday</p>
          </GlassmorphicCard>
          
          <GlassmorphicCard animation="slide" delay={0.2}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Outgoing</h3>
              <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
                <i className="ri-arrow-up-line text-error"></i>
              </div>
            </div>
            <p className="font-mono text-2xl font-bold">-{formatSats(summaryData.outgoing.amount)} sats</p>
            <p className="text-sm opacity-70">≈ {formatUSD(summaryData.outgoing.amount)}</p>
            <p className="text-sm text-error mt-2">{summaryData.outgoing.percentChange}% from yesterday</p>
          </GlassmorphicCard>
          
          <GlassmorphicCard animation="slide" delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Net Flow</h3>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <i className="ri-exchange-line text-primary"></i>
              </div>
            </div>
            <p className="font-mono text-2xl font-bold">+{formatSats(summaryData.netFlow.amount)} sats</p>
            <p className="text-sm opacity-70">≈ {formatUSD(summaryData.netFlow.amount)}</p>
            <p className="text-sm text-success mt-2">+{summaryData.netFlow.percentChange}% from yesterday</p>
          </GlassmorphicCard>
        </div>
        
        {/* Main chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePeriod}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <ChartCard
              title={`${activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)} Transactions`}
              chart="area"
              data={transactionData[activePeriod]}
              icon={
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <i className="ri-line-chart-line text-primary"></i>
                </div>
              }
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Category breakdown */}
        <h3 className="text-xl font-medium mb-6">Spending Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spendingCategories.map((category, index) => (
            <GlassmorphicCard key={index} animation="slide" delay={index * 0.1}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-${category.color} flex items-center justify-center`}>
                  <i className={`${category.icon} text-white text-xl`}></i>
                </div>
                <motion.p 
                  className="font-mono text-lg font-semibold"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  {category.percent}%
                </motion.p>
              </div>
              <h4 className="text-lg font-medium">{category.name}</h4>
              <p className="text-sm opacity-70 mt-1">{formatSats(category.amount)} sats spent</p>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Insights;
