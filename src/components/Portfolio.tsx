import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const portfolioItems = [
  {
    title: "Custom Gaming Controller",
    category: "Consumer Electronics",
    description: "3D printed custom gaming controller with ergonomic design",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
    size: "large"
  },
  {
    title: "Architectural Model",
    category: "Architecture",
    description: "Detailed architectural model for urban planning",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800",
    size: "small"
  },
  {
    title: "Medical Device Prototype",
    category: "Healthcare",
    description: "Prototype for innovative medical device",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
    size: "medium"
  },
  {
    title: "Custom Jewelry Design",
    category: "Fashion",
    description: "Bespoke 3D printed jewelry pieces",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    size: "small"
  },
  {
    title: "Industrial Component",
    category: "Manufacturing",
    description: "Precision-engineered industrial part",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800",
    size: "medium"
  },
  {
    title: "Art Installation",
    category: "Art & Design",
    description: "Contemporary art piece created with 3D printing",
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800",
    size: "large"
  }
];

const PortfolioItem = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-xl ${
        item.size === 'large' ? 'md:col-span-2 md:row-span-2' :
        item.size === 'medium' ? 'md:col-span-2' : ''
      }`}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#FF8C42] text-sm font-medium mb-2">{item.category}</p>
              <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
            <button className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <ExternalLink className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">Our Masterpieces</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our innovative 3D-printed creations, tailored to perfection for every client
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;