import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Home() {
  const text = `Welcome to Koustubh's Portfolio`;
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // Slower speed for typing effect

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowCursor(false), 500); // Remove cursor after typing finishes
    }
  }, [charIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center text-center p-8"
    >
      <div>
        <h1 className="text-6xl font-bold mb-6">
          {displayedText}
          {showCursor && <span className="animate-blink">|</span>}
        </h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-xl text-gray-400"
        >
          Full-stack Developer • UI/UX Designer • AI/ML Enthusiast
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Home;