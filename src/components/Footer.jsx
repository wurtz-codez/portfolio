import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black/80 text-gray-400 text-center py-16 pb-24 relative z-10 border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">Koustubh Pande</h3>
          <p className="text-gray-400">Developer | Designer</p>
        </div>
        
        <div className="w-16 h-1 bg-blue-500/30 mx-auto mb-8 rounded-full"></div>
        
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Koustubh Pande. All rights reserved.
        </p>
        <p className="text-xs mb-4 flex items-center justify-center">
          Made with <FaHeart className="text-red-500 mx-1" size={12} />
          by Koustubh. 
        </p>
        <p className="text-xs text-gray-500">
          Thanks for visiting my portfolio!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
