import { motion } from "framer-motion";
import GlassmorphicCard from "./shared/GlassmorphicCard";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <GlassmorphicCard className="card-hover">
      <motion.div 
        className="w-14 h-14 rounded-full bg-gradient-purple flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className={`${icon} text-white text-2xl`}></i>
      </motion.div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="opacity-70">{description}</p>
    </GlassmorphicCard>
  );
};

export default FeatureCard;
