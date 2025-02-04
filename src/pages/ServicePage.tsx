import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceDetails = {
  fdm: {
    title: "Fused Deposition Modeling (FDM)",
    description: "FDM technology constructs parts layer-by-layer from the bottom up by heating and extruding thermoplastic filament",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
    features: [
      "Layer Resolution: 100-400 microns",
      "Build Volume: Up to 300x300x300mm",
      "Materials: PLA, ABS, PETG, TPU",
      "Applications: Prototypes, End-use parts, Tooling"
    ],
    benefits: [
      "Cost-effective for prototypes",
      "Quick turnaround time",
      "Wide range of materials",
      "Suitable for functional parts"
    ]
  },
  resin: {
    title: "Resin 3D Printing (SLA/DLP)",
    description: "Resin printing uses light-sensitive liquid resin that cures into solid plastic when exposed to UV light",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800",
    features: [
      "Layer Resolution: 25-100 microns",
      "Build Volume: Up to 200x200x200mm",
      "Materials: Standard, Tough, Flexible, Castable",
      "Applications: Jewelry, Dental, Miniatures"
    ],
    benefits: [
      "High detail accuracy",
      "Smooth surface finish",
      "Ideal for small parts",
      "Professional quality"
    ]
  },
  cnc: {
    title: "CNC Machining",
    description: "Computer Numerical Control machining creates parts by removing material from a solid block",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800",
    features: [
      "Accuracy: ±0.025mm",
      "Materials: Metals, Plastics, Wood",
      "Max Size: 1000x500x500mm",
      "Surface Finish: Ra 0.8-3.2"
    ],
    benefits: [
      "High precision",
      "Excellent surface finish",
      "Wide material selection",
      "Production-ready parts"
    ]
  },
  "vacuum-forming": {
    title: "Vacuum Forming",
    description: "Creates plastic parts by heating a sheet of plastic and forming it over a mold using vacuum",
    image: "https://images.unsplash.com/photo-1581092160607-f6aa8a959e2c?q=80&w=800",
    features: [
      "Sheet Thickness: 0.5-6mm",
      "Max Size: 600x400mm",
      "Materials: PET, PS, ABS, PC",
      "Cycle Time: 2-5 minutes"
    ],
    benefits: [
      "Cost-effective for series",
      "Quick production",
      "Low tooling costs",
      "Ideal for packaging"
    ]
  },
  "injection-molding": {
    title: "Injection Molding",
    description: "High-volume production method that injects molten material into a mold cavity",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800",
    features: [
      "Part Weight: 1g-1kg",
      "Materials: Most thermoplastics",
      "Cycle Time: 15-60 seconds",
      "Tool Life: 100k+ parts"
    ],
    benefits: [
      "High volume production",
      "Consistent quality",
      "Complex geometries",
      "Material variety"
    ]
  }
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const service = serviceDetails[serviceId];

  useEffect(() => {
    // GSAP animations
    gsap.from(".service-header", {
      scrollTrigger: {
        trigger: ".service-header",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".service-content", {
      scrollTrigger: {
        trigger: ".service-content",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out"
    });
  }, []);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="service-header text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{service.description}</p>
        </motion.div>

        <div className="service-content grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={service.image} alt={service.title} className="w-full h-[400px] object-cover" />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;