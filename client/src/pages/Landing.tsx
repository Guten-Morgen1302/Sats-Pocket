import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";
import AnimatedButton from "@/components/AnimatedButton";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";

const Landing = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: "ri-secure-payment-line",
      title: "Self-Custody Simplified",
      description: "Your keys, your bitcoin. We make self-custody simple with intuitive backups and recovery options."
    },
    {
      icon: "ri-flash-line",
      title: "Lightning Fast",
      description: "Integrated Lightning Network support for instant microtransactions and minimal fees."
    },
    {
      icon: "ri-group-line",
      title: "Split & Share",
      description: "Easily split bills with friends and share payment requests with a beautiful interface."
    },
    {
      icon: "ri-line-chart-line",
      title: "Spending Insights",
      description: "Beautiful visualizations of your bitcoin spending patterns and habits."
    },
    {
      icon: "ri-lock-password-line",
      title: "Enhanced Privacy",
      description: "Built-in privacy features to keep your financial data secure and private."
    },
    {
      icon: "ri-palette-line",
      title: "Multiple Themes",
      description: "Customize your experience with Cyberpunk-Dark, Light, and Sepia themes."
    }
  ];

  const testimonials = [
    {
      name: "Michael Johnson",
      role: "Bitcoin Developer",
      initials: "MJ",
      text: "Finally, a Bitcoin wallet that doesn't compromise on UX. The split bill feature has changed how my friends and I handle payments.",
      rating: 5
    },
    {
      name: "Sarah Lee",
      role: "Tech Enthusiast",
      initials: "SL",
      text: "The design is breathtaking. I've tried dozens of Bitcoin apps, but Sats Pocket stands out with its beautiful animations and intuitive interface.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Merchant",
      initials: "AT",
      text: "As a small business owner, the insights feature helps me track Bitcoin payments and manage my finances. The UI is simply exceptional.",
      rating: 4.5
    }
  ];

  return (
    <main>
      <section id="landing" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-10 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-purple"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your Bitcoin, <br/>Pocketed.
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl opacity-80 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                A modern Bitcoin micro-wallet designed for daily use. Lightning-fast transactions, beautiful interface, and unmatched security.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/wallet">
                  <AnimatedButton variant="gradient" size="lg">
                    Try Demo
                  </AnimatedButton>
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <AnimatedButton variant="glow" size="lg">
                    <i className="ri-github-fill mr-2"></i> GitHub
                  </AnimatedButton>
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
                alt="Sats Pocket app interface mockup" 
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-10 -right-10 h-20 w-20 bg-gradient-blue rounded-full opacity-40 blur-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-5 -left-5 h-16 w-16 bg-gradient-purple rounded-full opacity-40 blur-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Features section */}
        <div className="container mx-auto px-6 py-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-blue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Future-Proof Features
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-6 py-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-purple"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Bitcoiners Are Saying
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  initials={testimonial.initials}
                  text={testimonial.text}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-20">
          <motion.div 
            className="glass rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-blue rounded-full opacity-20 blur-xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-purple rounded-full opacity-20 blur-xl -ml-32 -mb-32"></div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to modernize your Bitcoin experience?
              </motion.h2>
              <motion.p 
                className="text-lg opacity-80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Join thousands of Bitcoiners who have upgraded to the most beautiful wallet on the market.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/wallet">
                  <AnimatedButton variant="gradient" size="lg">
                    Get Started Now
                  </AnimatedButton>
                </Link>
                <Link href="/how-it-works">
                  <AnimatedButton variant="glow" size="lg">
                    Learn More
                  </AnimatedButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
