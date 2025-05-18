import { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import GlassmorphicCard from "./shared/GlassmorphicCard";
import { useTheme } from "@/context/ThemeContext";

interface ChartCardProps {
  title: string;
  chart: "area" | "bar";
  data: any[];
  icon?: ReactNode;
  className?: string;
}

const ChartCard = ({ title, chart, data, icon, className }: ChartCardProps) => {
  const controls = useAnimation();
  const { theme } = useTheme();

  // Get chart colors based on theme
  const getChartColors = () => {
    if (theme === 'dark') {
      return {
        primary: 'rgba(138, 43, 226, 0.8)',
        secondary: 'rgba(255, 20, 147, 0.8)',
        gradient: ['rgba(138, 43, 226, 0.8)', 'rgba(255, 20, 147, 0.1)']
      };
    } else if (theme === 'light') {
      return {
        primary: 'rgba(138, 43, 226, 0.7)',
        secondary: 'rgba(255, 20, 147, 0.7)',
        gradient: ['rgba(138, 43, 226, 0.7)', 'rgba(255, 20, 147, 0.05)']
      };
    } else {
      // Sepia
      return {
        primary: 'rgba(138, 43, 226, 0.6)',
        secondary: 'rgba(255, 20, 147, 0.6)',
        gradient: ['rgba(138, 43, 226, 0.6)', 'rgba(255, 20, 147, 0.05)']
      };
    }
  };

  const colors = getChartColors();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <GlassmorphicCard className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">{title}</h3>
        {icon && (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
        )}
      </div>

      <motion.div
        className="h-80 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chart === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.gradient[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors.gradient[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: theme === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 
                             theme === 'light' ? 'rgba(248, 249, 250, 0.8)' : 
                             'rgba(245, 232, 200, 0.8)',
                  border: '1px solid rgba(138, 43, 226, 0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                fillOpacity={1}
                fill="url(#colorPrimary)"
                animationDuration={1500}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: theme === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 
                             theme === 'light' ? 'rgba(248, 249, 250, 0.8)' : 
                             'rgba(245, 232, 200, 0.8)',
                  border: '1px solid rgba(138, 43, 226, 0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </GlassmorphicCard>
  );
};

export default ChartCard;
