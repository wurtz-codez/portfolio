import { motion } from 'framer-motion';

function Resume() {
  // Example resume image URL - replace with actual resume image later
  const resumeImageUrl = "https://www.resumebuilder.com/wp-content/uploads/2020/02/Professional-Resume-Template-1-1.png";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 flex items-center justify-center"
    >
      <div className="max-w-4xl w-full">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Resume
        </motion.h1>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-dock-bg p-8 rounded-xl backdrop-blur-lg"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-8 overflow-hidden rounded-lg"
          >
            <img
              src={resumeImageUrl}
              alt="Resume Preview"
              className="w-full object-contain bg-white"
            />
          </motion.div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-hover-bg px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition-colors shadow-lg"
              onClick={() => {
                // Add resume download logic here
                alert('Resume download functionality will be added once you provide the resume file.');
              }}
            >
              Download Resume
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Resume;