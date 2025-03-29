import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center text-center p-8"
    >
      <div>
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold mb-6"
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400"
        >
          Full-stack Developer • UI/UX Designer • AI/ML Enthusiast
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Home;