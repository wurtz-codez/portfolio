import { motion } from 'framer-motion';

function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Projects
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project placeholders - replace with actual projects */}
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