import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://www.allprintheads.com/cdn/shop/articles/AdobeStock_590508911_1100x850_98c8da31-0432-4d8e-b77b-62e8a92c5cb5.jpg?v=1695401050", // 3D printer in action
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80", // CNC machine
    "https://images.unsplash.com/photo-1638959492386-f9a68d55c374?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBwcmludGluZ3xlbnwwfHwwfHx8MA%3D%3D"  // 3D printed objects
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Slightly longer duration for better viewing

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-background"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Images with Enhanced Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              opacity: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 6, ease: "linear" }
            }
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: "easeIn" }
          }}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("${backgroundImages[currentImageIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Hero Title with Enhanced Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2,
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="absolute top-1/3 -translate-y-1/2 inset-x-0 flex items-center justify-center text-[10vw] font-black text-white pointer-events-none select-none tracking-tighter pl-10"
      >
        PROTOFORM.
      </motion.h1>

      {/* Hero Text with Staggered Animation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-end pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
            className="space-y-4 mt-8 pl-10 text-left"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
              className="text-2xl font-bold text-white text-center"
            >
              Giving wings to your imagination with precision crafting.
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
              className="text-xl sm:text-2xl max-w-2xl mx-auto text-white text-center"
            >
              The 3D printing service that brings your ideas to life with precision and innovation
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;