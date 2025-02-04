import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Options = () => {
  return (
    <section className="py-24 bg-white" id="options">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Your One-Stop 3D Printing Solution</h2>
          <p className="text-xl text-gray-600">
            From custom designs to pre-made products, we make your 3D printing journey seamless and exciting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/custom">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-80 w-full bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" 
                alt="Custom Manufacturing"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Custom</h3>
                <p className="text-gray-200 mb-4">Bring your unique ideas to life with our custom manufacturing solutions</p>
                <div className="flex items-center text-white">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </motion.button>
          </Link>

          <Link to="/store">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-80 w-full bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800" 
                alt="Store Products"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Store</h3>
                <p className="text-gray-200 mb-4">Explore our collection of ready-to-order premium products</p>
                <div className="flex items-center text-white">
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Options;