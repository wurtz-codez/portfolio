import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaFileAlt, FaEnvelope } from 'react-icons/fa';

function Dock({ onNavigate, currentSection }) {
  const dockItems = [
    { icon: <FaHome size={22} />, label: 'Home', onClick: onNavigate.home },
    { icon: <FaUser size={22} />, label: 'About', onClick: onNavigate.about },
    { icon: <FaCode size={22} />, label: 'Skills', onClick: onNavigate.skills },
    { icon: <FaProjectDiagram size={22} />, label: 'Projects', onClick: onNavigate.projects },
    { icon: <FaFileAlt size={22} />, label: 'Resume', onClick: onNavigate.resume },
    { icon: <FaEnvelope size={22} />, label: 'Contact', onClick: onNavigate.contact },
  ];

  return (
    <div className="bg-dock-bg backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10 shadow-lg">
      <div className="flex items-center justify-center gap-6">
        {dockItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="relative flex flex-col items-center group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
          >
            <div className="p-2.5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
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