import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import GlassmorphicCard from "@/components/shared/GlassmorphicCard";
import { Link } from "wouter";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Set Up Your Wallet",
      description: "Create your wallet in seconds with our easy onboarding process. No complex setup or technical knowledge required.",
      features: [
        "Self-custodial - you own your keys",
        "Simple backup process",
        "Multiple theme options"
      ],
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      imageAlt: "Bitcoin wallet setup screen",
      gradientType: "purple"
    },
    {
      number: 2,
      title: "Send with Ease",
      description: "Sending bitcoin has never been more intuitive. Simply enter an amount, scan a QR code, or select a contact from your favorites.",
      features: [
        "Lightning Network support",
        "QR code scanning",
        "Slide-to-confirm safety"
      ],
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      imageAlt: "Bitcoin sending interface",
      gradientType: "blue"
    },
    {
      number: 3,
      title: "Split Bills with Friends",
      description: "No more awkward IOUs. Split bills with friends directly in Bitcoin with our intuitive splitting tool.",
      features: [
        "Equal or custom splitting",
        "Shareable payment links",
        "Track who has paid"
      ],
      // Using data URL for the image to ensure it loads reliably
      image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+CiAgPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxMTExMWYiLz4KICA8cGF0aCBkPSJNMCAwIEw2MDAgNDAwIE02MDAgMCBMMCA0MDAiIHN0cm9rZT0iIzQwMjA2MCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+CiAgCiAgPCEtLSBCYWNrZ3JvdW5kIGVmZmVjdHMgLS0+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSIyMDAiIGZpbGw9InJnYmEoMjU1LCAwLCAyNTUsIDAuMDMpIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9InJnYmEoMCwgMjU1LCAyNTUsIDAuMDIpIi8+CiAgCiAgPCEtLSBNYWluIGNvbnRlbnQgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUwLCAxMDApIj4KICAgIDwhLS0gUGFwZXIgYmlsbCB3aXRoIG5lb24gZWRnZXMgLS0+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjgiIGZpbGw9IiMyMDIwMzUiIHN0cm9rZT0iI2ZmMDBmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICAKICAgIDwhLS0gQmlsbCBoZWFkZXIgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMzAiIHJ4PSI0IiBmaWxsPSIjMzAzMDUwIi8+CiAgICA8dGV4dCB4PSIxNTAiIHk9IjQwIiBmb250LWZhbWlseT0iJ0FyaWFsJyIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QklUQ09JTiBCT1RUTEUgU0VSVklDRTwvdGV4dD4KICAgIAogICAgPCEtLSBCaWxsIGl0ZW1zIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjcwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjEiIGZpbGw9IiM2MDYwODAiLz4KICAgIDxsaW5lIHgxPSIyMCIgeTE9IjEwMCIgeDI9IjI4MCIgeTI9IjEwMCIgc3Ryb2tlPSIjNDA0MDYwIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDxsaW5lIHgxPSIyMCIgeTE9IjEzMCIgeDI9IjI4MCIgeTI9IjEzMCIgc3Ryb2tlPSIjNDA0MDYwIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDxsaW5lIHgxPSIyMCIgeTE9IjE2MCIgeDI9IjI4MCIgeTI9IjE2MCIgc3Ryb2tlPSIjNDA0MDYwIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIAogICAgPHRleHQgeD0iMzAiIHk9IjkwIiBmb250LWZhbWlseT0iJ0FyaWFsJyIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZmZmZiI+TGFnZXIgQmVlciB4MjwvdGV4dD4KICAgIDx0ZXh0IHg9IjI1MCIgeT0iOTAiIGZvbnQtZmFtaWx5PSInQXJpYWwnIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmYwMGZmIiB0ZXh0LWFuY2hvcj0iZW5kIj4yOSw5MDA8L3RleHQ+CiAgICAKICAgIDx0ZXh0IHg9IjMwIiB5PSIxMjAiIGZvbnQtZmFtaWx5PSInQXJpYWwnIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmZmZmIj5CdXJnZXIgeDM8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTAiIHk9IjEyMCIgZm9udC1mYW1pbHk9IidBcmlhbCciIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZjAwZmYiIHRleHQtYW5jaG9yPSJlbmQiPjQyLDUwMDwvdGV4dD4KICAgIAogICAgPHRleHQgeD0iMzAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IidBcmlhbCciIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZmZmZmYiPk1pbmVyYWwgV2F0ZXIgeDQ8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IidBcmlhbCciIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZjAwZmYiIHRleHQtYW5jaG9yPSJlbmQiPjEyLDYwMDwvdGV4dD4KICAgIAogICAgPCEtLSBUb3RhbCAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIxNzAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMSIgZmlsbD0iIzYwNjA4MCIvPgogICAgPHRleHQgeD0iMzAiIHk9IjE5MCIgZm9udC1mYW1pbHk9IidBcmlhbCciIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmZmZmYiIGZvbnQtd2VpZ2h0PSJib2xkIj5UT1RBTDwvdGV4dD4KICAgIDx0ZXh0IHg9IjI1MCIgeT0iMTkwIiBmb250LWZhbWlseT0iJ0FyaWFsJyIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmZmZiIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC13ZWlnaHQ9ImJvbGQiPjg1LDAwMCBzYXRzPC90ZXh0PgogIDwvZz4KICAKICA8IS0tIFNwbGl0IHZpc3VhbGl6YXRpb24gLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUwLCAzMjApIj4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCIgeTI9IjAiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz4KICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMCIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUsNSIvPgogICAgPGxpbmUgeDE9IjIwMCIgeTE9IjAiIHgyPSIzMDAiIHkyPSIwIiBzdHJva2U9IiMwMGZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNSw1Ii8+CiAgICAKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iMzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjIpIiBzdHJva2U9IiMwMGZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDI1NSwgMCwgMjU1LCAwLjIpIiBzdHJva2U9IiNmZjAwZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iMzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjIpIiBzdHJva2U9IiMwMGZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgCiAgICA8dGV4dCB4PSI1MCIgeT0iMzUiIGZvbnQtZmFtaWx5PSInQXJpYWwnIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5AMjUlPC90ZXh0PgogICAgPHRleHQgeD0iMTUwIiB5PSIzNSIgZm9udC1mYW1pbHk9IidBcmlhbCciIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkA1MCU8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTAiIHk9IjM1IiBmb250LWZhbWlseT0iJ0FyaWFsJyIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QDI1JTwvdGV4dD4KICA8L2c+CiAgCiAgPCEtLSBCaXRjb2luIHN5bWJvbCAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MzAsIDUwKSI+CiAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0icmdiYSgyNTUsIDAsIDI1NSwgMC4zKSIvPgogICAgPHBhdGggZD0iTTIwIDUgTDIwIDM1IE0xMCAxMCBMMzAgMTAgTTEwIDMwIEwzMCAzMCBNMTUgNSBMMTUgMTAgTTI1IDUgTDI1IDEwIE0xNSAzMCBMMTUgMzUgTTI1IDMwIEwyNSAzNSIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8L2c+Cjwvc3ZnPg==",
      imageAlt: "Bitcoin bill splitting interface",
      gradientType: "purple"
    },
    {
      number: 4,
      title: "Track Your Spending",
      description: "Get valuable insights into your Bitcoin spending habits with beautiful charts and categorized transactions.",
      features: [
        "Daily, weekly, monthly views",
        "Animated charts and stats",
        "Spending category breakdown"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      imageAlt: "Bitcoin spending analytics dashboard",
      gradientType: "blue"
    }
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
          How Sats Pocket Works
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`md:w-1/2 mb-8 md:mb-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div 
                  className={`w-16 h-16 rounded-full bg-gradient-${step.gradientType} flex items-center justify-center mb-4`}
                  whileInView={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="text-white text-2xl font-bold">{step.number}</span>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="opacity-80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <i className="ri-check-line text-success mr-2"></i>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <GlassmorphicCard className="p-4 md:p-6 shadow-lg">
                  <motion.img 
                    src={step.image} 
                    alt={step.imageAlt} 
                    className="rounded-xl w-full"
                    whileInView={{ scale: [0.95, 1.02, 1] }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  />
                </GlassmorphicCard>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Modernize Your Bitcoin Experience?</h3>
          <p className="opacity-80 mb-8 max-w-2xl mx-auto">Join thousands of Bitcoin users who have upgraded to the most beautiful and functional wallet available.</p>
          <Link href="/wallet">
            <AnimatedButton variant="gradient" size="lg">
              Get Started Now
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default HowItWorks;
