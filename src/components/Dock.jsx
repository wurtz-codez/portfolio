import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaFileAlt, FaEnvelope } from 'react-icons/fa';

function Dock({ onNavigate, currentSection }) {
  const dockItems = [
    { icon: <FaHome size={24} />, label: 'Home', onClick: onNavigate.home },
    { icon: <FaUser size={24} />, label: 'About', onClick: onNavigate.about },
    { icon: <FaCode size={24} />, label: 'Skills', onClick: onNavigate.skills },
    { icon: <FaProjectDiagram size={24} />, label: 'Projects', onClick: onNavigate.projects },
    { icon: <FaFileAlt size={24} />, label: 'Resume', onClick: onNavigate.resume },
    { icon: <FaEnvelope size={24} />, label: 'Contact', onClick: onNavigate.contact },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl min-w-[600px]">
        <div className="flex items-center justify-between">
          {dockItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
            >
              <div className="p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <span className="text-xs mt-1 text-gray-300">{item.label}</span>
              {currentSection === index + 1 && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
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
    </div>
  );
}

export default Dock;