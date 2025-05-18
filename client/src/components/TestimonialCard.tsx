import { motion } from "framer-motion";
import GlassmorphicCard from "./shared/GlassmorphicCard";

interface TestimonialCardProps {
  name: string;
  role: string;
  initials: string;
  text: string;
  rating: number;
}

const TestimonialCard = ({ name, role, initials, text, rating }: TestimonialCardProps) => {
  // Create array for star ratings
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <GlassmorphicCard>
      <div className="flex items-center mb-4">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center mr-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-white font-bold">{initials}</span>
        </motion.div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm opacity-70">{role}</p>
        </div>
      </div>
      <p className="opacity-80 italic">{text}</p>
      <div className="mt-4 flex">
        {[...Array(fullStars)].map((_, i) => (
          <motion.i 
            key={`full-${i}`} 
            className="ri-star-fill text-yellow-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
        {hasHalfStar && (
          <motion.i 
            className="ri-star-half-fill text-yellow-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: fullStars * 0.1, duration: 0.3 }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <motion.i 
            key={`empty-${i}`} 
            className="ri-star-line text-yellow-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
    </GlassmorphicCard>
  );
};

export default TestimonialCard;
