import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Trophy, Package, Briefcase } from 'lucide-react';

const Counter = ({ end, duration = 2, label, icon: Icon }) => {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, controls]);

  return (
    <motion.div
      ref={countRef}
      className="milestone-card relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <Icon className="w-12 h-12 text-blue-600 mb-4 relative z-10" />
      <motion.div 
        className="text-5xl font-bold text-blue-600 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}+
      </motion.div>
      <span className="text-xl text-gray-600 mt-2 text-center relative z-10">{label}</span>
      
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.1) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

const Milestones = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Milestones</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our achievements and continuous growth in delivering excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Counter
            end={100}
            label="Clients Served"
            icon={Trophy}
          />
          <Counter
            end={250}
            label="Products Delivered"
            icon={Package}
          />
          <Counter
            end={50}
            label="Active Projects"
            icon={Briefcase}
          />
        </div>
      </div>
    </section>
  );
};

export default Milestones;