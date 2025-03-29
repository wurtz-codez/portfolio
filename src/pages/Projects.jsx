import { motion } from 'framer-motion';
import { useState } from 'react';

function Projects() {
  // Split the title into individual letters for hover effect
  const title = "Projects";
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12 flex justify-center">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center py-3 px-10 relative z-10 cursor-pointer"
          >
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: hoveredIndex === index ? 1.4 : 1,
                  y: hoveredIndex === index ? -5 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dock-bg rounded-xl overflow-hidden backdrop-blur-lg max-w-sm mx-auto w-full"
            >
              <div className="h-36 bg-gray-800"></div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Project Title</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Project description goes here. Click to view the GitHub repository.
                </p>
                <a
                  href="#"
                  className="inline-block bg-hover-bg px-4 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;