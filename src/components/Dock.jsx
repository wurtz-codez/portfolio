import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Dock({ onNavigate, currentSection }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dockItems = [
    { icon: <FaHome size={isMobile ? 18 : 24} />, label: 'Home', onClick: onNavigate.home },
    { icon: <FaUser size={isMobile ? 18 : 24} />, label: 'About', onClick: onNavigate.about },
    { icon: <FaCode size={isMobile ? 18 : 24} />, label: 'Skills', onClick: onNavigate.skills },
    { icon: <FaProjectDiagram size={isMobile ? 18 : 24} />, label: 'Projects', onClick: onNavigate.projects },
    { icon: <FaFileAlt size={isMobile ? 18 : 24} />, label: 'Resume', onClick: onNavigate.resume },
    { icon: <FaEnvelope size={isMobile ? 18 : 24} />, label: 'Contact', onClick: onNavigate.contact },
  ];

  return (
    <div className="bg-dock-bg backdrop-blur-xl rounded-2xl px-3 sm:px-6 py-2.5 sm:py-4 border border-white/10 shadow-lg max-w-fit mx-auto">
      <div className={`flex items-center justify-center ${isMobile ? 'gap-3.5' : 'gap-7'}`}>
        {dockItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="relative flex flex-col items-center group"
            whileHover={{ scale: isMobile ? 1.1 : 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
          >
            <div className={`${isMobile ? 'p-2' : 'p-3'} rounded-full cursor-pointer hover:bg-white/10 transition-colors`}>
              {item.icon}
            </div>
            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 text-xs transition-opacity whitespace-nowrap bg-black/70 px-2 py-1 rounded-md">
              {item.label}
            </span>
            {currentSection === index + 1 && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dock;