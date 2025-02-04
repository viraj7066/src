import React from 'react';
import { motion } from 'framer-motion';
import FAQ from './FAQ';

const About = () => {
  return (
    <>
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 text-lg mb-6">
                At Protoform, we're passionate about turning innovative ideas into reality. Our state-of-the-art manufacturing facility combines cutting-edge technology with expert craftsmanship to deliver exceptional results.
              </p>
              <p className="text-gray-600 text-lg">
                With years of experience in additive manufacturing and precision engineering, we've helped countless clients bring their projects to life. From rapid prototyping to full-scale production, we're your partner in innovation.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <FAQ />
    </>
  );
};

export default About;