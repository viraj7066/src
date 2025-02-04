import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'fdm',
    title: "FDM",
    description: "Fused Deposition Modeling for robust and functional parts",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800"
  },
  {
    id: 'resin',
    title: "Resin",
    description: "High-detail resin printing for precision prototypes",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
  },
  {
    id: 'cnc',
    title: "CNC",
    description: "Computer numerical control machining for metal parts",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800"
  }
];

const additionalServices = [
  {
    id: 'vacuum-forming',
    title: "Vacuum Forming",
    description: "Create perfect molds and packaging solutions",
    image: "https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjaGluZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 'injection-molding',
    title: "Injection Molding",
    description: "Mass production with consistent quality",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <Link to={`/services/${service.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-all duration-700"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {additionalServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;