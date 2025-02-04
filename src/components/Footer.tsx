import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-300" />
                <span>info@protoform.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-300" />
                <span>13B, Sant gadage baba colony, behind Dhruv apartment, Swaminarayan road, Deopur Dhule</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Protoform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;